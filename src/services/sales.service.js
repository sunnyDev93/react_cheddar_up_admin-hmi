import * as httpService from './http.service';

const getCollectionDetail = (collectionId, userId, headers = {}) => {
  return httpService
    .get(`/users/tabs/${collectionId}`, {
      'User-Id': userId,
    })
    .then(({data}) => data)
    .catch(err => Promise.reject(err));
};

const getPayments = (
  collectionId,
  userId = '',
  page = 1,
  search = '',
  sort = 'created_at',
  direction = 'asc',
  status = '',
  headers = {}
) => {
  return httpService
    .get(
      `/users/tabs/${collectionId}/payments?page=${page}/search=${search}/sort=${sort}/direction=${direction}/status=${status}`,
      {'User-Id': userId}
    )
    .then(({data}) => data)
    .catch(err => Promise.reject(err));
};

const getVisitors = (collectionId = '', userUid = '', headers = {}) => {
  return httpService
    .get(`/users/tabs/${collectionId}/members`, {'User-Id': userUid})
    .then(({data}) => data)
    .catch(err => Promise.reject(err));
};

const getWithdrawalsCollection = (
  collectionId = '',
  userUid = '',
  headers = {}
) => {
  return httpService
    .get(`/users/tabs/${collectionId}/withdrawals`, {'User-Id': userUid})
    .then(({data}) => data)
    .catch(err => Promise.reject(err));
};

export {
  getCollectionDetail,
  getPayments,
  getVisitors,
  getWithdrawalsCollection,
};
