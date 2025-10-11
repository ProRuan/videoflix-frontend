/**
 * Get the formatted hours from a time.
 * @param s - The time in seconds.
 * @returns The formatted hours or null.
 */
export function getHours(s: number) {
  const hours = Math.floor(s / 3600);
  return hours > 0 ? hours.toString() : null;
}

/**
 * Get the formatted minutes from a time.
 * @param s - The time in seconds.
 * @returns The formatted minutes.
 */
export function getMinutes(s: number) {
  const minutes = Math.floor((s % 3600) / 60);
  return minutes.toString();
}

/**
 * Get the formatted seconds from a time.
 * @param s - The time in seconds.
 * @returns The formatted seconds.
 */
export function getSeconds(s: number) {
  const seconds = s % 60;
  return seconds.toString().padStart(2, '0');
}
