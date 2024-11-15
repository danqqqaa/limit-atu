import { loginSchemaType } from "z-limit";
import { fetchData } from "../../services/fetch";
import { TRPCError } from "@trpc/server";
// import { TRPCError } from "@trpc/server";

export class AuthService {
  public async login(dto: loginSchemaType) {
    const data = await fetchData(
      "https://itm-dev.satellite-soft.ru/api/v2/external/security",
      JSON.stringify(dto)
    );
    if (!data) throw new TRPCError({ code: "UNAUTHORIZED" , message: 'Неправильный логин или пароль'});

    return data;  
  }
}

export const authService = new AuthService();
