export function liftP<R>(fn: () => R): () => Promise<R>
export function liftP<R, T1>(fn: (v1: T1) => R): (v1: Promise<T1>) => Promise<R>
export function liftP<R, T1, T2>(fn: (v1: T1, v2: T2) => R): (v1: Promise<T1>, v2: Promise<T2>) => Promise<R>
export function liftP<R, T>(fn: (...args: ReadonlyArray<T>) => R): (...args: ReadonlyArray<Promise<T>>) => Promise<R> {
  return (...args: ReadonlyArray<Promise<T>>) => {
    return Promise.all(args).then((x) => fn.apply(null, x));
  };
}

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
