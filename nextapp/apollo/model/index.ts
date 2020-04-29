import {
  AuthenticationError,
  BadRequestError,
  AuthorizationError,
} from "./error";
import { validateOrFail } from "../../utils/fp";

export type User = Readonly<{
  name?: string;
}>;

export type Claims = Readonly<{
  permissions: ReadonlyArray<string>;
  roles: ReadonlyArray<string>;
}>;

export const validUserOrFail = validateOrFail<User | undefined>(
  Boolean,
  () => new AuthenticationError(),
);
export const validPermissionOrFail = validateOrFail(
  hasPermission,
  (permission) => new AuthorizationError(permission),
);

function hasPermission(permission: string, claims?: Claims): boolean {
  return claims?.permissions.includes(permission) ?? false;
}

export function validateOrSucceed<T, R extends T>(
  fn: (t1: T) => { [key: string]: any },
) {
  return (arg: T) => {
    const properties = fn(arg);

    if (Object.values(properties).length > 0) {
      throw new BadRequestError(properties);
    }

    return arg as R;
  };
}
