require("dotenv").config({ path: ".env.test" });

import { Client } from "pg";

import { testdb } from "./testdb";

import { AuthenticationError, AuthorizationError } from "./error";
import { BadRequestError } from "./error";
import { createWaste, getWastes } from "./waste";

describe("getWastes", () => {
  let client: Client;

  beforeEach(async () => {
    client = await testdb.setup();
  });

  afterEach(async () => {
    await testdb.teardown(client);
  });

  describe("with no wastes", () => {
    let getWastesWithDB: ReturnType<typeof getWastes>;

    beforeEach(() => {
      getWastesWithDB = getWastes(client);
    });

    it("should get zero results", async () => {
      const actual = await getWastesWithDB();
      const expected: any = [];
      expect(actual).toEqual(expected);
    });
  });

  describe("with wastes", () => {
    let getWastesWithDB: ReturnType<typeof getWastes>;

    beforeEach(async () => {
      await client.query(
        "INSERT INTO wastes (location) VALUES ('0101000020E610000000000000000035400000000000002840');",
      );
      getWastesWithDB = getWastes(client);
    });

    it("should a result for each waste", async () => {
      const actual = await getWastesWithDB();
      const expected = [
        {
          id: "1",
          latitude: 12,
          longitude: 21,
        },
      ];
      expect(actual).toEqual(expected);
    });
  });
});

describe("createWaste", () => {
  let client: Client;

  beforeEach(async () => {
    client = await testdb.setup();
  });

  afterEach(async () => {
    await testdb.teardown(client);
  });

  describe("with a valid user and claims", () => {
    let createWasteWithValidUser: ReturnType<typeof createWaste>;

    beforeEach(() => {
      const user = {};
      const permissions = ["waste:write"];
      const claims = { permissions, roles: [] };
      createWasteWithValidUser = createWaste(client, user, claims);
    });

    it("should create a waste", async () => {
      const actual = await createWasteWithValidUser({
        longitude: 21,
        latitude: 12,
      });
      const expected = {
        id: "1",
        latitude: 12,
        longitude: 21,
      };
      expect(actual).toEqual(expected);

      const created = await client.query("SELECT * from wastes");
      expect(created.rows.length).toEqual(1);

      const { created_at, ...row } = created.rows[0];
      expect(created_at).toBeInstanceOf(Date);
      expect(row).toEqual({
        id: "1",
        location: "0101000020E610000000000000000035400000000000002840",
      });
    });

    it("should throw a BadRequestError when validation fails", async () => {
      expect(async () => {
        await createWasteWithValidUser({
          latitude: 12,
        });
      }).rejects.toThrowError(new BadRequestError({ longitude: "Required" }));
    });
  });

  describe("with no user", () => {
    let createWasteWithNoUser: ReturnType<typeof createWaste>;

    beforeEach(() => {
      createWasteWithNoUser = createWaste(client);
    });

    it("should fail", async () => {
      expect(async () => {
        await createWasteWithNoUser({
          latitude: 12,
          longitude: 21,
        });
      }).rejects.toThrowError(new AuthenticationError());
    });
  });

  describe("with missing claims", () => {
    let createWasteWithMissingClaims: ReturnType<typeof createWaste>;

    beforeEach(() => {
      const user = {};
      const claims = { permissions: [], roles: [] };
      createWasteWithMissingClaims = createWaste(client, user, claims);
    });

    it("should fail", async () => {
      expect(async () => {
        await createWasteWithMissingClaims({
          latitude: 12,
          longitude: 21,
        });
      }).rejects.toThrowError(new AuthorizationError("waste:write"));
    });
  });
});
