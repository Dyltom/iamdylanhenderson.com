import { describe, expect, it } from 'vitest';
import { CV_DATA } from './cvTypes';
import { generatePDF } from './pdfGeneratorClean';

describe('generatePDF', () => {
  it('renders the CV into a multi-section PDF', () => {
    const doc = generatePDF(CV_DATA);
    const output = doc.output();

    expect(output.startsWith('%PDF-')).toBe(true);
    expect(doc.getNumberOfPages()).toBeGreaterThanOrEqual(1);
    expect(output).toContain(CV_DATA.personalInfo.name);
  });
});
