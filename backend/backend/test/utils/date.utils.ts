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
 * Gets the current date, optionally adds a specified number of days to it, and returns it in the format 'dd/mm/yyyy'.
 *
 * @param {number} [dateChange] - The number of days to add to the current date. If not provided, the current date is returned.
 * @returns {string} The date after the specified number of days have been added, formatted as 'dd/mm/yyyy'.
 */
export function getDate(dateChange?: number) {
    const date = new Date();
    if (dateChange) {
        date.setDate(date.getDate() + dateChange);
    }
    return formatDate(date)
}