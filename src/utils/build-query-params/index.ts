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
