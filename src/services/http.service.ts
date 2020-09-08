import axios, { AxiosInstance } from 'axios';

export class HttpClient {
  private readonly appid: string;
  private readonly instance: AxiosInstance;

  public constructor(appid: string, baseURL?: string) {
    this.appid = appid;
    this.instance = axios.create({
      baseURL,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public get(params: object) {
    return this.instance.get("", {
      params: {
        ...params,
        appid: this.appid //workaround because of broken default params in axios
      }
    });
  }
};
