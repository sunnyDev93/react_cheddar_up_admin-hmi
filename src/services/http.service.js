import axios from 'axios';

import config from '../config';
import storage from './storage.service';
import {errorInterceptor, responseInterceptor} from './interceptors';

export const http = axios.create({baseURL: `${config.baseURL}/`});
export const clientHttp = axios.create({baseURL: `${config.clientAPIURL}`});
export const cubeHttp = axios.create({
  baseURL: `${config.cubeURL}/cubejs-api/v1`,
});

http.interceptors.response.use(responseInterceptor, errorInterceptor);
clientHttp.interceptors.response.use(responseInterceptor, errorInterceptor);

export const get = (url, headers = {}, params = {}) => {
  const accessToken = storage.getItem(config.tokenKey);
  const authHeader = {Authorization: `Bearer ${accessToken}`};
  return http.get(url, {
    ...params,
    headers: {...authHeader, ...headers},
  });
};

export const post = (url, data, headers = {}, params = {}) => {
  const accessToken = storage.getItem(config.tokenKey);
  const authHeader = {Authorization: `Bearer ${accessToken}`};
  return http.post(url, data, {
    ...params,
    headers: {...authHeader, ...headers},
  });
};

export const put = (url, data, headers = {}) => {
  const accessToken = storage.getItem(config.tokenKey);
  const authHeader = {Authorization: `Bearer ${accessToken}`};
  return http.put(url, data, {headers: {...authHeader, ...headers}});
};

export const remove = (url, data, headers = {}) => {
  const accessToken = storage.getItem(config.tokenKey);
  const authHeader = {Authorization: `Bearer ${accessToken}`};
  return http.delete(url, {
    headers: {...authHeader, ...headers},
    data,
  });
};
