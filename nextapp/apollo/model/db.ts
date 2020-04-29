import { QueryResult, Query } from "pg";

export function getSingleResult<T>(result: QueryResult<T>): T {
  if (result.rowCount !== 1) {
    throw new DBError(result);
  }
  return result.rows[0];
}

export class DBError<T> extends Error {
  constructor(public result: QueryResult<T>) {
    super("Db error");

    Object.setPrototypeOf(this, DBError.prototype);
  }
}
