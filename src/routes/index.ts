import { Router } from 'express';
import authRouter from './auth.routes';
import productsRouter from './products.routes';
import usersRouter from './users.routes';

const apiRoutes = Router();

apiRoutes.get('/', (req, res) => {
  return res.status(200).json({ message: 'API IS WORKING' });
});
apiRoutes.get('/v1', (req, res) => {
  return res.status(200).json({ message: 'API V1 IS WORKING' });
});

apiRoutes.use('/v1/users', usersRouter);
apiRoutes.use('/v1/auth', authRouter);
apiRoutes.use('/v1/products', productsRouter);

export default apiRoutes;
