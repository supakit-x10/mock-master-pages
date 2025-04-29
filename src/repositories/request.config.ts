import { AxiosRequestConfig } from "axios";
import {
  CookiesAdapter,
  CookiesAdapterImpl,
  CookiesKey,
} from "../adapters/cookies.adapter";
import {
  CryptoJsAdapter,
  CryptoJsAdapterImpl,
} from "../adapters/crypto-js.adapter";

const cookiesAdapter: CookiesAdapter = new CookiesAdapterImpl();
const cryptoJsAdapter: CryptoJsAdapter = new CryptoJsAdapterImpl();

export const requestConfig = (): AxiosRequestConfig => {
  const token = cookiesAdapter.get(CookiesKey.AccessToken);
  const decryptClientId = cryptoJsAdapter.decrypt(
    cookiesAdapter.get(CookiesKey.ClientId),
    `${cookiesAdapter.get(CookiesKey.AppId)}::${cookiesAdapter.get(CookiesKey.AppNameId)}`
  );
  const decryptClientSecret = cryptoJsAdapter.decrypt(
    cookiesAdapter.get(CookiesKey.ClientSecret),
    `${cookiesAdapter.get(CookiesKey.AppId)}::${cookiesAdapter.get(CookiesKey.AppNameId)}`
  );

  return {
    headers: {
      "X-Api-Key": decryptClientSecret
        ? decryptClientSecret
        : cookiesAdapter.get(CookiesKey.ClientSecret),
      "X-Client-ID": decryptClientId
        ? decryptClientId
        : cookiesAdapter.get(CookiesKey.ClientId),
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };
};
