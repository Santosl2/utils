import { buildQueryParams } from "./index";

describe("buildQueryParams", () => {
  test("should return empty string for empty object", () => {
    expect(buildQueryParams({})).toBe("");
  });

  test("should build query string with single parameter", () => {
    expect(buildQueryParams({ name: "john" })).toBe("name=john");
  });

  test("should build query string with multiple parameters", () => {
    const params = { name: "john", age: "30" };
    expect(buildQueryParams(params)).toBe("name=john&age=30");
  });

  test("should exclude undefined values", () => {
    const params = { name: "john", age: undefined };
    expect(buildQueryParams(params)).toBe("name=john");
  });

  test("should exclude null values", () => {
    const params = { name: "john", age: null };
    expect(buildQueryParams(params)).toBe("name=john");
  });

  test("should include empty string values", () => {
    const params = { name: "" };
    expect(buildQueryParams(params)).toBe("name=");
  });

  test("should include zero values", () => {
    const params = { count: 0 };
    expect(buildQueryParams(params)).toBe("count=0");
  });

  test("should handle boolean values", () => {
    const params = { active: true, disabled: false };
    expect(buildQueryParams(params)).toBe("active=true&disabled=false");
  });

  test("should handle array values", () => {
    const params = { ids: [1, 2, 3] };
    expect(buildQueryParams(params)).toBe("ids=1%2C2%2C3");
  });

  test("should encode special characters", () => {
    const params = { query: "hello world & goodbye!" };
    expect(buildQueryParams(params)).toBe("query=hello+world+%26+goodbye%21");
  });
});
