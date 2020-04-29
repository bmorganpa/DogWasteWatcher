import { getSingleResult, DBError } from "./db";

describe("getSingleResult", () => {
  it("should return a single result", () => {
    const row = {};
    const actual = getSingleResult({
      command: "",
      oid: 1,
      fields: [],
      rowCount: 1,
      rows: [row],
    });
    const expected = row;
    expect(actual).toEqual(expected);
  });

  it("should throw an error when no rows", () => {
    const result = {
      command: "",
      oid: 1,
      fields: [],
      rowCount: 0,
      rows: [],
    };
    expect(() => getSingleResult(result)).toThrowError(new DBError(result));
  });

  it("should throw an error when more than 1 row", () => {
    const row = {};
    const result = {
      command: "",
      oid: 1,
      fields: [],
      rowCount: 2,
      rows: [row, row],
    };
    expect(() => getSingleResult(result)).toThrowError(new DBError(result));
  });
});
