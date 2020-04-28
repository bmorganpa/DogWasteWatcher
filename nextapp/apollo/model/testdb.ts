import { Client } from "pg";

export const testdb = {
  async setup() {
    const client = await new Client();
    await client.connect();
    await client.query("select setval('wastes_id_seq', 1, false)");
    await client.query("BEGIN");
    return client;
  },
  async teardown(client: Client) {
    await client.query("ROLLBACK");
    client.end();
  },
};
