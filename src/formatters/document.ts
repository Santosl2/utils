export class DocumentFormatter {
  static cep(value: string) {
    if (!value) return value;

    const formatter = value
      .replace(/\D/g, "")
      .replace(/^(\d{5})(\d)/g, "$1-$2")
      .replace(/-(\d{3})(\d{0,})/, "-$1");

    return formatter;
  }

  static phone(value: string) {
    if (!value) return value;

    const formatter = value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d{4})/, "$1-$2")
      .replace(/-(\d{4})(\d{0,})/, "-$1");

    return formatter;
  }

  static cnpj(value: string) {
    if (!value) return value;

    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})(\d+?)$/, "$1");
  }

  static cpf(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  }
}
