import * as httpService from './http.service';

const getSinglePayment = (collectionId, userId, paymentId, headers = {}) => {
  return httpService
    .get(`/users/tabs/${collectionId}/payments/${paymentId}`, {
      'User-Id': userId,
    })
    .then(({data}) => data)
    .catch(err => Promise.reject(err));
};

export {getSinglePayment};
