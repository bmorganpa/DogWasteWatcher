import { createWaste_WasteRowFactory, wasteFactory } from "./waste.fixture";

import { parseWasteRow, validateWasteInput } from "./waste";

describe("validateWasteInput", () => {
  it("should return no errors", () => {
    const wasteInput = wasteFactory();
    const actual = validateWasteInput(wasteInput);
    const expected = {};
    expect(actual).toEqual(expected);
  });

  it("should return an error for missing longitude", () => {
    const wasteInput = wasteFactory({
      longitude: undefined,
    });
    const actual = validateWasteInput(wasteInput);
    const expected = { longitude: "Required" };
    expect(actual).toEqual(expected);
  });

  it("should return an error for missing latitude", () => {
    const wasteInput = wasteFactory({
      latitude: undefined,
    });
    const actual = validateWasteInput(wasteInput);
    const expected = { latitude: "Required" };
    expect(actual).toEqual(expected);
  });
});

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
