import { UserId } from '../domain/UserId';
import { User } from '../domain/User';
import { UserMap } from '../mappers/UserMap';
export interface IUserRepo {
  getUserById(userId: UserId): Promise<User | null>;
  exists(userId: UserId): Promise<boolean>;
  save(user: User): Promise<void>;
}

export class SequelizeUserRepo implements IUserRepo {
  private models: any;
  private userMap: UserMap = new UserMap();

  constructor(models: any) {
    this.models = models;
  }

  private createBaseQuery(): any {
    return {
      where: {},
      include: [],
    };
  }

  public async getUserById(userId: UserId): Promise<User | null> {
    const ClientModel = this.models.User;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where['id'] = userId;

    const client = await ClientModel.findOne(detailsQuery);

    if (!!client === false) throw new Error('Client not found.');
    return this.userMap.toDomain(client);
  }

  public async exists(userId: UserId): Promise<boolean> {
    const UserModel = this.models.User;
    const detailsQuery = this.createBaseQuery();
    detailsQuery.where['id'] = userId.id.toString();

    const user = await UserModel.findOne(detailsQuery);
    return !!user === true;
  }

  public async save(user: User): Promise<void> {
    const UserModel = this.models.User;
    const exists = await this.exists(user.userId);
    const rawUser = this.userMap.toPersistence(user);

    if (!exists) {
      try {
        await UserModel.create(rawUser);
      } catch (err) {
        throw new Error((err as Error).toString());
      }
    } else {
      await UserModel.update(rawUser, {
        individualHooks: true,
        hooks: true,
        where: { id: user.userId.id.toString() },
      });
    }
  }
}
