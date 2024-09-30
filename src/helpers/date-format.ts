export class DateFormatter {
  /**
   * Formats a date in the "day of month of year" format.
   * @param date - The date to format.
   * @returns A string with the formatted date in the "day of month of year" format.
   * @example formatFullDate(new Date()) => '30 de septiembre de 2024'
   */
  static getFullDate(date: Date): string {
    const formatter = new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });
    return formatter.format(date);
  }
}
