import { UserPhoneNumber } from '../domain/UserPhoneNumber';

export type CreateUserDTO = {
  // TODO: check grammy api for optional fields
  fullName?: string;
  chatId: string;
  phoneNumber?: UserPhoneNumber;
};
