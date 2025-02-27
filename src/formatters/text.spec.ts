import { TextFormatter } from "./text";

// src/formatters/text.test.ts

describe("TextFormatter", () => {
  describe("capitalize", () => {
    test("should capitalize the first letter of a string", () => {
      expect(TextFormatter.capitalize("hello")).toBe("Hello");
    });

    test("should leave already capitalized strings unchanged", () => {
      expect(TextFormatter.capitalize("Hello")).toBe("Hello");
    });

    test("should handle empty string", () => {
      expect(TextFormatter.capitalize("")).toBe("");
    });

    test("should handle single character", () => {
      expect(TextFormatter.capitalize("a")).toBe("A");
    });

    test("should only capitalize first letter and leave the rest unchanged", () => {
      expect(TextFormatter.capitalize("hELLo WoRLd")).toBe("HELLo WoRLd");
    });
  });

  describe("createSlug", () => {
    test("should convert a string to a slug", () => {
      expect(TextFormatter.createSlug("Hello World")).toBe("hello-world");
    });

    test("should handle multiple spaces", () => {
      expect(TextFormatter.createSlug("Hello  World   Test")).toBe(
        "hello-world-test"
      );
    });

    test("should remove special characters", () => {
      expect(TextFormatter.createSlug("Hello! @World#")).toBe("hello-world");
    });

    test("should handle empty string", () => {
      expect(TextFormatter.createSlug("")).toBe("");
    });

    test("should remove accents and diacritics", () => {
      expect(TextFormatter.createSlug("áéíóú ñ çãâêô")).toBe("aeiou-n-caaeo");
    });

    test("should convert to lowercase", () => {
      expect(TextFormatter.createSlug("HELLO WORLD")).toBe("hello-world");
    });

    test("should trim whitespace", () => {
      expect(TextFormatter.createSlug("  Hello World  ")).toBe("hello-world");
    });

    test("should replace consecutive hyphens with a single hyphen", () => {
      expect(TextFormatter.createSlug("Hello--World")).toBe("hello-world");
    });

    test("should handle a mix of cases and special characters", () => {
      expect(TextFormatter.createSlug("Olá Mundo! Como vai? 123")).toBe(
        "ola-mundo-como-vai-123"
      );
    });
  });
});
