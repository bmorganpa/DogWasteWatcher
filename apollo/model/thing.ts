import { Geometry, Point } from "wkx";
import { Client } from "pg";

export interface Thing {
  id: number;
  latitude: number;
  longitude: number;
}

export interface ThingInput {
  latitude?: number;
  longitude?: number;
}

export interface CreateThingInput {
  thing: ThingInput;
}

export interface CreateThingPayload {
  thing: Thing;
}

export async function getThings(pg: Client): Promise<ReadonlyArray<Thing>> {
  const result = await pg.query(
    "SELECT id, ST_AsEWKT(location) as location_ewkt from things;",
  );
  pg.end();
  return result.rows.map(parseThingRow);
}

export async function createThing(
  pg: Client,
  thing: ThingInput,
): Promise<Thing> {
  const result = await pg.query<createThing_ThingRow, string[]>(
    "INSERT INTO things(location) VALUES($1) RETURNING id, ST_AsEWKT(location) as location_ewkt",
    [`SRID=4326;POINT(${thing.longitude} ${thing.latitude})`],
  );
  pg.end();
  if (result.rowCount === 0) {
    // TODO: Throw error?
  }

  return parseThingRow(result.rows[0]);
}

export function parseThingRow(row: createThing_ThingRow): Thing {
  const { id, location_ewkt } = row;
  const geometry = Geometry.parse(location_ewkt) as Point;
  return {
    id,
    latitude: geometry.y,
    longitude: geometry.x,
  };
}

export type createThing_ThingRow = Readonly<{
  id: number;
  location_ewkt: string;
}>;
