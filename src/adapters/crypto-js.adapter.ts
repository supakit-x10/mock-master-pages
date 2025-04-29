import * as CryptoJS from "crypto-js";

export interface CryptoJsAdapter {
  encrypt(message: string, key: string): string;
  decrypt(ciphertext: string, key: string): string;
}

export class CryptoJsAdapterImpl implements CryptoJsAdapter {
  encrypt(message: string, key: string): string {
    try {
      const encryptData = CryptoJS.AES.encrypt(message, key).toString();
      const encodeUri = encodeURIComponent(encryptData);
      return encodeUri;
    } catch (error) {
      return "";
    }
  }

  decrypt(ciphertext: string, key: string): string {
    try {
      const decodeUri = decodeURIComponent(ciphertext);
      const decryptData = CryptoJS.AES.decrypt(decodeUri, key).toString(
        CryptoJS.enc.Utf8
      );
      return decryptData;
    } catch (error) {
      return "";
    }
  }
}
