import * as httpService from './http.service';
import storageService from './storage.service';
import config from '../config';
import {getDevCubeToken} from './user.service';
import {getCubeToken} from './cube.service';

export const session = () => {
  return httpService
    .get('/session')
    .then(({data}) => data)
    .catch(err => Promise.reject(err));
};

export const login = payload => {
  return httpService
    .post('/login', payload)
    .then(data => data)
    .catch(err => Promise.reject(err));
};

export const checkCubeToken = async () => {
  if (config.env === 'development') {
    storageService.setItem(config.tokenKey, config.devToken);

    return await getDevCubeToken().then(data => {
      storageService.setItem(config.cubeTokenKey, data.token);
    });
  } else {
    return await getCubeToken().then(data => {
      storageService.setItem(config.cubeTokenKey, data.token);
    });
  }
};
