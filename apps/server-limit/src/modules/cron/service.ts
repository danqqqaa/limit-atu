// import { fetchDataGet } from "../../services/fetch";
// import { TRPCError } from "@trpc/server";
import { db, desc, mvz, subdivision, limit } from "db-limit";

export class CronService {
  public async getMvz() {
    // const data = await fetchDataGet(
    //   "https://itm-dev.satellite-soft.ru/api/v2/external/data/cost_center",
    // );
    // if (!data) throw new TRPCError({ code: "NOT_FOUND", message: 'Не найдено' });
    // return data;
    return "godjobman"
  }
  public async getSubdivisions() {
    // const data = await fetchDataGet(
    //   "https://itm-dev.satellite-soft.ru/api/v2/external/data/transportation_participant",
    // );
    // if (!data) throw new TRPCError({ code: "NOT_FOUND", message: 'Не найдено' });
    // return data;
    return "godjobman"
  }
  public async updateMvz() {
    const maxVal = await db.select().from(mvz).orderBy(desc(mvz.id)).limit(1)
    const testdata = [{ id: 1, name: "testdata" }, { id: 2, name: "testdata" }]
    if (maxVal.length == 0) { // если с нуля база
      const insertData = testdata
      await db.insert(mvz).values(insertData).onConflictDoNothing();
    } else if (maxVal.length > 0) {
      const insertData = testdata.filter((el) => el.id > maxVal[0].id)
      if (insertData.length)
        await db.insert(mvz).values(insertData).onConflictDoNothing();
    }
  }
  public async updateSubdivisions() {
    const maxVal = await db.select().from(subdivision).orderBy(desc(subdivision.id)).limit(1)
    const testdata = [{ id: 1, name: "testdata" }, { id: 2, name: "testdata" }]
    if (maxVal.length == 0) {
      const insertData = testdata
      await db.insert(subdivision).values(insertData).onConflictDoNothing();
    } else if (maxVal.length > 0) {
      const insertData = testdata.filter((el) => el.id > maxVal[0].id)
      if (insertData.length)
        await db.insert(subdivision).values(insertData).onConflictDoNothing();
    }
  }
  public async updateLimits() {
    const maxVal = await db.select().from(limit).orderBy(desc(limit.id)).limit(1)
    const testdata = [{ id: 1, year: 2024, month: 0, used: 0, limit: 0, subdivisionId: 1, mvzId: 1 }, { id: 2, year: 2024, month: 0, used: 0, limit: 0, subdivisionId: 1, mvzId: 2 },
      { id: 3, year: 2024, month: 0, used: 0, limit: 0, subdivisionId: 2, mvzId: 1 }, { id: 4, year: 2024, month: 0, used: 0, limit: 0, subdivisionId: 2, mvzId: 2 }]
    if (maxVal.length == 0) {
      const insertData = testdata
      await db.insert(limit).values(insertData).onConflictDoNothing();
    } else if (maxVal.length > 0) {
      const insertData = testdata.filter((el) => el.id > maxVal[0].id)
      if (insertData.length)
        await db.insert(limit).values(insertData).onConflictDoNothing();
    }
  }
}

export const cronService = new CronService();
