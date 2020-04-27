export type User = Readonly<{
    name?: string,
}>;

export type Claims = Readonly<{
    permissions: ReadonlyArray<string>;
    roles: ReadonlyArray<string>;
}>;