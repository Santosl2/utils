/**
 *  A utility to build query parameters from an object.
 *  This function converts an object into a URL-encoded query string.
 *  It filters out undefined values and constructs the query string accordingly.
 *  The resulting string can be used in URLs or API requests.
 * @param params - The object containing query parameters.
 * @returns A URL-encoded query string.
 * @example
 * const params = { search: "test", page: 1, limit: 10 };
 * const queryString = buildQueryParams(params);
 * "search=test&page=1&limit=10"
 */
export function buildQueryParams(params: Record<string, any>) {
  const searchParams = new URLSearchParams();

  const keys = Object.keys(params);

  // biome-ignore lint/complexity/noForEach: <explanation>
  keys.forEach((key) => {
    if (params[key] && params[key] !== "undefined") {
      searchParams.append(key, params[key]);
    }
  });

  return searchParams.toString();
}
