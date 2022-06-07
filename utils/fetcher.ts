import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
};

const axiosInstance = axios.create(config);

export const get = <T>(url: string, options?: AxiosRequestConfig) =>
  axiosInstance
    .get<T>(url, options)
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });

export const post = <T>(
  url: string,
  body?: Record<string, unknown> | unknown[] | FormData,
  options?: AxiosRequestConfig,
) =>
  axiosInstance
    .post<T>(url, body, options)
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    });
