type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * A utility function that wraps a promise and returns a result object.
 * The result object contains either the resolved data or an error.
 * @param promise - The promise to be executed.
 * @returns A Promise that resolves to a Result object containing either data or an error.
 * @example
 * const result = await tryCatch(fetchData());
 * if (result.error) {
 *   console.error(result.error);
 * } else {
 *   console.log(result.data);
 * }
 */
export async function tryCatch<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
