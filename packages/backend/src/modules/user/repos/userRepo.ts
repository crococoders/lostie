import { User } from '../domain/User';
import { UserId } from '../domain/UserId';

export interface UserRepo {
  getUserByChatId(chatId: string): Promise<User>;
  exists(userId: UserId): Promise<boolean>;
  chatIdExists(chatId: string): Promise<boolean>;
  save(user: User): Promise<void>;
}
