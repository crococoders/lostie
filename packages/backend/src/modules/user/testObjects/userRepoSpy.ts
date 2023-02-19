import { User } from '../domain/User';
import { UserId } from '../domain/UserId';
import { IUserRepo } from '../repos/userRepo';

export class UserRepoSpy implements IUserRepo {
  private users: User[];
  private timesSaveCalled: number;

  constructor(users: User[]) {
    this.users = users;
    this.timesSaveCalled = 0;
  }

  async getUserById(userId: UserId): Promise<User | null> {
    const found = this.users.find((u) => u.userId == userId);

    if (!found) {
      return null;
    }

    return found;
  }

  async exists(userId: UserId): Promise<boolean> {
    const found = this.users.find((u) => u.userId == userId);

    if (!found) {
      return false;
    }

    return true;
  }

  // eslint-disable-next-line
  async save(user: User): Promise<void> {
    console.log(user);
    this.timesSaveCalled++;
  }

  getTimesSaveCalled(): number {
    return this.timesSaveCalled;
  }
}
