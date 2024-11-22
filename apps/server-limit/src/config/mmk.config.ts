import env from "env-var"

export const mmkConfig = {
    mmk_login: env.get('MMK_LOGIN').asString(),
    mmk_password: env.get('MMK_PASSWORD').asString(),
}