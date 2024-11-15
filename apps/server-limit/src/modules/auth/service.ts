import { loginSchemaType } from "z-limit";
import { fetchDataAuth } from "../../services/fetch";
import { TRPCError } from "@trpc/server";
import { itmConfig } from "../../config/itm.config";

export class AuthService {
  public async login(dto: loginSchemaType) {
    const data = await fetchDataAuth({url: itmConfig.auth, body:dto, method: "POST"});
    if (!data)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Неправильный логин или пароль",
      });

    return data;
  }
}

export const authService = new AuthService();
