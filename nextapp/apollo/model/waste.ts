import { Geometry, Point } from "wkx";
import { Client } from "pg";

import { AuthenticationError } from "./error";
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

export function createWaste(pg: Client, user?: User) {
  return async (waste: WasteInput): Promise<Waste> => {
    if (!user) {
      throw new AuthenticationError();
    }
    const result = await pg.query<createWaste_WasteRow, string[]>(
      "INSERT INTO wastes(location) VALUES($1) RETURNING id, ST_AsEWKT(location) as location_ewkt",
      [`SRID=4326;POINT(${waste.longitude} ${waste.latitude})`],
    );
    pg.end();
    if (result.rowCount === 0) {
      // TODO: Throw error?
    }

    return parseWasteRow(result.rows[0]);
  };
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
