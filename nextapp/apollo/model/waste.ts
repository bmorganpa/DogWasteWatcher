import { Geometry, Point } from "wkx";
import { Client } from "pg";

import { AuthenticationError } from "./error";
import { AuthorizationError } from "./error";
import { BadRequestError } from "./error";
import { Claims } from "./index";
import { User } from "./index";

export interface Waste {
  id: number;
  latitude: number;
  longitude: number;
}

export interface WasteInput {
  latitude?: number;
  longitude?: number;
}

export interface CreateWasteInput {
  waste: WasteInput;
}

export interface CreateWastePayload {
  waste: Waste;
}

export async function getWastes(pg: Client): Promise<ReadonlyArray<Waste>> {
  const result = await pg.query(
    "SELECT id, ST_AsEWKT(location) as location_ewkt from wastes;",
  );
  pg.end();
  return result.rows.map(parseWasteRow);
}

export function createWaste(pg: Client, user?: User, claims?: Claims) {
  return async (waste: WasteInput): Promise<Waste> => {
    if (!user) {
      throw new AuthenticationError();
    }
    if (!hasPermission("waste:write")(claims)) {
      throw new AuthorizationError("waste:write");
    }
    const validatedInput = validateWasteInput(waste);
    try {
      const result = await pg.query<createWaste_WasteRow, string[]>(
        "INSERT INTO wastes(location) VALUES(ST_SetSRID(ST_MakePoint($1, $2),4326)) RETURNING id, ST_AsEWKT(location) as location_ewkt",
        [validatedInput.longitude.toString(), validatedInput.latitude.toString()],
      );
      pg.end();
      if (result.rowCount === 0) {
        throw new Error("createWaste failed");
      }

      return parseWasteRow(result.rows[0]);
    } catch (error) {
      console.error(error);
      throw new Error("createWaste failed");
    }
  };
}

export function validateWasteInput(wasteInput: WasteInput): Required<WasteInput> {
  const properties: {[key: string]: any} = {};
  const { longitude, latitude } = wasteInput;
  if (longitude === undefined) {
    properties.longitude = 'Required';
  }
  if (latitude === undefined) {
    properties.latitude = 'Required';
  }

  if (Object.values(properties).length > 0) {
    throw new BadRequestError(properties);
  }

  return wasteInput as any
}

export function parseWasteRow(row: createWaste_WasteRow): Waste {
  const { id, location_ewkt } = row;
  const geometry = Geometry.parse(location_ewkt) as Point;
  return {
    id,
    latitude: geometry.y,
    longitude: geometry.x,
  };
}

export type createWaste_WasteRow = Readonly<{
  id: number;
  location_ewkt: string;
}>;

function hasPermission(permission: string) {
  return (claims?: Claims): boolean => {
    return claims?.permissions.includes(permission) ?? false;
  };
}
