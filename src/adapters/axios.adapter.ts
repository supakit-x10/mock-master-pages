import axios, { AxiosError } from "axios";
import "../extensions/string.extension";
import setUpAxiosMock from "../mock/axios.mock";
import { CookiesAdapterImpl, CookiesKey } from "./cookies.adapter";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_PREFIX}/${process.env.NEXT_PUBLIC_API_VERSION}`;

const axiosAdapter = axios.create({
  baseURL,
  timeout: 60 * 1000,
});

axiosAdapter.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const cookiesAdapter = new CookiesAdapterImpl();
      cookiesAdapter.delete(CookiesKey.AccessToken);
      cookiesAdapter.delete(CookiesKey.RefreshToken);
    }
    return Promise.reject(error);
  }
);

const isMock = process.env.NEXT_PUBLIC_IS_AXIOS_ADAPTER ?? "";
console.log("🚀 ~ isMock:", isMock)

if (isMock.toBoolean()) {
  setUpAxiosMock(axiosAdapter);
}

export default axiosAdapter;
