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

describe('fromString()', () => {
  it('parses a room from a string regardless of whitespace.', () => {
    let bed = Bed.fromString('  14 -2');
    expect(bed.roomNumber).toBe(14);
    expect(bed.bedNumber).toBe(2);
  });

  it('has an optional bed number.', () => {
    let bed = Bed.fromString('8');
    expect(bed.roomNumber).toBe(8);
    expect(bed.bedNumber).toBe(undefined);
  });

  it('throws an error on an invalid string.', () => {
    expect(() => Bed.fromString('x')).toThrow();
  });
});

describe('label', () => {
  it('returns the expected bed string.', () => {
    expect(new Bed(10,4).label()).toBe('10-4');
  });

  it('does not contain a bed if one is not supplied.', () => {
    expect(new Bed(10).label()).toBe('10');
  });
});
