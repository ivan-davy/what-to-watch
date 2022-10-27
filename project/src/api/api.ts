import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getToken} from './token';
import {setErrorAction} from '../store/action';
import {clearErrorAction} from '../store/api-actions';
import {store} from '../store/store';
import {StatusCode} from '../const';

const BASE_URL = 'https://11.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCode.BadRequest]: true,
  [StatusCode.Unauthorized]: true,
  [StatusCode.NotFound]: true
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

export const processErrorHandle = (message: string): void => {
  store.dispatch(setErrorAction(message));
  store.dispatch(clearErrorAction());
};

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if (error.response && shouldDisplayError(error.response)) {
        processErrorHandle(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
};


