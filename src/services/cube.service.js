import cubejs from '@cubejs-client/core';

import config from '../config';
import storage from './storage.service';
import {clientHttp, cubeHttp} from './http.service';

export const cubeQuery = (data, headers = {}, params = {}) => {
  const accessToken = storage.getItem(config.cubeTokenKey);
  const authHeader = {Authorization: `${accessToken}`};
  return cubeHttp.post(
    'load',
    {query: data},
    {
      ...params,
      headers: {...authHeader, ...headers},
    }
  );
};

export const getCubeToken = () => {
  return clientHttp
    .post('/users/cube/token')
    .then(({data}) => data)
    .catch(err => Promise.reject(err));
};
