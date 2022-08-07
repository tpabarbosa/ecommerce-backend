import { DataSource, DataSourceOptions } from 'typeorm';

if (!process.env.POSTGRES_URL) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  const dotenv = require('dotenv');
  dotenv.config();
}

let options: DataSourceOptions;
if (process.env.NODE_ENV === 'test') {
  options = {
    type: 'sqlite',
    database: './tests/database/database.sqlite.db',
    synchronize: false,
    logging: true,
    entities: ['./src/**/entities/**/*.ts'],
    subscribers: [],
    migrations: ['./src/database/migrations/**/*.ts'],
  };
} else if (process.env.NODE_ENV === 'dev') {
  options = {
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    synchronize: false,
    logging: false,
    entities: ['./src/**/entities/**/*.[jt]s'],
    subscribers: [],
    migrations: ['./src/database/migrations/**/*.[jt]s'],
  };
} else {
  options = {
    type: 'postgres',
    url: process.env.POSTGRES_URL,
    synchronize: false,
    logging: false,
    entities: ['./**/entities/**/*.js'],
    subscribers: [],
    migrations: ['./database/migrations/**/*.js'],
  };
}

const AppDataSource = new DataSource(options);

export default AppDataSource;
