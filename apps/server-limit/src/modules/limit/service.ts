import { and, db, eq, limit } from "db-limit";
// eq,
export class LimitService {
  // получение лимитов за месяц и год (фильтр)
  public async getLimits(opts: any): Promise<unknown> {
    try {
      const { year, month } = opts.rawInput;
      const limits = await db.select().from(limit)
      .where(
        and(
          eq(limit.month, month),
          eq(limit.year, year)
        ));
      return limits;
    } catch (error: any) {
      // console.log(error.message);
    }
  }

  public async getLimitsCurrentMonth(): Promise<unknown> { // внеший апи для отдачи лимитов текущего месяца
    try {
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();
      const limits = await db.select().from(limit).where(
        and(
          eq(limit.month, month),
          eq(limit.year, year)
        ));
      return limits;
    } catch (error) {
      // console.log(error.message);
    }
  }

  public async updateLimit(data: any) {
    console.log(data)
    await db.update(limit)
      .set({ limitMileage: data.rawInput.limitMileage, limitTime: data.rawInput.limitTime })
      .where(eq(limit.id, data.rawInput.id));
  }
}

export const limitService = new LimitService();