import { tryCatch, Result } from "./try-catch";

/**
 * A utility function that attempts to execute a promise multiple times
 * with a specified delay between retries if it fails.
 * @param fn - The function that returns a promise to be executed.
 * @param retries - The number of times to retry the function if it fails.
 * @param delayMs - The delay in milliseconds between retries.
 * @returns A Promise that resolves to a Result object containing either data or an error.
 * @example
 * const result = await tryCatchWithRetry(() => fetchData(), 3, 1000);
 * if (result.error) {
 *   console.error(result.error);
 * } else {
 *   console.log(result.data);
 * }
 */
export async function tryCatchWithRetry<T, E = Error>(
  fn: () => Promise<T>,
  retries: number = 3,
  delayMs: number = 0
): Promise<Result<T, E>> {
  let attempt = 0;

  while (attempt < retries) {
    const result = await tryCatch<T, E>(fn());

    if (result.error === null) {
      return result;
    }

    attempt++;
    if (attempt < retries && delayMs > 0) {
      await new Promise((res) => setTimeout(res, delayMs));
    }
  }

  return await tryCatch<T, E>(fn());
}
