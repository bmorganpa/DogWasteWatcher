import { AppContext } from "./context";
import { Waste, CreateWasteInput, CreateWastePayload } from "./model/waste";
import { createWaste, getWastes } from "./model/waste";

export const resolvers = {
  Query: {
    wastes(
      parent: unknown,
      args: unknown,
      { db, user }: AppContext,
    ): Promise<ReadonlyArray<Waste>> {
      if (!user) {
        throw new Error("Not Authed");
      }
      return getWastes(db);
    },
  },
  Mutation: {
    createWaste: async (
      parent: unknown,
      { input: { waste } }: { input: CreateWasteInput },
      { db }: AppContext,
    ): Promise<CreateWastePayload> => {
      const output = await createWaste(db, waste);
      return {
        waste: output,
      };
    },
  },
};
