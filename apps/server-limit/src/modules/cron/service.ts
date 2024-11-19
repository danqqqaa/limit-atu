import { fetchDataGet } from "../../services/fetch";
import { TRPCError } from "@trpc/server";
// import { TRPCError } from "@trpc/server";
import { db, desc, mvz, subdivision } from "db-limit";

export class CronService {
  public async getMvz() {
    const data = await fetchDataGet(
      "https://itm-dev.satellite-soft.ru/api/v2/external/data/cost_center",
    );
    if (!data) throw new TRPCError({ code: "NOT_FOUND", message: 'Не найдено' });
    return data;
  }
  public async getSubdivisions() {
    const data = await fetchDataGet(
      "https://itm-dev.satellite-soft.ru/api/v2/external/data/transportation_participant",
    );
    if (!data) throw new TRPCError({ code: "NOT_FOUND", message: 'Не найдено' });
    return data;
  }
  public async updateMvz() {
    const maxVal = await db.select().from(mvz).orderBy(desc(mvz.id)).limit(1)
    if (maxVal.length) {
      const testdata = [{ id: 1, name: "testdata" }, { id: 2, name: "testdata" }, { id: 3, name: "testdata" }, { id: 4, name: "testdata" }, { id: 5, name: "testdata" }]
      const insertData = testdata.filter((el) => el.id > maxVal[0].id)
      if (insertData.length)
        await db.insert(mvz).values(insertData).onConflictDoNothing();
    }
  }
  public async updateSubdivisions() {
    const maxVal = await db.select().from(subdivision).orderBy(desc(subdivision.id)).limit(1)
    if (maxVal.length) {
      const testdata = [{ id: 1, name: "testdata" }, { id: 2, name: "testdata" }, { id: 3, name: "testdata" }, { id: 4, name: "testdata" }, { id: 5, name: "testdata" },]
      const insertData = testdata.filter((el) => el.id > maxVal[0].id)
      if (insertData.length)
        await db.insert(subdivision).values(insertData).onConflictDoNothing();
    }

  }
}

export const cronService = new CronService();
