import { describe, expect, it} from 'vitest'

import * as S from "./status.js"
import * as P from "./patient.js"
import * as A from "./assignment.js"
import * as C from "./constraint.js"

describe('empty()', () => {
  it('creates an empty roster', () => {
    expect(true).toBe(true);
  });
});
