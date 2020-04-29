import { Geometry, Point } from "wkx";
import { Client } from "pg";
import * as R from "ramda";

import {
  Claims,
  User,
  validateOrSucceed,
  validPermissionOrFail,
  validUserOrFail,
} from "./index";
import { getSingleResult } from "./db";
import { liftP } from "../../utils/fp";
import { ValidationErrors } from "./error";

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

export function getWastes(db: Client) {
  return R.pipeP(
    // @ts-ignore Promise needs to be flattened: See https://github.com/microsoft/TypeScript/issues/27711
    selectWastes(db),
    liftP(R.path(["rows"])),
    liftP(R.map(parseWasteRow)),
  );
}

function selectWastes(db: Client) {
  return async () => {
    return await db.query(
      "SELECT id, ST_AsEWKT(location) as location_ewkt from wastes;",
    );
  };
}

export function createWaste(db: Client, user?: User, claims?: Claims) {
  return R.pipeP(
    // @ts-ignore Promise needs to be flattened: See https://github.com/microsoft/TypeScript/issues/27711
    (val: WasteInput) => Promise.resolve(val),
    R.tap<Promise<WasteInput>>(() => validUserOrFail(user)),
    R.tap<Promise<WasteInput>>(() =>
      validPermissionOrFail("waste:write", claims),
    ),
    liftP(validateOrSucceed(validateWasteInput)),
    insertWaste(db),
    liftP(getSingleResult),
    liftP(parseWasteRow),
  );
}

export function validateWasteInput(wasteInput: WasteInput): ValidationErrors {
  const properties: any = {};
  const { longitude, latitude } = wasteInput;
  if (longitude === undefined) {
    properties.longitude = "Required";
  }
  if (latitude === undefined) {
    properties.latitude = "Required";
  }
  return properties;
}

function insertWaste(db: Client) {
  return async (input: Required<WasteInput>) => {
    return await db.query<createWaste_WasteRow, string[]>(
      "INSERT INTO wastes(location) VALUES(ST_SetSRID(ST_MakePoint($1, $2),4326)) RETURNING id, ST_AsEWKT(location) as location_ewkt",
      [input.longitude.toString(), input.latitude.toString()],
    );
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
