export enum SortType {
  up,
  down
}

export function compareUp(a, b, param: string) {
  if (a[param] < b[param]) {
    return -1;
  }
  if (a[param] > b[param]) {
    return 1;
  }
  return 0;
}

export function compareDown(a, b, param: string) {
  if (a[param] > b[param]) {
    return -1;
  }
  if (a[param] < b[param]) {
    return 1;
  }
  return 0;
}
