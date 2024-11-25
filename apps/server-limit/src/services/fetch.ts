import axios, { Method } from "axios";
// import { itmConfig } from "../config/itm.config";
// import { https } from 'https'
import * as https from "https";
// axios.defaults.baseURL = itmConfig.base_url;
// axios.defaults.headers.common['Content-Type'] = 'application/json'

export async function useAxios(props: {
  url: string;
  data?: any;
  method: any | Method;
  token: string | undefined;
}) {
  try {
    const { token } = props;

    if (token) axios.defaults.headers.common["apiKey"] = token;

    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    console.log(props);
    

    const test = await axios(
      'https://itm-dev.satellite-soft/api/v2/external/security', 
      {
        data: props.data,
        method: props.method,
        // url: props.url,
        proxy: {
          protocol: "http",
          host: "proxy.hq.corp.mmk.chel.su",
          port: 8080,
          auth: {
            username: "shinkarenko184184",
            password: "Pasha007!!!!!",
          } as any,
        },
        httpsAgent: agent,
      } 
    );

    console.log(test);
  } catch (error: any) {
    console.log(error);
  }
}
