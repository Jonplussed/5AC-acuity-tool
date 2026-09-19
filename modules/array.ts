// TODO: Handle out-of-bound indexes.
export const scooch = <T>(arr: T[], from: number, to: number): T[] => {
  if (from >= arr.length) { throw new Error(`"from" (${from}) is beyond array range`); }
  if (to >= arr.length) { throw new Error(`"to" (${to}) is beyond array range`); }

  let ele = arr[from];

  if (to > from) {
    for (let i = from; i < to; i++) { arr[i] = arr[i+1]; }
  } else {
    for (let i = from; i > to; i--) { arr[i] = arr[i-1]; }
  }

  arr[to] = ele;
  return arr;
}
