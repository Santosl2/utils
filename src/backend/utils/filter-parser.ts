const globalAllowedFields = ["sort", "limit", "page"] as const;

type QueryParams<T extends string | number | symbol> = {
  [key in T]?: string | number | boolean | undefined;
} & Partial<
  Record<
    (typeof globalAllowedFields)[number],
    string | number | boolean | undefined
  >
>;

type OrderBy = {
  [key: string]: "asc" | "desc";
};

type FilterHelperResult<T extends string | number | symbol> = {
  where: {
    [key in T]?: any;
  };
  orderBy?: OrderBy;
  limit?: number;
  page?: number;
};

export class FilterHelper<T extends string> {
  constructor(
    private allowedFields: T[] = [],
    private queryParams: QueryParams<T> = {} as QueryParams<T>
  ) {}

  parseNumberParam(data: string): number {
    const parsedData = Number(data);

    if (Number.isNaN(parsedData)) {
      throw new Error(`${data} must be a number`);
    }

    return parsedData;
  }

  parseSortParameter(sort: string): OrderBy {
    const [field, order] = sort.split(":");

    if (!["asc", "desc"].includes(order)) {
      throw new Error("Order must be asc or desc");
    }

    return {
      [field]: order,
    } as OrderBy;
  }

  get filterObject(): FilterHelperResult<T> {
    const allowedFields = [...this.allowedFields, ...globalAllowedFields];

    return Object.keys(this.queryParams).reduce(
      (acc, key) => {
        if (allowedFields.includes(key as T)) {
          const value = this.queryParams[key as T];

          if (key === "limit" || key === "page") {
            acc[key] = this.parseNumberParam(value as string);
            return acc;
          }

          if (key === "sort") {
            const sort = value as string;
            acc["orderBy"] = this.parseSortParameter(sort);
            return acc;
          }

          //@ts-ignore
          acc["where"][key] = value;
        }

        return acc;
      },
      { where: {}, orderBy: {} } as FilterHelperResult<T>
    );
  }
}
