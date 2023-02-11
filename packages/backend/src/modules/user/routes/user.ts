import express from 'express';
import { CreateUserController } from '../useCases/CreateUserController';

const userRouter = express.Router();

userRouter.post('/', (req, res) => {
  return CreateUserController.execute(req, res);
});

export { userRouter };
