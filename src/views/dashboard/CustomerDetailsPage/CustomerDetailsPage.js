import React, {useEffect, useState} from 'react';
import {Avatar, Drawer, PageHeader, Table} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import {currency} from 'helpers/numbers';
import {Redirect, useParams} from 'react-router-dom';
import {DollarIcon, ContactIcon, ViewIcon} from 'components/icons';
import {useCubeQuery} from '@cubejs-client/react';
import {useQuery} from 'react-query';
import * as moment from 'moment';

import PaymentHeader from 'components/RightSideDrawer/PaymentHeader';
import CustomerContainer from 'components/RightSideDrawer/CustomerContainer';
import CustomerPaymentDetails from 'components/RightSideDrawer/CustomerPaymentDetails';
import ItemPurchased from 'components/RightSideDrawer/ItemPurchased';
import {getUserByEmail} from '../../../services/user.service';
import DistributorsQueryTypes from '../../../services/query-types/distributors';
import {getSinglePayment} from '../../../services/payment.service';
import {CUBE_DISTRIBUTORS} from '../../../services/cube-query/distributors';
import ImagesUtils from '../../../services/image.service';
import PaymentQueryTypes from '../../../services/query-types/payment';
import {AccountIcon} from '../../../components/icons';

const CustomerDetailsPage = () => {
  const {id} = useParams();

  const {
    data: customerData,
    isFetching,
  } = useQuery(
    DistributorsQueryTypes.REST_DISTRIBUTORS_CUSTOMER,
    () => getUserByEmail(id),
    {enabled: !!id, refetchOnWindowFocus: false}
  );

  const {resultSet: distributors} = useCubeQuery({
    ...CUBE_DISTRIBUTORS,
    filters: [
      {
        member: 'EnhancedUsers.email',
        operator: 'equals',
        values: [`${id}`],
      },
    ],
    timeDimensions: [],
  });
  const dataSource = distributors?.tablePivot() || [];
  const distributor =
    dataSource && dataSource.length > 0 ? dataSource[0] : null;

  const imageUrl = distributor
    ? ImagesUtils.getImageUrl(distributor['EnhancedUsers.profilePicturePath'])
    : null;

  const paymentData = customerData?.customer?.payments;
  const visitData = customerData?.customer?.visits;
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [customerPaymentRowData, setCustomerPaymentRowData] = useState();
  const [customerVisitRowData, setCustomerVisitRowData] = useState();

  const {resultSet: paymentDistributors} = useCubeQuery({
    ...CUBE_DISTRIBUTORS,
    filters: [
      {
        member: 'EnhancedUsers.id',
        operator: 'equals',
        values: [`${customerPaymentRowData?.organizer?.id}`],
      },
    ],
    timeDimensions: [],
  });
  const paymentDataSource = paymentDistributors?.tablePivot() || [];
  const paymentDistributor =
    paymentDataSource && paymentDataSource.length > 0
      ? paymentDataSource[0]
      : null;

  const {resultSet: visitDistributors} = useCubeQuery({
    ...CUBE_DISTRIBUTORS,
    filters: [
      {
        member: 'EnhancedUsers.id',
        operator: 'equals',
        values: [`${customerVisitRowData?.organizer?.id}`],
      },
    ],
    timeDimensions: [],
  });
  const visitDataSource = visitDistributors?.tablePivot() || [];
  const visitDistributor =
    visitDataSource && visitDataSource.length > 0 ? visitDataSource[0] : null;

  const {
    data: customerPaymentData,
    refetch: singlePaymentDataRefetch,
  } = useQuery(
    PaymentQueryTypes.REST_SINGLE_PAYMENT,
    () =>
      getSinglePayment(
        customerPaymentRowData?.collection?.id,
        paymentDistributor['EnhancedUsers.uuid'],
        customerPaymentRowData?.uuid
      ),
    {enabled: false, refetchOnWindowFocus: false}
  );

  useEffect(() => {
    if (paymentDistributor) {
      singlePaymentDataRefetch();
    }
  }, [paymentDistributors]);

  const updateCustomerContainerData = (row, isPayment = true) => {
    if (isPayment) {
      setCustomerPaymentRowData(row);
      setDrawerVisible(true);
    } else {
      setCustomerVisitRowData(row);
    }
  };
  const [paymentColumns] = useState([
    {
      title: 'COLLECTION PAGE',
      dataIndex: 'collection',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.collection.name.localeCompare(b.collection.name),
      render: collection => collection.name,
    },
    {
      title: 'COLLECTOR',
      dataIndex: 'organizer',
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      render: organizer => organizer?.display_name,
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      align: 'right',
      render: date => moment(date).format('MMM DD, YYYY'),
    },
    {
      title: 'ITEMS',
      dataIndex: 'items',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => parseInt(a['items']) - parseInt(b['items']),
      align: 'right',
      render: items => (
        <div
          style={{
            width: '32px',
            height: '22px',
            backgroundColor: '#FBFBFD',
            border: '1px solid #E2E5ED',
            color: '#3E3F42',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            marginLeft: 'auto',
          }}
          className="text-capitalize br text-small"
        >
          {items}
        </div>
      ),
    },
    {
      title: 'AMOUNT',
      dataIndex: 'total',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => parseInt(a['total']) - parseInt(b['total']),
      align: 'right',
      render: total => <>{currency(total)}</>,
    },
    {
      title: '',
      dataIndex: 'id',
      render: (id, row) => (
        <div
          style={{
            fontSize: '2rem',
            color: '#9EA0A5',
            cursor: 'pointer',
          }}
          onClick={() => updateCustomerContainerData(row)}
        >
          <EllipsisOutlined style={{color: '#9EA0A5'}} />
        </div>
      ),
    },
  ]);
  const [visitColumns] = useState([
    {
      title: 'COLLECTION PAGE',
      dataIndex: 'collection',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.collection.name.localeCompare(b.collection.name),
      render: collection => collection.name,
    },
    {
      title: 'COLLECTOR',
      dataIndex: 'organizer',
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      render: organizer => organizer.display_name,
    },
    {
      title: 'FIRST VISIT',
      dataIndex: 'first_visit',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) =>
        moment(a.first_visit).unix() - moment(b.first_visit).unix(),
      align: 'right',
      render: first_visit => moment(first_visit).format('MMM DD, YYYY'),
    },
    {
      title: 'TOTAL VISIT',
      dataIndex: 'total_visits',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) =>
        parseInt(a['total_visits']) - parseInt(b['total_visits']),
      align: 'right',
      render: total_visits => (
        <div
          style={{
            width: '32px',
            height: '22px',
            backgroundColor: '#FBFBFD',
            border: '1px solid #E2E5ED',
            color: '#3E3F42',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            marginLeft: 'auto',
          }}
          className="text-capitalize br text-small"
        >
          {total_visits}
        </div>
      ),
    },
    {
      title: 'TOTAL SPENT',
      dataIndex: 'total_spent',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => parseInt(a['total_spent']) - parseInt(b['total_spent']),
      align: 'right',
      render: total_spent => <>{currency(total_spent)}</>,
    },
    {
      title: '',
      dataIndex: 'collection',
      render: (collection, row) => (
        <div
          style={{
            fontSize: '2rem',
            color: '#9EA0A5',
            cursor: 'pointer',
          }}
          onClick={() => updateCustomerContainerData(row, false)}
        >
          <EllipsisOutlined style={{color: '#9EA0A5'}} />
        </div>
      ),
    },
  ]);

  if (visitDistributor) {
    return (
      <Redirect
        to={{
          pathname: `/dashboard/sales-pages/${customerVisitRowData?.collection?.id}`,
          state: {uuid: visitDistributor['EnhancedUsers.uuid']},
        }}
      />
    );
  }

  return (
    <>
      <PageHeader
        title={
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div>
              {imageUrl ? (
                <Avatar size="large" src={imageUrl} />
              ) : (
                <AccountIcon
                  className="gray-medium"
                  style={{
                    fontSize: '1rem',
                    verticalAlign: 'middle',
                    margin: '0 1rem',
                  }}
                />
              )}
            </div>
            <div>
              <div className="avenir-medium fs-18 lh-28 gray-details">
                {customerData?.user?.full_name}
              </div>{' '}
              <div className="avenir-roman gray-medium text-regular">
                {customerData?.user?.email}
              </div>
            </div>
          </div>
        }
        ghost={false}
        extra={[
          <div style={{display: 'flex'}} key="customer-icon">
            <ContactIcon
              style={{
                color: '#EAEDF3',
                fontSize: '20px',
                marginRight: '0.5em',
              }}
            />
            <span className="avenir-roman gray-main text-regular">Payer</span>
          </div>,
        ]}
      />

      <div
        className="d-flex justify-between br"
        style={{border: 'solid 1px #EAEDF3', marginTop: '-4px'}}
      >
        <div
          className="p-3"
          style={{border: 'solid 1px #EAEDF3', width: '100%'}}
        >
          <div className="avenir-medium text-small">TOTAL SPENT</div>
          <div
            className="avenir-roman"
            style={{fontSize: '26px', lineHeight: '60px'}}
          >
            {currency(customerData?.customer?.total_spent)}
          </div>
        </div>
        <div
          className="p-3"
          style={{border: 'solid 1px #EAEDF3', width: '100%'}}
        >
          <div className="avenir-medium text-small"># OF ITEMS PURCHASED</div>
          <div
            className="avenir-roman"
            style={{fontSize: '26px', lineHeight: '60px'}}
          >
            {customerData?.customer?.total_items_purchased
              ? customerData.customer.total_items_purchased
              : 0}
          </div>
        </div>
        <div
          className="p-3"
          style={{border: 'solid 1px #EAEDF3', width: '100%'}}
        >
          <div className="avenir-medium text-small"># OF PAYMENTS</div>
          <div
            className="avenir-roman"
            style={{fontSize: '26px', lineHeight: '60px'}}
          >
            {customerData?.customer?.payments?.length
              ? customerData.customer.payments.length
              : 0}
          </div>
        </div>
        <div
          className="p-3"
          style={{border: 'solid 1px #EAEDF3', width: '100%'}}
        >
          <div className="avenir-medium text-small">COLLECTION PAGE VISITS</div>
          <div
            className="avenir-roman"
            style={{fontSize: '26px', lineHeight: '60px'}}
          >
            {customerData?.customer?.visits?.length
              ? customerData.customer.visits.length
              : 0}
          </div>
        </div>
      </div>

      <div
        className="br table-div-container"
        style={{marginTop: '1rem', border: '1px solid #EAEDF3'}}
      >
        <div className="d-flex" style={{alignItems: 'center', padding: '1rem'}}>
          <div className="icon-mark" style={{background: '#257A91'}}>
            <DollarIcon style={{color: '#fff'}} />
          </div>
          <div className="avenir-medium fs-18">Payments</div>
        </div>
        <Table
          loading={isFetching}
          bordered={false}
          columns={paymentColumns}
          dataSource={paymentData}
          rowKey="id"
          className="gray-details"
        />
      </div>

      <div
        className="br table-div-container"
        style={{marginTop: '1rem', border: '1px solid #EAEDF3'}}
      >
        <div className="d-flex" style={{alignItems: 'center', padding: '1rem'}}>
          <div className="icon-mark" style={{background: '#B0DFE5'}}>
            <ViewIcon style={{color: '#fff'}} />
          </div>
          <div className="avenir-medium fs-18">Visits</div>
        </div>
        <Table
          loading={isFetching}
          bordered={false}
          columns={visitColumns}
          dataSource={visitData}
          rowKey="first_visit"
          className="gray-details"
        />
      </div>
      <Drawer
        placement="right"
        width="600"
        maskClosable={true}
        closable={true}
        onClose={() => {
          setDrawerVisible(false);
        }}
        visible={drawerVisible}
        headerStyle={{
          border: 'none',
        }}
      >
        <PaymentHeader paymentData={customerPaymentData} />
        <CustomerContainer
          userName={customerData?.user?.full_name}
          image={imageUrl}
        />
        <CustomerPaymentDetails
          data={customerPaymentData}
          paymentData={customerPaymentRowData}
          visibleFlag={drawerVisible}
        />
        <ItemPurchased data={customerPaymentData} />
      </Drawer>
    </>
  );
};

const EnhancedCustomerDetailsPage = React.memo(CustomerDetailsPage);

export default EnhancedCustomerDetailsPage;
