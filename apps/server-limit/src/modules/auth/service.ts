import { loginSchemaType } from "z-limit";
import { itmConfig } from "../../config/itm.config";
import { Method } from "axios";
import { useAxios } from "../../services/fetch";

export class AuthService {
  public async login(dto: loginSchemaType) {
    try {
      const props = {
        url: itmConfig.auth,
        data: dto,
        method: "POST" as Method,
        token: undefined,
      };
      return await useAxios(props);
    } catch (error) {
      console.log(error);
    }
  }
}

export const authService = new AuthService();
