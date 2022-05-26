export function compareArrays(array01 = [], array02 = []): boolean {
  array01.sort((a, b) => (a > b ? 1 : -1));
  array02.sort((a, b) => (a > b ? 1 : -1));

  return (
    array01.length === array02.length &&
    array01.every((value, index) => value === array02[index])
  );
}
