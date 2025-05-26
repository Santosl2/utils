/**
 *  A utility function to create a delay in execution.
 *  This function returns a Promise that resolves after a specified time.
 * @param time - The time in milliseconds to delay execution.
 * @returns A Promise that resolves after the specified time.
 */
export function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
