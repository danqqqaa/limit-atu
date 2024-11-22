import axios, { AxiosBasicCredentials, Method } from "axios";
import { itmConfig } from "../config/itm.config";
import { mmkConfig } from "../config/mmk.config";

async function useAxios(props: {
  url: string;
  data: unknown;
  method: Method;
  token: string | undefined;
}) {
  const { token, url, data, method } = props;
  console.log(props);
  
  axios.defaults.baseURL = itmConfig.base_url;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Content-Length"] = 0;

  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  axios.defaults.proxy = {
    protocol: "http",
    host: "proxy.hq.corp.mmk.chel.su",
    port: 8080,
    auth: `${mmkConfig.mmk_login}:${mmkConfig.mmk_password}` as unknown as AxiosBasicCredentials,
  };

  
  return await axios({ url, data, method });
}

export async function fetchDataAuth(props: {
  url: string;
  data: Object;
  method: Method;
  token: string | undefined;
}) {
  try {
    return await useAxios(props);
  } catch (error: any) {
    console.log(error);
  }
}

export async function fetchData(props: {
  url: string;
  data: Object;
  method: Method;
  token: string | undefined;
}) {
  try {
    return await useAxios(props);
  } catch (error: any) {
    console.log(error);
  }
}
