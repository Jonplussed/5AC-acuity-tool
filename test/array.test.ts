import { beforeEach, describe, expect, it, toEqual } from 'vitest'
import { scooch } from '../modules/array.ts'

describe('scooch()', () => {
  let a1: number[];
  let a2: number[];

  beforeEach(() => {
    a1 = [1,2,3,4,5];
  });

  it('moves an element forward in an array', () => {
    a2 = [1,3,4,2,5];
    expect(scooch(a1,1,3)).toEqual(a2);
  });

  it('moves an element backward in an array', () => {
    a2 = [1,4,2,3,5];
    expect(scooch(a1,3,1)).toEqual(a2);
  });
});
