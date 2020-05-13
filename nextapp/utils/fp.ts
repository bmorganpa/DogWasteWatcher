export function validateOrFail<T1>(
  validate: (v1: T1) => boolean,
  error: (v1: T1) => Error,
): (v1: T1) => void;
export function validateOrFail<T1, T2>(
  validate: (v1: T1, v2: T2) => boolean,
  error: (v1: T1, v2: T2) => Error,
): (v1: T1, v2: T2) => void;
export function validateOrFail<T>(
  validate: (...args: ReadonlyArray<T>) => boolean,
  error: (...args: ReadonlyArray<T>) => Error,
): (...args: ReadonlyArray<T>) => void {
  return (...args: any) => {
    if (!validate(...args)) {
      throw error(...args);
    }
  };
}
