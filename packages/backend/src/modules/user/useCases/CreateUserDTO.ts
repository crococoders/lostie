import { UserPhoneNumber } from '../domain/UserPhoneNumber';

export type CreateUserDTO = {
  // TODO: check grammy api for optional fields
  fullName?: string;
  userId: string;
  phoneNumber?: UserPhoneNumber;
};
