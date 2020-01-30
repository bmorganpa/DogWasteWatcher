import { createFixtureFactory } from "tsfixturefactory";

import { Waste } from "./waste";
import { createWaste_WasteRow } from "./waste";

export const wasteFactory = createFixtureFactory<Waste>({
  id: 1,
  latitude: 12,
  longitude: 21,
});

export const createWaste_WasteRowFactory = createFixtureFactory<
  createWaste_WasteRow
>({
  id: 1,
  location_ewkt: "",
});
