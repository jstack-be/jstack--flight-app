/**
 * Formats a given date into a string in the format 'dd/mm/yyyy'.
 *
 * @param {Date} date - The date to be formatted.
 * @returns {string} The formatted date.
 */
export const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

/**
 * Adds a given number of days to a given date.
 *
 * @param {Date} date - The date to which the days will be added.
 * @param {number} dateChange - The number of days to be added to the date.
 * @returns {string} The formatted date.
 */
export function addDays(date: Date, dateChange?: number) {
    date.setDate(date.getDate() + dateChange);
    return formatDate(date)
}