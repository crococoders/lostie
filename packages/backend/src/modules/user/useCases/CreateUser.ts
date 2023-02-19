import { Either, left, Result, right } from '../../../shared/core/Result';
import { User, UserProps } from '../domain/User';
import { IUserRepo } from '../repos/userRepo';
import { CreateUserDTO } from './CreateUserDTO';
import { UnexpectedError } from '../../../shared/core/AppError';
import { UserPhoneNumber } from '../domain/UserPhoneNumber';

export type CreateUserResponse = Either<UnexpectedError | Result<any>, Result<void>>;

export class CreateUser {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  public async execute(dto: CreateUserDTO): Promise<CreateUserResponse> {
    try {
      const phoneNumberVO = dto.phoneNumber ? UserPhoneNumber.create(dto.phoneNumber) : undefined;
      if (phoneNumberVO?.isFailure) {
        return left(phoneNumberVO);
      }

      const userProps: UserProps = {
        id: dto.userId,
        fullName: dto.fullName,
        phoneNumber: phoneNumberVO?.getValue(),
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
