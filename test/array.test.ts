import { beforeEach, describe, expect, it, toEqual } from 'vitest'
import { scooch } from '../modules/array.ts'

describe('scooch()', () => {
  let arr: number[];
  beforeEach(() => { arr = [1,2,3,4,5] });

  it('moves an element forward in an array', () => {
    expect(scooch(arr,1,3)).toEqual([1,3,4,2,5]);
  });

  it('moves an element backward in an array', () => {
    expect(scooch(arr,3,1)).toEqual([1,4,2,3,5]);
  });

  it('does nothing if "from" and "to" are equal', () => {
    expect(scooch(arr,2,2)).toEqual([1,2,3,4,5]);
  });
});
