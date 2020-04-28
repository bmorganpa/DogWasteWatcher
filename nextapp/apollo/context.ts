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
  const { pool } = await import("./pool");
  const db = await pool.connect();

  const session = await auth0.getSession(req);
  const user = session?.user;
  const claims = user?.["https://dogwastewatcher.now.sh/claims"];
  return { db, user, claims };
};

export const cleanupContext = (context: AppContext) => {
  context.db.release();
};
