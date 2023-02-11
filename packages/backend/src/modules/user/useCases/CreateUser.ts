import { Either, left, Result, right } from '../../../shared/core/Result';
import { User, UserProps } from '../domain/User';
import { UserRepo } from '../repos/userRepo';
import { CreateUserDTO } from './CreateUserDTO';
import { CreateUserErrors } from './CreateUserErrors';
import { UnexpectedError } from '../../../shared/core/AppError';

type Response = Either<UnexpectedError | Result<any>, Result<void>>;

export class CreateUser {
  private userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(dto: CreateUserDTO): Promise<Response> {
    let exists: boolean;

    try {
      exists = await this.userRepo.chatIdExists(dto.chatId);
    } catch (error) {
      return left(new UnexpectedError(error));
    }

    if (exists) {
      return left(new CreateUserErrors.UserAlreadyExistsError());
    }

    try {
      const userProps: UserProps = {
        chatId: dto.chatId,
        fullName: dto.fullName,
        phoneNumber: dto.phoneNumber,
      };

      const userOrError = User.create(userProps);

      if (userOrError.isFailure) {
        return left(userOrError);
      }

      const user = userOrError.getValue();
      await this.userRepo.save(user);
      return right(Result.ok<void>());
    } catch (error) {
      return left(new UnexpectedError(error));
    }
  }
}
