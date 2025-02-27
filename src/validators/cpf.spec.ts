import { isValidCpf } from "./cpf";

describe("CPF Validator", () => {
  describe("isValidCpf", () => {
    it("should return false for empty values", () => {
      expect(isValidCpf("")).toBe(false);
      expect(isValidCpf(null as unknown as string)).toBe(false);
      expect(isValidCpf(undefined as unknown as string)).toBe(false);
    });

    it("should return false for CPFs with incorrect length", () => {
      expect(isValidCpf("1234567890")).toBe(false); // Too short
      expect(isValidCpf("123456789012")).toBe(false); // Too long
    });

    it("should return false for CPFs with all the same digits", () => {
      expect(isValidCpf("00000000000")).toBe(false);
      expect(isValidCpf("11111111111")).toBe(false);
      expect(isValidCpf("99999999999")).toBe(false);
    });

    it("should validate valid CPFs", () => {
      expect(isValidCpf("00000000000")).toBe(false);
      expect(isValidCpf("52663395862")).toBe(true);
      expect(isValidCpf("12917551283")).toBe(true);
    });

    it("should handle formatted CPFs", () => {
      expect(isValidCpf("529.982.247-25")).toBe(true);
      expect(isValidCpf("123.456.789-09")).toBe(true);
    });

    it("should reject invalid CPFs", () => {
      expect(isValidCpf("12345678910")).toBe(false); // Changed last digit
      expect(isValidCpf("52998224726")).toBe(false); // Changed last digit
      expect(isValidCpf("78546398721")).toBe(false); // Changed last digit
    });

    it("should accept array input", () => {
      expect(
        isValidCpf([
          "5",
          "2",
          "9",
          "9",
          "8",
          "2",
          "2",
          "4",
          "7",
          "2",
          "5",
        ] as unknown as string)
      ).toBe(true);
      expect(
        isValidCpf([
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "0",
          "9",
        ] as unknown as string)
      ).toBe(true);
    });

    it("should handle CPFs with special characters and spaces", () => {
      expect(isValidCpf("529.982.247-25")).toBe(true);
      expect(isValidCpf("529 982 247 25")).toBe(true);
      expect(isValidCpf("529-982-247/25")).toBe(true);
    });

    it("should handle CPFs with incorrect verification digits", () => {
      expect(isValidCpf("52998224726")).toBe(false);
      expect(isValidCpf("52998224735")).toBe(false);
    });

    it("should handle number input formatted as string", () => {
      expect(isValidCpf("52998224725")).toBe(true);
    });

    it("should handle non-string, non-array inputs correctly", () => {
      expect(isValidCpf(52998224725 as unknown as string)).toBe(false); // Number input is not supported
      expect(isValidCpf({} as unknown as string)).toBe(false); // Object input is not supported
    });
  });
});
