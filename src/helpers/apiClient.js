import axios from 'axios';

// import config from 'config';

const instance = axios.create({
  baseURL: `http://localhost:3001/`,
  // withCredentials: true,
  // headers: {
  //   'Client-Id': config.clientId,
  // },
});

export default instance;
