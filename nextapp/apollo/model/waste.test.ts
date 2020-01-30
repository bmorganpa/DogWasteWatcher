import { createWaste_WasteRowFactory } from "./waste.fixture";

import { parseWasteRow } from "./waste";

describe("parseWasteRow", () => {
  it("should parse a row", () => {
    const row = createWaste_WasteRowFactory({
      id: 1,
      location_ewkt: "SRID=4326;POINT(21 12)",
    });
    const actual = parseWasteRow(row);
    const expected = {
      id: 1,
      latitude: 12,
      longitude: 21,
    };
    expect(actual).toEqual(expected);
  });
});
