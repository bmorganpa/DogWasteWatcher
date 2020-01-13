import { AppContext } from "./context";
import { Thing, CreateThingInput, CreateThingPayload } from "./model/thing";
import { createThing } from "./model/thing";
import { getThings } from "./model/thing";

export const resolvers = {
  Query: {
    things(
      parent: unknown,
      args: unknown,
      { db, user }: AppContext,
    ): Promise<ReadonlyArray<Thing>> {
      if (!user) {
        throw new Error("Not Authed");
      }
      return getThings(db);
    },
  },
  Mutation: {
    createThing: async (
      parent: unknown,
      { input: { thing } }: { input: CreateThingInput },
      { db }: AppContext,
    ): Promise<CreateThingPayload> => {
      const output = await createThing(db, thing);
      return {
        thing: output,
      };
    },
  },
};
