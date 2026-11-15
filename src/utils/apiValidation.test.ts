import { describe, expect, it } from 'vitest';
import { escapeHtml } from './apiValidation';

describe('escapeHtml', () => {
  it('escapes markup so contact messages cannot inject HTML', () => {
    expect(escapeHtml(`<a href="x">Tom & Jerry's</a>`)).toBe(
      '&lt;a href=&quot;x&quot;&gt;Tom &amp; Jerry&#39;s&lt;/a&gt;'
    );
  });
});
