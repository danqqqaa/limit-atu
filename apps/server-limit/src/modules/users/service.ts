import { db, user } from "db-limit";

export class UserService {
  async getUsers(): Promise<unknown> {
    try {
      const users = await db.select().from(user);

      return users;
    } catch (error) {
      // console.log(error.message);
    }
  }
  async getCurrentUser() {
    try {
      // const [currentUser] = await db.select().from(user).where(eq(user.id, ctx));
      // return currentUser;
      return {}
    } catch (error) {
      // console.log(error.message);
    }
  }
}

export const userService = new UserService();
