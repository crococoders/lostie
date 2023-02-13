import { CreateUserController } from './CreateUserController';
import { CreateUser } from './CreateUser';
import { userRepo } from '../repos';

const createClient = new CreateUser(userRepo);
const createClientController = new CreateUserController(createClient);

export { createClientController };
