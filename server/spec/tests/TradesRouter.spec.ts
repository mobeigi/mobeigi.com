import supertest, { SuperTest, Test } from 'supertest';
import StatusCodes from 'http-status-codes';
import app from '@server';
import type { Response } from 'supertest';

describe('TradesRouter', () => {

  const tradesPath = '/trades/Last365CalendarDays';

  const { OK } = StatusCodes;
  let agent: SuperTest<Test>;

  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  const sleep = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  describe(`"GET: ${tradesPath}"`, () => {
    it('should return success', async (done) => {
      // TODO: Remove this sleep as we wait for Last365CalendarDays.xml to be generated
      await sleep(30000);

      // Call API
      void agent.get(tradesPath)
        .end((err: Error, res: Response) => {
          expect(res.status).toBe(OK);
          done();
        });
    }, 60000);
  });
});
