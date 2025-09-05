/**
 * Get an item from the session storage.
 * @param key - The item key.
 * @param defaultValue - The default value to specify.
 * @returns The item value or the specified default value.
 */
export function getSessionItem<T>(key: string, defaultValue: T): T {
  const valueAsText = sessionStorage.getItem(key);
  if (valueAsText === null) return defaultValue;
  return JSON.parse(valueAsText);
}

/**
 * Set an item to the session storage.
 * @param key - The item key.
 * @param value - The item value.
 */
export function setSessionItem<T>(key: string, value: T) {
  const valueAsText = JSON.stringify(value);
  sessionStorage.setItem(key, valueAsText);
}
