import { Request, Response } from 'express';
import { BaseController } from '../../../shared/infra/api/models/BaseController';
import { CreateUser } from './CreateUser';
import { CreateUserDTO } from './CreateUserDTO';
import { CreateUserErrors } from './CreateUserErrors';

export class CreateUserController extends BaseController {
  private useCase: CreateUser;

  constructor(useCase: CreateUser) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    const dto: CreateUserDTO = {
      userId: req.body.userId,
      fullName: req.body.fullName ? req.body.fullName : null,
      phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : null,
    };

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateUserErrors.UserAlreadyExistsError:
            return this.badRequest(res, error.errorValue().message);
          default:
            return this.fail(res, error.errorValue().message);
        }
      } else {
        return this.ok(res);
      }
    } catch (error: any) {
      return this.fail(res, error);
    }
  }
}
