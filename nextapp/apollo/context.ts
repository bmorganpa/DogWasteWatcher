import { IncomingMessage } from "http";

import { Claims } from "./model/index";
import { User } from "./model/index";
import { auth0 } from "../lib/auth0";

type IncomingContext = Readonly<{
  req: IncomingMessage;
}>;

export type AppContext = Readonly<{
  claims: Claims;
  db: any;
  user?: User;
}>;

export const createContext = async ({
  req,
}: IncomingContext): Promise<AppContext> => {
  const { Pool } = await import("pg");
  const db = new Pool();

  const session = await auth0.getSession(req);
  const user = session?.user;
  const claims = user?.["https://dogwastewatcher.now.sh/claims"];
  return { db, user, claims };
};
