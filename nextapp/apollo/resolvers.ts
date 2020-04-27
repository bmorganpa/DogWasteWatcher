import { AppContext } from "./context";
import { Waste, CreateWasteInput, CreateWastePayload } from "./model/waste";
import { createWaste, getWastes } from "./model/waste";

export const resolvers = {
  Query: {
    wastes(
      parent: unknown,
      args: unknown,
      { db }: AppContext,
    ): Promise<ReadonlyArray<Waste>> {
      return getWastes(db);
    },
  },
  Mutation: {
    createWaste: async (
      parent: unknown,
      { input: { waste } }: { input: CreateWasteInput },
      { db, user, claims }: AppContext,
    ): Promise<CreateWastePayload> => {
      const output = await createWaste(db, user, claims)(waste);
      return {
        waste: output,
      };
    },
  },
};
