import { db,  eq,  limit } from "db-limit";

export class LimitService {
  public async getLimits(): Promise<unknown> {
    try {
      const limits = await db.select().from(limit);
      return limits;
    } catch (error) {
      // console.log(error.message);
    }
  }

  public async updateLimit(data: any) {
    console.log(123, data.rawInput)
    await db.update(limit)
      .set({ limit: data.rawInput.limit })
      .where(eq(limit.id, data.rawInput.id));
  }
}

export const limitService = new LimitService();
