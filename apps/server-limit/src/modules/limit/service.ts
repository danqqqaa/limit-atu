import { db, limit } from "db-limit";

export class LimitService {
  async getLimits(): Promise<unknown> {
    try {

      const limits = await db.select().from(limit);



      return limits;
    } catch (error) {
      // console.log(error.message);
    }
  }}

export const limitService = new LimitService();
