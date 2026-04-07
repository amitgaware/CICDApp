const request = require('supertest');
const app = require('../server');

describe('Basic API tests', () => {

  test('GET / should return HELLO WORLD!!!', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('HELLO WORLD!!!');
  });

  test('GET /metrics should return metrics', async () => {
    const res = await request(app).get('/metrics');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('http_requests_total');
  });

});
