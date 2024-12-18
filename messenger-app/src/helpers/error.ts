import { AxiosError } from "axios";

type ErrorResponse = {
  message?: string;
};

export const getErrorMessage = (error: AxiosError) => {
  if (error.response && error.response.data) {
    return (error.response.data as ErrorResponse).message;
  } else if (error.message) return error.message;
  else return "The service is currently unavailable. Please try again later";
};
