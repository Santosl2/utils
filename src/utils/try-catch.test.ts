import { tryCatch } from "./try-catch";

// src/utils/try-catch.test.ts

describe("tryCatch", () => {
  test("should return data and null error on successful promise", async () => {
    const result = await tryCatch(Promise.resolve("success"));
    expect(result.data).toBe("success");
    expect(result.error).toBeNull();
  });

  test("should return null data and error on rejected promise", async () => {
    const error = new Error("failure");
    const result = await tryCatch(Promise.reject(error));
    expect(result.data).toBeNull();
    expect(result.error).toBe(error);
  });

  test("should handle custom error types", async () => {
    class CustomError extends Error {
      code: number;
      constructor(message: string, code: number) {
        super(message);
        this.code = code;
      }
    }

    const customError = new CustomError("custom error", 500);
    const result = await tryCatch<string, CustomError>(
      Promise.reject(customError)
    );

    expect(result.data).toBeNull();
    expect(result.error).toBe(customError);
    expect(result.error?.code).toBe(500);
  });

  test("should handle nested promises", async () => {
    const nestedPromise = Promise.resolve(Promise.resolve("nested data"));
    const result = await tryCatch(nestedPromise);

    expect(result.data).toBe("nested data");
    expect(result.error).toBeNull();
  });

  test("should handle thrown errors in async functions", async () => {
    const asyncFnWithError = async () => {
      throw new Error("async error");
    };

    const result = await tryCatch(asyncFnWithError());

    expect(result.data).toBeNull();
    expect(result.error).toBeInstanceOf(Error);
    expect(result.error?.message).toBe("async error");
  });

  test("should work with different data types", async () => {
    const numberResult = await tryCatch(Promise.resolve(42));
    expect(numberResult.data).toBe(42);

    const objectResult = await tryCatch(Promise.resolve({ key: "value" }));
    expect(objectResult.data).toEqual({ key: "value" });

    const arrayResult = await tryCatch(Promise.resolve([1, 2, 3]));
    expect(arrayResult.data).toEqual([1, 2, 3]);
  });
});
