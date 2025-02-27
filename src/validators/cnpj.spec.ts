import { isValidCNPJ } from "./cnpj";

describe("CNPJ Validator", () => {
  describe("isValidCNPJ", () => {
    it("should return false for empty values", () => {
      expect(isValidCNPJ("")).toBe(false);
      expect(isValidCNPJ(null as any)).toBe(false);
      expect(isValidCNPJ(undefined as any)).toBe(false);
    });

    it("should return false for CNPJs with incorrect length", () => {
      expect(isValidCNPJ("1234567890123")).toBe(false); // Too short
      expect(isValidCNPJ("123456789012345")).toBe(false); // Too long
    });

    it("should return false for CNPJs with all the same digits", () => {
      expect(isValidCNPJ("00000000000000")).toBe(false);
      expect(isValidCNPJ("11111111111111")).toBe(false);
      expect(isValidCNPJ("99999999999999")).toBe(false);
    });

    it("should handle formatted CNPJs", () => {
      expect(isValidCNPJ("11.222.333/0001-81")).toBe(true);
    });

    it("should validate valid CNPJs", () => {
      expect(isValidCNPJ("11222333000181")).toBe(true);
      expect(isValidCNPJ("63025530000104")).toBe(true);
      expect(isValidCNPJ("33400689000109")).toBe(true);
    });

    it("should reject invalid CNPJs", () => {
      expect(isValidCNPJ("11222333000182")).toBe(false); // Changed last digit
      expect(isValidCNPJ("63025530000105")).toBe(false); // Changed last digit
      expect(isValidCNPJ("33400689000100")).toBe(false); // Changed last digit
    });

    it("should accept number input", () => {
      expect(isValidCNPJ(11222333000181)).toBe(true);
    });

    it("should accept array of numbers input", () => {
      expect(isValidCNPJ([1, 1, 2, 2, 2, 3, 3, 3, 0, 0, 0, 1, 8, 1])).toBe(
        true
      );
      expect(isValidCNPJ([1, 1, 2, 2, 2, 3, 3, 3, 0, 0, 0, 1, 8, 2])).toBe(
        false
      );
    });

    it("should handle CNPJs with incorrect verification digits", () => {
      expect(isValidCNPJ("11222333000182")).toBe(false);
      expect(isValidCNPJ("11222333000191")).toBe(false);
    });

    it("should handle CNPJs with special characters and spaces", () => {
      expect(isValidCNPJ("11.222.333/0001-81")).toBe(true);
      expect(isValidCNPJ("11 222 333 0001 81")).toBe(true);
      expect(isValidCNPJ("11-222-333/0001.81")).toBe(true);
    });
  });

  // Optional: Test the internal functions if they're exported or if you prefer to test them
  describe("internal functions", () => {
    // Since matchNumbers is not exported, we can test it indirectly through isValidCNPJ
    it("should handle different input formats through matchNumbers", () => {
      expect(isValidCNPJ("11.222.333/0001-81")).toBe(true);
      expect(isValidCNPJ(11222333000181)).toBe(true);
    });
  });
});
