import { DocumentFormatter } from "./document";

describe("DocumentFormatter", () => {
  describe("cep", () => {
    it("should format a valid CEP", () => {
      expect(DocumentFormatter.cep("12345678")).toBe("12345-678");
    });

    it("should handle CEP with existing formatting", () => {
      expect(DocumentFormatter.cep("12345-678")).toBe("12345-678");
    });

    it("should remove non-numeric characters", () => {
      expect(DocumentFormatter.cep("12.345-678")).toBe("12345-678");
    });

    it("should truncate extra digits", () => {
      expect(DocumentFormatter.cep("123456789")).toBe("12345-678");
    });

    it("should return empty string if empty", () => {
      expect(DocumentFormatter.cep("")).toBe("");
    });

    it("should handle undefined value", () => {
      expect(
        DocumentFormatter.cep(undefined as unknown as string)
      ).toBeUndefined();
    });
  });

  describe("phone", () => {
    it("should format a valid phone number", () => {
      expect(DocumentFormatter.phone("11987654321")).toBe("(11) 98765-4321");
    });

    it("should handle phone with existing formatting", () => {
      expect(DocumentFormatter.phone("(11) 98765-4321")).toBe(
        "(11) 98765-4321"
      );
    });

    it("should remove non-numeric characters", () => {
      expect(DocumentFormatter.phone("11.98765-4321")).toBe("(11) 98765-4321");
    });

    it("should truncate extra digits", () => {
      expect(DocumentFormatter.phone("11987654321999")).toBe("(11) 98765-4321");
    });

    it("should return empty string if empty", () => {
      expect(DocumentFormatter.phone("")).toBe("");
    });

    it("should handle undefined value", () => {
      expect(
        DocumentFormatter.phone(undefined as unknown as string)
      ).toBeUndefined();
    });
  });

  describe("cnpj", () => {
    it("should format a valid CNPJ", () => {
      expect(DocumentFormatter.cnpj("12345678901234")).toBe(
        "12.345.678/9012-34"
      );
    });

    it("should handle CNPJ with existing formatting", () => {
      expect(DocumentFormatter.cnpj("12.345.678/9012-34")).toBe(
        "12.345.678/9012-34"
      );
    });

    it("should remove non-numeric characters", () => {
      expect(DocumentFormatter.cnpj("12$345.678/9012-34")).toBe(
        "12.345.678/9012-34"
      );
    });

    it("should truncate extra digits", () => {
      expect(DocumentFormatter.cnpj("12345678901234999")).toBe(
        "12.345.678/9012-34"
      );
    });

    it("should return empty string if empty", () => {
      expect(DocumentFormatter.cnpj("")).toBe("");
    });

    it("should handle undefined value", () => {
      expect(
        DocumentFormatter.cnpj(undefined as unknown as string)
      ).toBeUndefined();
    });
  });

  describe("cpf", () => {
    it("should format a valid CPF", () => {
      expect(DocumentFormatter.cpf("12345678901")).toBe("123.456.789-01");
    });

    it("should handle CPF with existing formatting", () => {
      expect(DocumentFormatter.cpf("123.456.789-01")).toBe("123.456.789-01");
    });

    it("should remove non-numeric characters", () => {
      expect(DocumentFormatter.cpf("123$456.789-01")).toBe("123.456.789-01");
    });

    it("should truncate extra digits", () => {
      expect(DocumentFormatter.cpf("12345678901999")).toBe("123.456.789-01");
    });

    it("should handle partial CPF values", () => {
      expect(DocumentFormatter.cpf("123456")).toBe("123.456");
    });

    it("should handle malformed input", () => {
      expect(DocumentFormatter.cpf("abc")).toBe("");
    });
  });
});
