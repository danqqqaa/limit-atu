import { db, desc, mvz, subdivision, limit } from "db-limit";
import { useAxios } from "../../services/fetch";
import type { Context } from "@/trpc/context";
import { itmConfig } from "../../config/itm.config";

export class CronService {
  public async getMvz(ctx: Context) {
    console.log(ctx);
    const props = {
      url: itmConfig.getMvz,
      method: "GET",
      token: ctx.token,
    };

    return await useAxios(props);
    
  }
  public async getSubdivisions(ctx: Context) {
    console.log(ctx);

    //  const data = useAxios('3')
    //  console.log(data);

    return "godjobman";
  }
  public async updateMvz() {
    const maxVal = await db.select().from(mvz).orderBy(desc(mvz.id)).limit(1);
    const testdata = [
      { id: 1, name: "testdata" },
      { id: 2, name: "testdata" },
    ];
    if (maxVal.length == 0) {
      // если с нуля база
      const insertData = testdata;
      await db.insert(mvz).values(insertData).onConflictDoNothing();
    } else if (maxVal.length > 0) {
      const insertData = testdata.filter((el) => el.id > maxVal[0].id);
      if (insertData.length)
        await db.insert(mvz).values(insertData).onConflictDoNothing();
    }
  }
  public async updateSubdivisions() {
    const maxVal = await db
      .select()
      .from(subdivision)
      .orderBy(desc(subdivision.id))
      .limit(1);
    const testdata = [
      { id: 1, name: "testdata" },
      { id: 2, name: "testdata" },
    ];
    if (maxVal.length == 0) {
      const insertData = testdata;
      await db.insert(subdivision).values(insertData).onConflictDoNothing();
    } else if (maxVal.length > 0) {
      const insertData = testdata.filter((el) => el.id > maxVal[0].id);
      if (insertData.length)
        await db.insert(subdivision).values(insertData).onConflictDoNothing();
    }
  }
  public async updateLimits() {
    const maxVal = await db
      .select()
      .from(limit)
      .orderBy(desc(limit.id))
      .limit(1);
    const testdata = [
      {
        id: 1,
        year: 2024,
        month: 0,
        used: 0,
        limit: 0,
        subdivisionId: 1,
        mvzId: 1,
      },
      {
        id: 2,
        year: 2024,
        month: 0,
        used: 0,
        limit: 0,
        subdivisionId: 1,
        mvzId: 2,
      },
      {
        id: 3,
        year: 2024,
        month: 0,
        used: 0,
        limit: 0,
        subdivisionId: 2,
        mvzId: 1,
      },
      {
        id: 4,
        year: 2024,
        month: 0,
        used: 0,
        limit: 0,
        subdivisionId: 2,
        mvzId: 2,
      },
    ];
    if (maxVal.length == 0) {
      const insertData = testdata;
      await db.insert(limit).values(insertData).onConflictDoNothing();
    } else if (maxVal.length > 0) {
      const insertData = testdata.filter((el) => el.id > maxVal[0].id);
      if (insertData.length)
        await db.insert(limit).values(insertData).onConflictDoNothing();
    }
  }

  public async cronGetMvz() {
    // const data = await fetchDataAuth()
  }
}

export const cronService = new CronService();
