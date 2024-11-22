import { loginSchemaType } from "z-limit";
import { fetchDataAuth } from "../../services/fetch";
import { TRPCError } from "@trpc/server";
import { itmConfig } from "../../config/itm.config";
import { Method } from "axios";

export class AuthService {
  public async login(dto: loginSchemaType) {

    const props = {
      url: itmConfig.auth,
      data: dto,
      method: "POST" as Method,
      token: undefined,
    };

    const data = await fetchDataAuth(props);
    
    if (!data)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Неправильный логин или пароль",
      });

    return data;
  }
}

export const authService = new AuthService();
