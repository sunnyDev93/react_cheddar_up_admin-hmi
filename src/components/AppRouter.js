import {Route, Switch} from 'react-router-dom';
import React from 'react';

const LazyDashboardRouter = React.lazy(() => import('views/dashboard'));
const NotFoundPage = React.lazy(() => import('views/NotFoundPage'));

const AppRouter = ({location}) => (
  <React.Suspense
    fallback={
      <div
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Pending
      </div>
    }
  >
    <Switch location={location}>
      <Route path="/dashboard" component={LazyDashboardRouter} />
      <Route component={NotFoundPage} />
    </Switch>
  </React.Suspense>
);

export default AppRouter;
