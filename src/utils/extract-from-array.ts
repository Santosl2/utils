export function extractFromArray<T = any>(
  data: T[],
  key: keyof T,
  parser?: Function
) {
  if (!Array.isArray(data)) return [];

  return (
    data?.map((item) => {
      if (parser) return parser(item[key]);
      return item[key];
    }) || []
  );
}
