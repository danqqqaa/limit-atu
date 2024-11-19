import axios, { AxiosBasicCredentials, Method } from "axios";

export async function fetchDataAuth(props: {
  url: string;
  body: Object;
  method: Method;
}) {
  try {
    const { url, body, method } = props;
    const response = await axios({
      url,
      data: JSON.stringify(body),
      method,
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

export async function fetchData(props: {
  url: string;
  body: Object;
  method: Method;
  token: string | undefined;
}) {
  try {
    const { url, body, method, token } = props;

    const response = await axios({
      url,
      data: JSON.stringify(body),
      method,
      headers: {
        "Content-Type": "application/json",
        apiKey: token,
        "Content-Length": '0'
      },

      proxy: {
        protocol: "http",
        host: "proxy.hq.corp.mmk.chel.su",
        port: 8080,
        auth: "shinkarenko184184:Pasha007!" as unknown as AxiosBasicCredentials,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}

export async function fetchDataGet(url: string) { //временно для пуша
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "apiKey": "9d9c222f8e0a85d5d2c400f05074db22"
      },
      // proxy: {
      //   protocol: "http",
      //   host: "proxy.hq.corp.mmk.chel.su",
      //   port: 8080,
      //   auth: "shinkarenko184184:Pasha007!" as unknown as AxiosBasicCredentials,
      // },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDataPost(url: string, body: Object) { //временно для пуша
  try {
    const response = await axios.post(url, {
      body,
      headers: {
        "Content-Type": "application/json",
        "apiKey": "9d9c222f8e0a85d5d2c400f05074db22"
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
