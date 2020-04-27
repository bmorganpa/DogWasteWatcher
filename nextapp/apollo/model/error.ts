export class AuthenticationError extends Error {
    constructor() {
        super("Unauthenticated");

        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
}