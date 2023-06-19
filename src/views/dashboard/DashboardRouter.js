import {Route, Switch} from 'react-router-dom';
import React from 'react';
import {Col, Layout, Row} from 'antd';
import {useQuery} from 'react-query';
import {useCubeQuery} from '@cubejs-client/react';

import NotFoundPage from 'views/NotFoundPage';

import DistributorsPage from './DistributorsPage';
import DistributorPage from './DistributorPage';
import SalesPagesPage from './SalesPagesPage';
import SalesPagePage from './SalesPagePage';
import ProductsPage from './ProductsPage';
import CustomersPage from './CustomersPage';
import CustomerDetailsPage from './CustomerDetailsPage';

import {TopNavLogo, TopNavCenter, TopNavRight} from 'components/nav';
import SideBar from 'components/SideBar';
import {session} from '../../services/auth.service';
import AuthQueryTypes from '../../services/query-types/auth.types';
import {CUBE_DISTRIBUTORS} from '../../services/cube-query/distributors';

const {Header, Content} = Layout;

const DashboardRouter = ({location}) => {
  const {data: userData} = useQuery(AuthQueryTypes.REST_AUTH_SESSION, session, {
    refetchOnWindowFocus: false,
  });

  const loggedInUser = userData?.user;

  const {resultSet: distributors} = useCubeQuery({
    ...CUBE_DISTRIBUTORS,
    filters: [
      {
        member: 'EnhancedUsers.uuid',
        operator: 'equals',
        values: [`${loggedInUser?.uuid}`],
      },
    ],
    timeDimensions: [],
  });
  const dataSource = distributors?.tablePivot() || [];
  const user = dataSource && dataSource.length > 0 ? dataSource[0] : null;

  const isAdmin = !!userData?.auth?.isAdmin;

  return (
    <Layout>
      <Header style={{borderBottom: '1px solid #0000000F'}}>
        <Row>
          <Col span={9}>
            <TopNavLogo />
          </Col>
          <Col span={6}>
            <TopNavCenter />
          </Col>
          <Col span={9}>
            <TopNavRight user={user} isAdmin={isAdmin} />
          </Col>
        </Row>
      </Header>
      <Layout>
        <SideBar />
        <Content>
          <div style={{padding: '30px'}}>
            <Switch>
              <Route
                exact
                path="/dashboard/distributors"
                component={DistributorsPage}
              />
              <Route
                exact
                path="/dashboard/distributors/:distributor"
                component={DistributorPage}
              />
              <Route
                exact
                path="/dashboard/sales-pages"
                component={SalesPagesPage}
              />
              <Route
                exact
                path="/dashboard/sales-pages/:id"
                component={SalesPagePage}
              />
              <Route
                exact
                path="/dashboard/products"
                component={ProductsPage}
              />
              <Route
                exact
                path="/dashboard/customers"
                component={CustomersPage}
              />
              <Route
                exact
                path="/dashboard/customers/:id"
                component={CustomerDetailsPage}
              />
              <Route path="/dashboard" component={DistributorsPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

const EnhancedDashboardRouter = React.memo(DashboardRouter);

export default EnhancedDashboardRouter;
