import fs from 'fs';
import { Knex } from 'knex';
import type { MysqlConnectionConfig } from '@shared/types';
import { getPrivatePath } from '@shared/utils/GetPrivatePath';
import { DATABASE_NAME } from './constants';

export const getKnexConfig = (): Knex.Config => {
  const mysqlConfig = JSON.parse(
    fs.readFileSync(`${getPrivatePath()}/database/config.json`).toString()
  ) as MysqlConnectionConfig;

  return {
    client: 'mysql',
    connection: {
      host: mysqlConfig.host,
      port: mysqlConfig.port,
      user: mysqlConfig.username,
      password: mysqlConfig.password,
      database: DATABASE_NAME,
    },
  };
};
