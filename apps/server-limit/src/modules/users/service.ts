import type { Context } from "@/trpc/context";
import { fetchData } from "../../services/fetch";
import { itmConfig } from "../../config/itm.config";
import { TRPCError } from "@trpc/server";

export class UserService {
  async getOrganizations(ctx: Context): Promise<unknown> {
    try {
      const data = await fetchData({
        url: itmConfig.getOrganization,
        body: {},
        method: "GET",
        token: ctx.token,
      });
      return data
    } catch (error: any) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: error.message,
      })
     
    }
  }
}
export const userService = new UserService();
