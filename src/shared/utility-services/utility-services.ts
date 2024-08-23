/**
 * Formats a number to have two decimal places.
 * @param {number} value - The value to be formatted.
 * @returns {number} The formatted value.
 */
export const formatMoney = (value: number): number => Number(value.toFixed(2));
