import { IncomingMessage } from "http";
import { IClaims } from "@auth0/nextjs-auth0/dist/session/session";

import { auth0 } from "../lib/auth0";

type IncomingContext = Readonly<{
  req: IncomingMessage;
}>;

export type AppContext = Readonly<{
  db: any;
  user?: IClaims;
}>;

export const createContext = async ({
  req,
}: IncomingContext): Promise<AppContext> => {
  const { Pool } = await import("pg");
  const db = new Pool();

  const session = await auth0.getSession(req);
  return { db, user: session?.user };
};
