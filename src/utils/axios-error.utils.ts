import { AxiosError } from "axios";
import { ApiResponse } from "../types/response/api-response.type";

const isAxiosError = (error: unknown): error is AxiosError => {
  return typeof error === "object" && error !== null && (error as AxiosError).isAxiosError === true;
}

export const axiosError = (error: unknown): ApiResponse => {
  let data = null;
  let message = "An error occurred";
  let description = "Error description not available";

  if (isAxiosError(error)) {
    const data: any = error.response?.data
    message = data?.message || message;
    description = data?.description?.toString() || error.message;
  }

  return { data, message, description, error: true };
};
