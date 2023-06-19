export const responseInterceptor = response => {
  if (response.status === 401 || response.status === 403) {
    window.location =
      'https://uiaws-dev.cheddarup.com/login?redirect=https://uiaws-dev.cheddarup.com/reporting/dashboard';
  }

  return response;
};

export const errorInterceptor = error => {
  if (error.response && error.response.status) {
    if (error.response.status === 401 || error.response.status === 403) {
      window.location =
        'https://uiaws-dev.cheddarup.com/login?redirect=https://uiaws-dev.cheddarup.com/reporting/dashboard';
    }
  }

  return Promise.reject(error.message);
};
