import * as datefns from 'date-fns'
import { ptBR } from 'date-fns/locale'

datefns.setDefaultOptions({
  locale: ptBR,
})

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class DateParser {
  static fns = datefns
  static lang = ptBR

  static convertToMidnight(value: string | Date) {
    if (value instanceof Date) return value
    return new Date(`${value}T00:00:00`)
  }

  static formatToLocaleDateString(value: string | Date) {
    return DateParser.formatWithPattern(
      DateParser.convertToMidnight(value),
      'dd/LL/yyyy'
    )
  }

  static getMonthName(value: string | Date) {
    return DateParser.formatWithPattern(
      DateParser.convertToMidnight(value),
      'MMM'
    )
  }

  static formatToLongDateString(date: Date) {
    try {
      return DateParser.fns.format(new Date(date), "dd 'de' MMM, yyy", {
        locale: ptBR,
      })
    } catch {
      return ''
    }
  }

  static formatWithPattern(date: Date, formatString = 'yyyy-LL-dd') {
    try {
      return DateParser.fns.format(new Date(date), formatString, {
        locale: ptBR,
      })
    } catch {
      return ''
    }
  }

  static getPreviousDay() {
    return DateParser.fns.subDays(new Date(), 1)
  }

  static getPreviousMonthName() {
    return DateParser.formatWithPattern(
      DateParser.fns.subMonths(new Date(), 1),
      'LLL'
    )
  }
}
