import { UserId } from './UserId';
import { UserPhoneNumber } from './UserPhoneNumber';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { Guard } from '../../../shared/core/Guard';
import { Result } from '../../../shared/core/Result';

export interface UserProps {
  fullName?: string;
  phoneNumber?: UserPhoneNumber;
  id: string;
  isActive?: boolean;
}

export class User extends AggregateRoot<UserProps> {
  get userId(): UserId {
    return UserId.create(this.id).getValue();
  }

  // TODO: check grammy api for optional fields
  get fullName(): string | null {
    return this.props.fullName ?? null;
  }

  get phoneNumber(): UserPhoneNumber | null {
    return this.props.phoneNumber ?? null;
  }

  get isActive(): boolean {
    return this.props.isActive ?? false;
  }

  private constructor(props: UserProps) {
    super(props);
  }

  public updateFullName(fullName: string): void {
    this.props.fullName = fullName;
  }

  public updatePhoneNumber(phoneNumber: UserPhoneNumber): void {
    this.props.phoneNumber = phoneNumber;
  }

  public static create(props: UserProps): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      {
        argument: props.id,
        argumentName: 'id',
      },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message ?? '');
    }

    const client = new User({
      ...props,
      isActive: props.isActive ? props.isActive : true,
    });

    return Result.ok<User>(client);
  }
}
