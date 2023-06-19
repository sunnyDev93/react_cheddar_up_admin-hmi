import * as httpService from './http.service';

const getDevCubeToken = () => {
  return httpService
    .post('/users/cube/token')
    .then(({data}) => data)
    .catch(err => Promise.reject(err));
};

const getUserInfo = (userId, headers = {}) => {
  return httpService
    .get(`/clients/users/${userId}`, {
      headers: {...headers},
    })
    .then(({data}) => data.user)
    .catch(err => Promise.reject(err));
};

const getUserTabInfo = (userId, headers = {}) => {
  return httpService
    .get('/users/tabs', {
      'User-Id': userId,
    })
    .then(({data}) => data)
    .catch(err => Promise.reject(err));
};

const getUserByEmail = (email, showCustomer = true, headers = {}) => {
  return httpService
    .get(`/clients/users/email?email=${email}&showCustomer=${showCustomer}`)
    .then(({data}) => data)
    .catch(err => Promise.reject(err));
};

export {getDevCubeToken, getUserInfo, getUserTabInfo, getUserByEmail};
