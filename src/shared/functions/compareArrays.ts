export function compareArrays(array01 = [], array02 = []): boolean {
  return (
    array01.length === array02.length &&
    array01.every((value, index) => value === array02[index])
  );
}
