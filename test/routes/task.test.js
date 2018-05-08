import request from 'supertest';
import app from '../../src';

describe('task routes', () => {

  describe('GET /api/task', () => {

    it('returns tasks when route is hit', async () => {
      const result = await request(app).get('/api/tasks');
      expect(result.status).to.equal(200);
      expect(result.body.data).to.be.an.array();

    });

  });

});
