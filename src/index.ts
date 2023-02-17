/* eslint-disable no-console */
import 'dotenv/config';
import 'reflect-metadata';
import Server from './server';
import AppDataSource from './database/data-source';

// eslint-disable-next-line import/no-mutable-exports
// let app: unknown;
function bootstrap() {
  AppDataSource.initialize()
    .then(() => {
      const server = new Server();
      server.init();
      // app = server.app;
    })
    .catch((err) => {
      console.error('Database initialization error:');
      console.error(err);
    });
}

bootstrap();
// export default app;
module.exports = bootstrap;
