const appConfig = {
  env: process.env.NODE_ENV || 'development',
  baseURL: process.env.REACT_APP_API || 'https://uiaws-dev.cheddarup.com/api',
  cubeURL:
    process.env.REACT_APP_API_CUBE ||
    'https://huge-shrimp.aws-us-east-1.cubecloudapp.dev',
  clientAPIURL:
    process.env.REACT_APP_CLIENT_API_URL ||
    'https://uiaws-dev.cheddarup.com/api',
  tokenKey: process.env.REACT_APP_USER_TOKEN_KEY || 'api_token',
  cubeTokenKey: process.env.REACT_APP_CUBE_TOKEN_KEY || 'cube_token',
  devToken: process.env.REACT_APP_DEV_AUTH_TOKEN,
};

export default appConfig;
