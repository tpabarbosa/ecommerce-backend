import express, { NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';
import config from './config';
import NotFoundError from './middlewares/errorHandling/errors/NotFoundError';
import errorHandler from './middlewares/errorHandling';

const PORT = config.port as number;
const HOST = config.host;

class Server {
  public app: any;

  public init() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());

    this.app.use('/api', routes);

    this.app.get('/', (request, response) => {
      return response.json({
        message: `Server is running at ${HOST}:${PORT}!`,
      });
    });

    this.app.all('/*', (request, response, next: NextFunction) => {
      return next(new NotFoundError('Resource not found'));
    });

    this.app.use(errorHandler);

    this.app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Back-end started in ${HOST}:${PORT}!`);
    });
  }
}

export default Server;
