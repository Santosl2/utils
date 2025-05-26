import * as datefns from "date-fns";
import { ptBR } from "date-fns/locale";

datefns.setDefaultOptions({
  locale: ptBR,
});

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class DateParser {
  static fns = datefns;
  static lang = ptBR;

  /**
   * Converts a date string or Date object to a Date object representing the start of the day (midnight).
   * @param value - The date to convert, can be a string or a Date object.
   * @returns A Date object representing the start of the day.
   * @example
   * DateParser.convertToMidnight("2023-10-01") // new Date("2023-10-01T00:00:00")
   * DateParser.convertToMidnight(new Date(2023, 9, 1)) // new Date("2023-10-01T00:00:00")
   */
  static convertToMidnight(value: string | Date) {
    if (value instanceof Date) return value;
    return new Date(`${value}T00:00:00`);
  }

  /**
   * Converts a date string or Date object to a Date object representing the start of the day (midnight).
   * @param value - The date to convert, can be a string or a Date object.
   * @returns A Date object representing the start of the day.
   * @example
   * DateParser.convertToMidnight("2023-10-01") // new Date("2023-10-01T23:59:00")
   * DateParser.convertToMidnight(new Date(2023, 9, 1)) // new Date("2023-10-01T23:59:00")
   */
  static convertToEndNight(value: string | Date) {
    if (value instanceof Date) return value;
    return new Date(`${value}T23:59:59`);
  }

  /**
   * Formats a date to a string in the format "dd/LL/yyyy"
   * @param value - The date to format, can be a string or a Date object.
   * @returns A string representing the date in the format "dd/LL/yyyy"
   * @example
   * DateParser.formatToLocaleDateString("2023-10-01") // "01/10/2023"
   * DateParser.formatToLocaleDateString(new Date(2023, 9, 1)) // "01/10/2023"
   */
  static formatToLocaleDateString(value: string | Date) {
    return DateParser.formatWithPattern(
      DateParser.convertToMidnight(value),
      "dd/LL/yyyy"
    );
  }

  /**
   * Gets the month name from a date string or Date object.
   * This method formats the date to a string in the format "MMM" (e.g., "Jan", "Feb", etc.).
   * It uses the `convertToMidnight` method to ensure the date is at midnight before formatting.
   * @param value - The date to format, can be a string or a Date object.
   * @returns A string representing the date in the format "MMM"
   * @example
   * DateParser.getMonthName("2023-10-01") // "Out"
   * DateParser.getMonthName(new Date(2023, 9, 1)) // "Out"
   */
  static getMonthName(value: string | Date) {
    return DateParser.formatWithPattern(
      DateParser.convertToMidnight(value),
      "MMM"
    );
  }

  /**
   * Formats a date to a string in the format "dd 'de' MMM, yyy"
   * @param date - The date to format, can be a string or a Date object.
   * @returns A string representing the date in the format "dd 'de' MMM, yyy"
   * @example
   * DateParser.formatToLongDateString("2023-10-01") // "01 de Out, 2023"
   * DateParser.formatToLongDateString(new Date(2023, 9, 1)) // "01 de Out, 2023"
   */
  static formatToLongDateString(date: Date) {
    try {
      return DateParser.fns.format(new Date(date), "dd 'de' MMM, yyy", {
        locale: ptBR,
      });
    } catch {
      return "";
    }
  }

  /**
   * Formats a date to a string using a specified pattern.
   * @param date - The date to format, can be a string or a Date object.
   * @param formatString - The format string to use, defaults to "yyyy-LL-dd".
   * @returns A string representing the formatted date.
   * @example
   * DateParser.formatWithPattern("2023-10-01") // "2023-10-01"
   */
  static formatWithPattern(date: Date, formatString = "yyyy-LL-dd") {
    try {
      return DateParser.fns.format(new Date(date), formatString, {
        locale: ptBR,
      });
    } catch {
      return "";
    }
  }

  /**
   * Parses a date string into a Date object.
   * @param date - The date string to parse, can be in various formats.
   * @returns A Date object representing the parsed date.
   * @example
   * DateParser.parseDate("2023-10-02") // new Date("2023-10-01")
   */
  static getPreviousDay() {
    return DateParser.fns.subDays(new Date(), 1);
  }

  /**
   * Gets the name of the previous month.
   * This method formats the date to a string in the format "LLL" (e.g., "Jan", "Feb", etc.).
   * It uses the `subMonths` method to get the date of the previous month.
   * @returns A string representing the name of the previous month.
   * @example
   * DateParser.getPreviousMonthName() // "Set"
   */
  static getPreviousMonthName() {
    return DateParser.formatWithPattern(
      DateParser.fns.subMonths(new Date(), 1),
      "LLL"
    );
  }
}
