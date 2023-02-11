import { Result } from '../../../shared/core/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';

export interface UserPhoneNumberProps {
  value: string;
}

export class UserPhoneNumber extends ValueObject<UserPhoneNumberProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserPhoneNumberProps) {
    super(props);
  }

  private static isValidPhoneNumber(phoneNumber: string): boolean {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    return re.test(phoneNumber);
  }

  public static create(phoneNumber: string): Result<UserPhoneNumber> {
    if (!this.isValidPhoneNumber(phoneNumber)) {
      return Result.fail<UserPhoneNumber>('Phone number format is not valid!');
    } else {
      return Result.ok<UserPhoneNumber>(new UserPhoneNumber({ value: phoneNumber }));
    }
  }
}
