import { FilterHelper } from "./filter-parser";

describe("FilterHelper", () => {
  describe("constructor", () => {
    test("should initialize with empty params", () => {
      const filter = new FilterHelper();
      expect(filter.filterObject).toEqual({ where: {}, orderBy: {} });
    });

    test("should initialize with allowed fields", () => {
      const filter = new FilterHelper(["name", "age"]);
      expect(filter.filterObject).toEqual({ where: {}, orderBy: {} });
    });
  });

  describe("parseNumberParam", () => {
    test("should parse valid number string", () => {
      const filter = new FilterHelper();
      expect(filter.parseNumberParam("123")).toBe(123);
    });

    test("should throw error for invalid number", () => {
      const filter = new FilterHelper();
      expect(() => filter.parseNumberParam("abc")).toThrow(
        "abc must be a number"
      );
    });
  });

  describe("parseSortParameter", () => {
    test("should parse valid sort parameter", () => {
      const filter = new FilterHelper();
      expect(filter.parseSortParameter("name:asc")).toEqual({ name: "asc" });
    });

    test("should parse desc sort parameter", () => {
      const filter = new FilterHelper();
      expect(filter.parseSortParameter("age:desc")).toEqual({ age: "desc" });
    });

    test("should throw error for invalid sort order", () => {
      const filter = new FilterHelper();
      expect(() => filter.parseSortParameter("name:invalid")).toThrow(
        "Order must be asc or desc"
      );
    });
  });

  describe("filterObject", () => {
    test("should filter by allowed fields", () => {
      const filter = new FilterHelper(["name", "age"], {
        name: "John",
        age: "25",
      });
      expect(filter.filterObject).toEqual({
        where: { name: "John", age: "25" },
        orderBy: {},
      });
    });

    test("should handle limit parameter", () => {
      const filter = new FilterHelper([], { limit: "10" });
      expect(filter.filterObject).toEqual({
        where: {},
        orderBy: {},
        limit: 10,
      });
    });

    test("should handle page parameter", () => {
      const filter = new FilterHelper([], { page: "2" });
      expect(filter.filterObject).toEqual({
        where: {},
        orderBy: {},
        page: 2,
      });
    });

    test("should handle sort parameter", () => {
      const filter = new FilterHelper([], { sort: "name:desc" });
      expect(filter.filterObject).toEqual({
        where: {},
        orderBy: { name: "desc" },
      });
    });

    test("should handle mixed parameters", () => {
      const filter = new FilterHelper(["name"], {
        name: "John",
        sort: "age:asc",
        limit: "10",
        page: "1",
      });
      expect(filter.filterObject).toEqual({
        where: { name: "John" },
        orderBy: { age: "asc" },
        limit: 10,
        page: 1,
      });
    });

    test("should ignore non-allowed fields", () => {
      const filter = new FilterHelper(["name"], {
        name: "John",
        invalid: "field",
      } as any);
      expect(filter.filterObject).toEqual({
        where: { name: "John" },
        orderBy: {},
      });
    });

    test("should handle empty query params", () => {
      const filter = new FilterHelper(["name"], {});
      expect(filter.filterObject).toEqual({
        where: {},
        orderBy: {},
      });
    });
  });
  describe("FilterHelper Edge Cases", () => {
    describe("Sort Parameter Edge Cases", () => {
      test("should throw error for empty sort string", () => {
        const filter = new FilterHelper();
        expect(() => filter.parseSortParameter("")).toThrow();
      });

      test("should throw error for sort parameter missing separator", () => {
        const filter = new FilterHelper();
        expect(() => filter.parseSortParameter("nameasc")).toThrow();
      });

      test("should handle sort parameter with extra colons", () => {
        const filter = new FilterHelper([], { sort: "name:asc:extra" });
        expect(filter.filterObject).toEqual({
          where: {},
          orderBy: { name: "asc" },
        });
      });
    });

    describe("Numeric Parameter Edge Cases", () => {
      test("should handle negative limit", () => {
        const filter = new FilterHelper([], { limit: "-10" });
        expect(filter.filterObject.limit).toBe(-10);
      });

      test("should handle decimal page number", () => {
        const filter = new FilterHelper([], { page: "1.5" });
        expect(filter.filterObject.page).toBe(1.5);
      });

      test("should handle zero values", () => {
        const filter = new FilterHelper([], { limit: "0", page: "0" });
        expect(filter.filterObject).toEqual({
          where: {},
          orderBy: {},
          limit: 0,
          page: 0,
        });
      });
    });

    describe("Where Clause Edge Cases", () => {
      test("should handle boolean values", () => {
        const filter = new FilterHelper(["isActive"], { isActive: true });
        expect(filter.filterObject).toEqual({
          where: { isActive: true },
          orderBy: {},
        });
      });

      test("should handle undefined values", () => {
        const filter = new FilterHelper(["name"], { name: undefined });
        expect(filter.filterObject).toEqual({
          where: { name: undefined },
          orderBy: {},
        });
      });

      test("should handle empty string values", () => {
        const filter = new FilterHelper(["name"], { name: "" });
        expect(filter.filterObject).toEqual({
          where: { name: "" },
          orderBy: {},
        });
      });
    });

    describe("Complex Combinations", () => {
      test("should handle multiple parameters with edge values", () => {
        const filter = new FilterHelper(["name", "isActive", "count"], {
          name: "",
          isActive: true,
          count: "0",
          sort: "name:desc",
          limit: "-1",
          page: "0",
        });

        expect(filter.filterObject).toEqual({
          where: {
            name: "",
            isActive: true,
            count: "0",
          },
          orderBy: { name: "desc" },
          limit: -1,
          page: 0,
        });
      });

      test("should handle special characters in field names", () => {
        const filter = new FilterHelper(
          ["user_name", "first-name", "last.name"],
          {
            user_name: "john",
            "first-name": "John",
            "last.name": "Doe",
          }
        );

        expect(filter.filterObject).toEqual({
          where: {
            user_name: "john",
            "first-name": "John",
            "last.name": "Doe",
          },
          orderBy: {},
        });
      });
    });

    describe("Case Sensitivity", () => {
      test("should be case sensitive for sort direction", () => {
        const filter = new FilterHelper();
        expect(() => filter.parseSortParameter("name:ASC")).toThrow();
        expect(() => filter.parseSortParameter("name:DESC")).toThrow();
      });

      test("should preserve case for field values", () => {
        const filter = new FilterHelper(["name"], { name: "JoHn DoE" });
        expect(filter.filterObject).toEqual({
          where: { name: "JoHn DoE" },
          orderBy: {},
        });
      });
    });
  });
});
