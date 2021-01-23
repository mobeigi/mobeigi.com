import supertest, { SuperTest, Test } from 'supertest';
import StatusCodes from 'http-status-codes';
import app from '@server';
import type { Response } from 'supertest';

describe('TradesRouter', () => {

  const tradesPath = '/trades/Last365CalendarDays';

  const { NOT_FOUND } = StatusCodes;
  let agent: SuperTest<Test>;

  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  describe(`"GET: ${tradesPath}"`, () => {
    it('should return not found for missing file', (done) => {
      // Call API
      void agent.get(tradesPath)
        .end((err: Error, res: Response) => {
          expect(res.status).toBe(NOT_FOUND+500);
          done();
        });
    }, 30000);
  });
});
