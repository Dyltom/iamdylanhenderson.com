import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const sendEmail = vi.hoisted(() => vi.fn());

vi.mock('../../../utils/sendEmail', () => ({ default: sendEmail }));

import { POST } from './route';

let requestCount = 0;

const postJson = (body: unknown) => {
  requestCount += 1;
  return POST(
    new NextRequest('http://localhost/api/send-email', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': `10.0.0.${requestCount}`,
      },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    })
  );
};

const validMessage = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Hello there',
};

describe('POST /api/send-email', () => {
  beforeEach(() => {
    sendEmail.mockReset();
    sendEmail.mockResolvedValue({ id: 'test' });
  });

  it('sends a valid message', async () => {
    const response = await postJson(validMessage);

    expect(response.status).toBe(200);
    expect(sendEmail).toHaveBeenCalledWith(validMessage);
  });

  it('trims fields before sending', async () => {
    await postJson({ ...validMessage, name: '  Ada  ' });

    expect(sendEmail).toHaveBeenCalledWith({ ...validMessage, name: 'Ada' });
  });

  it.each([
    ['malformed JSON', '{not json'],
    ['a non-object body', ['array']],
    ['a missing name', { ...validMessage, name: undefined }],
    ['a blank message', { ...validMessage, message: '   ' }],
    ['a non-string email', { ...validMessage, email: 42 }],
    ['an invalid email', { ...validMessage, email: 'not-an-email' }],
    ['an oversized message', { ...validMessage, message: 'x'.repeat(5001) }],
  ])('rejects %s with 400', async (_label, body) => {
    const response = await postJson(body);

    expect(response.status).toBe(400);
    expect(await response.json()).toHaveProperty('error');
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it('rate limits after five requests from one address', async () => {
    const send = () =>
      POST(
        new NextRequest('http://localhost/api/send-email', {
          method: 'POST',
          headers: { 'x-forwarded-for': '192.0.2.1' },
          body: JSON.stringify(validMessage),
        })
      );

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect((await send()).status).toBe(200);
    }
    expect((await send()).status).toBe(429);
  });
});
