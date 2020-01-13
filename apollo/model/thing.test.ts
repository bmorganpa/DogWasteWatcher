import { createThing_ThingRowFactory } from "./thing.fixture";

import { parseThingRow } from "./thing";

describe("parseThingRow", () => {
  it("should parse a row", () => {
    const row = createThing_ThingRowFactory({
      id: 1,
      location_ewkt: "SRID=4326;POINT(21 12)",
    });
    const actual = parseThingRow(row);
    const expected = {
      id: 1,
      latitude: 12,
      longitude: 21,
    };
    expect(actual).toEqual(expected);
  });
});
