import { describe, expect, it } from 'vitest';
import { commonDateFormatter } from './date';

describe('commonDateFormatter', () => {
  it.skip('formats ISO dates as long month, day and year', () => {
    expect(commonDateFormatter('2026-03-07T00:00:00')).toBe('March 07, 2026');
  });
});
