/* eslint-disable @typescript-eslint/no-namespace */
import { Result } from '../../../shared/core/Result';
import { UseCaseError } from '../../../shared/core/UseCaseError';

export namespace CreateUserErrors {
  export class UserAlreadyExistsError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'User already exists.',
      } as UseCaseError);
    }
  }
}
