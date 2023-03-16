import axios, { InternalAxiosRequestConfig } from 'axios';

export const $api = axios.create({
  baseURL: 'https://test.v5.pryaniky.com/'
});

export const createSetTokenInterceptor =
  (name: string, value: string) => (config: InternalAxiosRequestConfig) => {
    config.headers.set(name, value);
    return config;
  };
