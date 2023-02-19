import { defineFeature, loadFeature } from 'jest-cucumber';
import * as path from 'path';
import { CreateUser, CreateUserResponse } from '../CreateUser';
import { UserRepoSpy } from '../../testObjects/userRepoSpy';

const feature = loadFeature(path.join(__dirname, './createUser.feature'));

defineFeature(feature, (test) => {
  let result: CreateUserResponse;
  let userId: string | undefined;
  let fullName: string | undefined;
  let phoneNumber: string | undefined;
  let createUser: CreateUser;
  let userRepoSpy: UserRepoSpy;

  test('Valid user details', ({ given, when, then }) => {
    given('I provide valid details', () => {
      userId = '1';
      fullName = 'Sanzhar Alim';
      phoneNumber = '+77005005555';

      userRepoSpy = new UserRepoSpy([]);
      createUser = new CreateUser(userRepoSpy);
    });

    when('I attempt to create a user', async () => {
      result = await createUser.execute({ userId, fullName, phoneNumber });
    });

    then('I should get a successful response', () => {
      expect(result.value.isSuccess).toBeTruthy();
      expect(userRepoSpy.getTimesSaveCalled()).toEqual(1);
    });
  });

  test('Invalid id', ({ given, when, then }) => {
    given('I provide an invalid id', () => {
      userId = undefined;
      fullName = 'Sanzhar Alim';
      phoneNumber = '+77005005555';

      userRepoSpy = new UserRepoSpy([]);
      createUser = new CreateUser(userRepoSpy);
    });

    when('I attempt to create a user', async () => {
      result = await createUser.execute({ userId, fullName, phoneNumber });
    });

    then('I should get an invalid details error', () => {
      expect(result.value.isFailure).toBeTruthy();
      expect(result.value.errorValue()).toEqual('user id is null or undefined');
      expect(userRepoSpy.getTimesSaveCalled()).toEqual(0);
    });
  });

  test('Invalid phone number', ({ given, when, then }) => {
    given('I provide an invalid phone number', () => {
      userId = '1';
      fullName = 'Sanzhar Alim';
      phoneNumber = '121231231';

      userRepoSpy = new UserRepoSpy([]);
      createUser = new CreateUser(userRepoSpy);
    });

    when('I attempt to create a user', async () => {
      result = await createUser.execute({ userId, fullName, phoneNumber });
    });

    then('I should get an invalid details error', () => {
      expect(result.value.isFailure).toBeTruthy();
      expect(result.value.errorValue()).toEqual('Phone number format is not valid!');
      expect(userRepoSpy.getTimesSaveCalled()).toEqual(0);
    });
  });
});
