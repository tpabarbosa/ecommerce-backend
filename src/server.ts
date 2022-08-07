import express, { NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import config from './config';
import NotFoundError from './middlewares/errorHandling/errors/NotFoundError';
import errorHandler from './middlewares/errorHandling';

const PORT = config.port as number;
const HOST = config.host;

class Server {
  public init() {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());

    app.get('/', (request, response) => {
      return response.json({
        message: `Server is running at ${HOST}:${PORT}!`,
      });
    });

    app.use('/api', routes);

    app.all('/*', (request, response, next: NextFunction) => {
      return next(new NotFoundError('Resource not found'));
    });

    app.use(errorHandler);

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Back-end started in ${HOST}:${PORT}!`);
    });
  }
}

export default Server;
