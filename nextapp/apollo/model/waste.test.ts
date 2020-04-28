require("dotenv").config();

import { Client } from "pg";

import { testdb } from "./testdb";

import { AuthenticationError, AuthorizationError } from "./error";
import { BadRequestError } from "./error";
import { createWaste } from "./waste";

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
    });

    it("should fail validation when missing longitude", async () => {
      expect(async () => {
        await createWasteWithValidUser({
          latitude: 12,
        });
      }).rejects.toThrowError(new BadRequestError({ longitude: "Required" }));
    });

    it("should fail validation when missing latitude", async () => {
      expect(async () => {
        await createWasteWithValidUser({
          longitude: 21,
        });
      }).rejects.toThrowError(new BadRequestError({ latitude: "Required" }));
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
