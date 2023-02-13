import express from 'express';
import { userRouter } from '../../../../modules/user/infra/http/routes/user';

const v1Router = express.Router();

v1Router.get('/', (_, res) => {
  return res.json({ message: "api/v1/ Yo! we're up" });
});

v1Router.use('/user', userRouter);

export { v1Router };
