import { Mapper } from '../../../shared/infra/Mapper';
import { User } from '../domain/User';
import { UserPhoneNumber } from '../domain/UserPhoneNumber';

export class UserMap implements Mapper<User | null> {
  public toDomain(raw: any): User | null {
    let phoneNumber: UserPhoneNumber | undefined = undefined;

    if (raw.phoneNumber) {
      const phoneNumberOrError = UserPhoneNumber.create(raw.phoneNumber);
      phoneNumber = phoneNumberOrError.getValue();
    }

    const userOrError = User.create({
      id: raw.chatId,
      fullName: raw.fullName,
      phoneNumber,
      isActive: raw.isActive,
    });
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public toPersistence(user: User) {
    return {
      id: user.userId.id.toString(),
      chatId: user.id,
      fullName: user.fullName ? user.fullName : null,
      phoneNumber: user.phoneNumber ? user.phoneNumber.value : null,
      isActive: user.isActive,
    };
  }
}
