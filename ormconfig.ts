import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true, //TODO не забыть выключить
};

export default config;
