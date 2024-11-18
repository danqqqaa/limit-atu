import { fetchDataGet } from "../../services/fetch";
import { TRPCError } from "@trpc/server";
// import { TRPCError } from "@trpc/server";

export class CronService {
  public async getMvz() {
    const data = await fetchDataGet(
      "https://itm-dev.satellite-soft.ru/api/v2/external/data/cost_center",
    );
    if (!data) throw new TRPCError({ code: "NOT_FOUND" , message: 'Не найдено'});
    return data;  
  }
  public async getSubdivisions() {
    const data = await fetchDataGet(
      "https://itm-dev.satellite-soft.ru/api/v2/external/data/transportation_participant",
    );
    if (!data) throw new TRPCError({ code: "NOT_FOUND" , message: 'Не найдено'});
    return data;  
  }
}

export const cronService = new CronService();
