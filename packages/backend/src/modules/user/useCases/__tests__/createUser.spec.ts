import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { CreateUser, CreateUserResponse } from '../CreateUser';
import { UserRepoSpy } from '../../testObjects/userRepoSpy';
import { UserPhoneNumber } from '../../domain/UserPhoneNumber';

const feature = loadFeature(path.join(__dirname, './createUser.feature'));

defineFeature(feature, (test) => {
  let result: CreateUserResponse;

  let userId: string | null;
  let fullName: string;
  let phoneNumber: string;

  let createUser: CreateUser | undefined;
  let userRepoSpy: UserRepoSpy | undefined;

  beforeEach(() => {
    createUser = undefined;
    userRepoSpy = undefined;
  });

  test('Valid user details', ({ given, when, then }) => {
    given('I provide valid details', () => {
      userId = '1';
      fullName = 'Sanzhar Alim';
      phoneNumber = '+77005005555';

      userRepoSpy = new UserRepoSpy([]);
      createUser = new CreateUser(userRepoSpy);
    });

    when('I attempt to create a user', async () => {
      const phoneNumberOrError = UserPhoneNumber.create(phoneNumber);
      const phoneNumberVO = phoneNumberOrError.getValue();

      if (createUser && userId) {
        result = await createUser.execute({ userId, fullName, phoneNumber: phoneNumberVO });
      }
    });

    then('I should get a successful response', () => {
      expect(result.value.isSuccess).toEqual(true);

      if (userRepoSpy) {
        expect(userRepoSpy.getTimesSaveCalled()).toEqual(1);
      }
    });
  });
});
