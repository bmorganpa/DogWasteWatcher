import { createFixtureFactory } from "tsfixturefactory";

import { Thing } from "./thing";
import { createThing_ThingRow } from "./thing";

export const thingFactory = createFixtureFactory<Thing>({
  id: 1,
  latitude: 12,
  longitude: 21,
});

export const createThing_ThingRowFactory = createFixtureFactory<
  createThing_ThingRow
>({
  id: 1,
  location_ewkt: "",
});
