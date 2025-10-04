export function getHours(s: number) {
  const hours = Math.floor(s / 3600);
  return hours > 0 ? hours.toString() : null;
}

export function getMinutes(s: number) {
  const minutes = Math.floor((s % 3600) / 60);
  return minutes.toString();
}

export function getSeconds(s: number) {
  const seconds = s % 60;
  return seconds.toString().padStart(2, '0');
}
