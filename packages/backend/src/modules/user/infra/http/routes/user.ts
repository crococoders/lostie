import express from 'express';
import { createClientController } from '../../../useCases/index';

const userRouter = express.Router();

userRouter.post('/', (req, res) => createClientController.execute(req, res));

export { userRouter };
