import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "pg";

export default async function wastes(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const client = new Client();
    await client.connect();
    const result = await client.query(`
      SELECT json_build_object(
        'type', 'FeatureCollection',
        'features', json_agg(json_build_object('type', 'Feature', 'geometry', ST_AsGeoJSON(location)::json, 'properties', json_build_object('id', id)))
      ) as geojson from wastes`);
    client.end();
    res.setHeader("Content-Type", "application/json");
    res.status(200).end(JSON.stringify(result.rows[0].geojson));
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
