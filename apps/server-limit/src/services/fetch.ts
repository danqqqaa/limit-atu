import axios, { AxiosBasicCredentials } from "axios";

export async function fetchData(url: string, body: BodyInit) {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
      proxy: {
        protocol: "http",
        host: "proxy.hq.corp.mmk.chel.su",
        port: 8080,
        auth: "shinkarenko184184:Pasha007!" as unknown as AxiosBasicCredentials,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
