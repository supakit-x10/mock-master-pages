import { AxiosResponse } from "axios";
import { ApiResponse } from "../types/response/api-response.type";

export const axiosResponse = <T = any>(
  res: AxiosResponse<T>
): ApiResponse<T> => {
  return {
    data: res.data,
    message: res.statusText,
    description: "",
    error: false,
  };
};
