export const scooch = (arr: any[], from: number, to: number): T[] => {
  let ele = arr[from];

  if (to > from) {
    for (let i = from; i < to; i++) { arr[i] = arr[i+1]; }
  } else {
    for (let i = from; i > to; i--) { arr[i] = arr[i-1]; }
  }

  arr[to] = ele;
  return arr;
}
