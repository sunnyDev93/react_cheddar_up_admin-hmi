import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';

import appHistory from 'appHistory';

import 'index.css';
import App from 'components/App';
import * as serviceWorker from 'serviceWorker';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router history={appHistory} basename={'reporting'}>
      <App />
    </Router>
  </QueryClientProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
