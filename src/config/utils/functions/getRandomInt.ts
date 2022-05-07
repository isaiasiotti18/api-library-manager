export function getRandomInt(min = 0, max = 0): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
