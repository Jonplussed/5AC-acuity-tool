import { describe, expect, it } from 'vitest'

import { Bed } from '../modules/bed.ts'

describe('isSameBedAs()', () => {
  it('is true when the room # and bed # are equal', () => {
    let b1 = new Bed(1, 1);
    let b2 = new Bed(1, 1);
    expect(b1.isSameBedAs(b2)).toBe(true);
  });

  it('is false when the room #s differ', () => {
    let b1 = new Bed(1, 1);
    let b2 = new Bed(2, 1);
    expect(b1.isSameBedAs(b2)).toBe(false);
  });

  it('is false when the bed #s differ', () => {
    let b1 = new Bed(1, 1);
    let b2 = new Bed(1, 2);
    expect(b1.isSameBedAs(b2)).toBe(false);
  });
});

describe('isSameRoomAs()', () => {
  it('is true when the room #s are equal', () => {
    let b1 = new Bed(1, 1);
    let b2 = new Bed(1, 2);
    expect(b1.isSameRoomAs(b2)).toBe(true);
  });

  it('is false when the room #s differ', () => {
    let b1 = new Bed(1, 1);
    let b2 = new Bed(2, 1);
    expect(b1.isSameRoomAs(b2)).toBe(false);
  });
});
