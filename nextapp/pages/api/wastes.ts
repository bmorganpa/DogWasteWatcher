import * as R from "ramda";
import { NextApiRequest, NextApiResponse } from "next";
import { Client, QueryResult } from "pg";

import { liftP } from "../../utils/fp";

type Context = Readonly<{
  db: Client;
}>;

export default async function wastes(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    R.pipeP(
      // @ts-ignore Promise needs to be flattened: See https://github.com/microsoft/TypeScript/issues/27711
      liftP(selectWastes),
      R.tap(endClient),
      liftP(R.path(["result", "rows", 0, "geojson"])),
      liftP(sendJson(res)),
    )({ db: await createClient() } as Context);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}

async function createClient() {
  const client = new Client();
  await client.connect();
  return client;
}

async function endClient({ db }: Context) {
  await db.connect();
}

async function selectWastes(context: Context) {
  return {
    ...context,
    result: await context.db.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(json_build_object('type', 'Feature', 'geometry', ST_AsGeoJSON(location)::json, 'properties', json_build_object('id', id)))
      ) as geojson from wastes`),
  };
}

const sendJson = (res: NextApiResponse) => (json: unknown): void => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).end(JSON.stringify(json));
};
