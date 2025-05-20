import { tryCatch, Result } from "./try-catch";

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
