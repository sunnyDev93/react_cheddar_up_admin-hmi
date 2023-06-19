import React, {useEffect, useState} from 'react';
import {CubeProvider} from '@cubejs-client/react';
import cubejs from '@cubejs-client/core';

import AppRouter from './AppRouter';
import {checkCubeToken} from 'services/auth.service';
import Loader from './Loader/Loader';
import storage from '../services/storage.service';
import config from '../config';

import GlobalStyles from './GlobalStyles';
import './theme.css';

function App({location, ...props}) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    checkCubeToken()
      .then(() => {
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(true);
      });
  }, []);

  const cubeApi = cubejs(storage.getItem(config.cubeTokenKey), {
    apiUrl: `${config.cubeURL}/cubejs-api/v1`,
  });

  if (!loaded || !cubeApi?.apiToken) {
    return <Loader />;
  }

  return (
    <CubeProvider cubejsApi={cubeApi}>
      <div className="App">
        <AppRouter location={location} {...props} />
        <GlobalStyles />
      </div>
    </CubeProvider>
  );
}

export default App;
