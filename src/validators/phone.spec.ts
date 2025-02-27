import { isValidPhone } from "./phone";

describe("Phone Validator", () => {
  describe("isValidPhone", () => {
    it("should return true for valid Brazilian phone numbers with area code", () => {
      expect(isValidPhone("(11) 98765-4321")).toBe(true);
      expect(isValidPhone("(21) 98765-4321")).toBe(true);
      expect(isValidPhone("(47) 98765-4321")).toBe(true);
    });

    it("should return true for valid Brazilian landline numbers", () => {
      expect(isValidPhone("(11) 3456-7890")).toBe(true);
      expect(isValidPhone("(21) 2345-6789")).toBe(true);
      expect(isValidPhone("(47) 3456-7890")).toBe(true);
    });

    it("should handle phone numbers with different valid formats", () => {
      expect(isValidPhone("11987654321")).toBe(true);
      expect(isValidPhone("1198765-4321")).toBe(true);
      expect(isValidPhone("(11)98765-4321")).toBe(true);
      expect(isValidPhone("11 98765 4321")).toBe(true);
    });

    it("should return false for invalid phone numbers", () => {
      expect(isValidPhone("123")).toBe(false);
      expect(isValidPhone("(11) 1234-567")).toBe(false);
      expect(isValidPhone("(11) 12345-6789")).toBe(false);
      expect(isValidPhone("(111) 9876-5432")).toBe(false);
    });

    it("should return false for phone numbers with non-numeric characters", () => {
      expect(isValidPhone("(11) 12345-ABCD")).toBe(false);
      expect(isValidPhone("(xx) xxxxx-xxxx")).toBe(false);
    });

    it("should return false for empty or null values", () => {
      expect(isValidPhone("")).toBe(false);
      expect(isValidPhone(null as unknown as string)).toBe(false);
      expect(isValidPhone(undefined as unknown as string)).toBe(false);
    });

    it("should reject obviously incorrect formats", () => {
      expect(isValidPhone("phone number")).toBe(false);
      expect(isValidPhone("9876-1234")).toBe(false);
      expect(isValidPhone("(11) 9876-54321")).toBe(false); // Too many digits
      expect(isValidPhone("(11) 9876-543")).toBe(false); // Too few digits
    });
  });
});
