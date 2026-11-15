import { NextRequest } from 'next/server';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CV_DATA } from '../../../utils/cvTypes';

const createCompletion = vi.hoisted(() => vi.fn());

vi.mock('openai', () => ({
  default: class {
    chat = { completions: { create: createCompletion } };
  },
}));

import { POST } from './route';

const postJson = (body: unknown) =>
  POST(
    new NextRequest('http://localhost/api/cv-optimizer', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    })
  );

const validRequest = {
  jobDescription: 'Senior TypeScript engineer',
  currentCV: CV_DATA,
};

describe('POST /api/cv-optimizer', () => {
  beforeEach(() => {
    vi.stubEnv('OPENAI_API_KEY', 'test-key');
    createCompletion.mockReset();
    createCompletion.mockResolvedValue({
      choices: [{ message: { content: '{"summary":"ok"}' } }],
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns suggestions for a valid request', async () => {
    const response = await postJson(validRequest);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ suggestions: { summary: 'ok' } });
    expect(createCompletion).toHaveBeenCalledOnce();
  });

  it.each([
    ['malformed JSON', '{not json'],
    ['a missing job description', { currentCV: CV_DATA }],
    ['a blank job description', { ...validRequest, jobDescription: ' ' }],
    [
      'an oversized job description',
      { ...validRequest, jobDescription: 'x'.repeat(20001) },
    ],
    ['a missing CV', { jobDescription: 'role' }],
    [
      'a CV without a skills list',
      { ...validRequest, currentCV: { ...CV_DATA, skills: 'TypeScript' } },
    ],
    [
      'a CV with malformed experience',
      { ...validRequest, currentCV: { ...CV_DATA, experience: [{}] } },
    ],
  ])('rejects %s with 400', async (_label, body) => {
    const response = await postJson(body);

    expect(response.status).toBe(400);
    expect(await response.json()).toHaveProperty('error');
    expect(createCompletion).not.toHaveBeenCalled();
  });

  it('reports a missing API key without calling OpenAI', async () => {
    vi.stubEnv('OPENAI_API_KEY', '');

    const response = await postJson(validRequest);

    expect(response.status).toBe(500);
    expect(createCompletion).not.toHaveBeenCalled();
  });
});
