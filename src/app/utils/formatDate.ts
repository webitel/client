const TIMEZONE_STORAGE_KEY = 'user-timezone-setting';

/**
 * Gets user's saved timezone from localStorage
 * Falls back to browser timezone if not found
 */
const getUserTimezone = (): string => {
  return (
    localStorage.getItem(TIMEZONE_STORAGE_KEY) ??
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
};

/**
 * Formats date as locale date string using user's timezone
 * Replaces native Date.prototype.toLocaleDateString()
 *
 * @param date - The date to format
 * @param locales - Locale or array of locales (e.g., 'en-US', 'uk-UA')
 * @param options - Additional Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export const toLocaleDateString = (
  date: Date,
  locales?: string | string[],
  options?: Intl.DateTimeFormatOptions,
): string => {
  const userTimezone = getUserTimezone();

  const formatOptions: Intl.DateTimeFormatOptions = {
    timeZone: userTimezone,
    ...options,
  };

  return new Intl.DateTimeFormat(locales, formatOptions).format(date);
};

/**
 * Formats date as locale string (date + time) using user's timezone
 * Replaces native Date.prototype.toLocaleString()
 *
 * @param date - The date to format
 * @param locales - Locale or array of locales (e.g., 'en-US', 'uk-UA')
 * @param options - Additional Intl.DateTimeFormat options
 * @returns Formatted date and time string
 */
export const toLocaleString = (
  date: Date,
  locales?: string | string[],
  options?: Intl.DateTimeFormatOptions,
): string => {
  const userTimezone = getUserTimezone();

  const formatOptions: Intl.DateTimeFormatOptions = {
    timeZone: userTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    ...options,
  };

  return new Intl.DateTimeFormat(locales, formatOptions).format(date);
};

/**
 * Formats time part of date using user's timezone
 * Replaces native Date.prototype.toLocaleTimeString()
 *
 * @param date - The date to format
 * @param locales - Locale or array of locales (e.g., 'en-US', 'uk-UA')
 * @param options - Additional Intl.DateTimeFormat options
 * @returns Formatted time string
 */
export const toLocaleTimeString = (
  date: Date,
  locales?: string | string[],
  options?: Intl.DateTimeFormatOptions,
): string => {
  const userTimezone = getUserTimezone();

  const formatOptions: Intl.DateTimeFormatOptions = {
    timeZone: userTimezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    ...options,
  };

  return new Intl.DateTimeFormat(locales, formatOptions).format(date);
};

/**
 * Helper function to create a Date object from timestamp
 * Commonly used pattern in the codebase: new Date(+timestamp)
 *
 * @param timestamp - Unix timestamp (string or number)
 * @returns Date object
 */
export const createDateFromTimestamp = (timestamp: string | number): Date => {
  return new Date(Number(timestamp));
};

export const formatDate = {
  toLocaleDateString,
  toLocaleString,
  toLocaleTimeString,
  createDateFromTimestamp,
  getUserTimezone,
};

export default formatDate;
