export class NumberFormatter {
  static formatMoney(
    value: number,
    locale = "pt-BR",
    currency = "BRL"
  ): string {
    if (!value || isNaN(value))
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).format(0);
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(value);
  }

  static onlyNumbers(value: string): string {
    return value ? value.replace(/\D/g, "") : "";
  }
}
