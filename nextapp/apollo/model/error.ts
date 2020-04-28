export class AuthenticationError extends Error {
  constructor() {
    super("Unauthenticated");

    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

export class AuthorizationError extends Error {
  constructor(permission: string) {
    super(`Unauthorized access of ${permission}`);

    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }
}

export type ValidationErrors = Readonly<{
  [key: string]: string;
}>;

export class BadRequestError extends Error {
  constructor(public errors: ValidationErrors) {
    super("Bad request");

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
