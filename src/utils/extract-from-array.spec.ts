import { extractFromArray } from "./extract-from-array";

describe("extractFromArray", () => {
  test("should extract property values from an array of objects", () => {
    const data = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Bob" },
    ];

    const result = extractFromArray(data, "name");
    expect(result).toEqual(["John", "Jane", "Bob"]);
  });

  test("should return an empty array when given an empty array", () => {
    const result = extractFromArray([], "anyKey");
    expect(result).toEqual([]);
  });

  test("should return an empty array when given a non-array input", () => {
    // @ts-ignore - intentionally passing invalid type for test
    const result = extractFromArray("not an array", "anyKey");
    expect(result).toEqual([]);
  });

  test("should apply parser function to extracted values", () => {
    const data = [
      { id: 1, value: "10" },
      { id: 2, value: "20" },
      { id: 3, value: "30" },
    ];

    const parser = (val: string) => parseInt(val, 10);
    const result = extractFromArray(data, "value", parser);
    expect(result).toEqual([10, 20, 30]);
  });

  test("should handle undefined data gracefully", () => {
    // @ts-ignore - intentionally passing invalid type for test
    const result = extractFromArray(undefined, "anyKey");
    expect(result).toEqual([]);
  });
});
