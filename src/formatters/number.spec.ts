import { NumberFormatter } from "./number";
describe("NumberFormatter", () => {
  describe("onlyNumbers", () => {
    it("should remove all non-numeric characters", () => {
      expect(NumberFormatter.onlyNumbers("abc123def456")).toBe("123456");
    });

    it("should handle strings with spaces and special characters", () => {
      expect(NumberFormatter.onlyNumbers("123 456-789.00")).toBe("12345678900");
    });

    it("should handle empty string", () => {
      expect(NumberFormatter.onlyNumbers("")).toBe("");
    });

    it("should handle null or undefined values", () => {
      expect(NumberFormatter.onlyNumbers(null as unknown as string)).toBe("");
      expect(NumberFormatter.onlyNumbers(undefined as unknown as string)).toBe(
        ""
      );
    });

    it("should handle strings with only non-numeric characters", () => {
      expect(NumberFormatter.onlyNumbers("abc!@#")).toBe("");
    });

    it("should handle phone-like formatted strings", () => {
      expect(NumberFormatter.onlyNumbers("(11) 98765-4321")).toBe(
        "11987654321"
      );
    });

    it("should handle document formatted strings", () => {
      expect(NumberFormatter.onlyNumbers("123.456.789-01")).toBe("12345678901");
      expect(NumberFormatter.onlyNumbers("12.345.678/0001-90")).toBe(
        "12345678000190"
      );
    });
  });
});
