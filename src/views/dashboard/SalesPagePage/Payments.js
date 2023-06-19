import React, {useState} from 'react';
import {Button, Drawer, Table} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import {currency} from 'helpers/numbers';
import {Link} from 'react-router-dom';
import {DollarIcon} from 'components/icons';
import * as moment from 'moment';
import {useCubeQuery} from '@cubejs-client/react';
import {useQuery} from 'react-query';

import PaymentHeader from 'components/RightSideDrawer/PaymentHeader';
import CustomerContainer from 'components/RightSideDrawer/CustomerContainer';
import ShippingInformation from 'components/RightSideDrawer/ShippingInformation';
import CustomerPaymentDetails from 'components/RightSideDrawer/CustomerPaymentDetails';
import ItemPurchased from 'components/RightSideDrawer/ItemPurchased';

import SalesQueryTypes from 'services/query-types/sales';
import PaymentQueryTypes from 'services/query-types/payment';
import {CUBE_DISTRIBUTORS} from 'services/cube-query/distributors';
import ImagesUtils from 'services/image.service';
import DistributorsQueryTypes from 'services/query-types/distributors';
import {getUserByEmail} from 'services/user.service';
import {getSinglePayment} from 'services/payment.service';
import {getPayments} from 'services/sales.service';

const Payments = props => {
  const {
    data: result,
    isFetching: isFetchingPayment,
  } = useQuery(
    SalesQueryTypes.REST_PAYMENT_SALE,
    () => getPayments(props.id, props.uuid),
    {enabled: !!props.id, refetchOnWindowFocus: false}
  );
  const dataSource = result?.data;

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = React.useState(null);
  const {
    data: selectedPaymentData,
    refetch: selectedPaymentDataRefetch,
  } = useQuery(
    PaymentQueryTypes.REST_SINGLE_PAYMENT,
    () => getSinglePayment(props.id, props.uuid, selectedPayment?.id),
    {enabled: false, refetchOnWindowFocus: false}
  );

  const {resultSet: usersData} = useCubeQuery({
    ...CUBE_DISTRIBUTORS,
    filters: [
      {
        member: 'EnhancedUsers.email',
        operator: 'equals',
        values: [`${selectedPaymentData?.tab_member?.email}`],
      },
    ],
    timeDimensions: [],
  });

  const user = (usersData && usersData.rawData()[0]) || null;
  const imageUrl = user
    ? ImagesUtils.getImageUrl(user['EnhancedUsers.profilePicturePath'])
    : null;

  const {
    data: customerInfo,
    refetch: customerInfoRefetch,
  } = useQuery(
    DistributorsQueryTypes.REST_DISTRIBUTORS_CUSTOMER,
    () => getUserByEmail(user['EnhancedUsers.email']),
    {enabled: !!user, refetchOnWindowFocus: false}
  );

  React.useEffect(() => {
    if (selectedPayment) {
      selectedPaymentDataRefetch();
    }
  }, [selectedPayment]);

  React.useEffect(() => {
    if (user) {
      customerInfoRefetch();
    }
  }, [user]);

  const columns = [
    {
      title: 'PAYER',
      dataIndex: 'tab_member',
      sorter: (a, b) => a.tab_member?.name.localeCompare(b.tab_member?.name),
      sortDirections: ['descend', 'ascend'],
      align: 'left',
      render: tab_member => (
        <Link
          style={{
            display: 'flex',
            fontSize: '2rem',
            color: '#9EA0A5',
          }}
          to={`/dashboard/customers/${tab_member.email}`}
        >
          <div>
            <div className="avenir-medium gray-details text-regular">
              {tab_member.name}
            </div>{' '}
            <div className="avenir-roman gray-medium text-small">
              {tab_member.email}
            </div>
          </div>
        </Link>
      ),
    },
    {
      title: 'AMOUNT',
      dataIndex: 'total',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => parseInt(a['total']) - parseInt(b['total']),
      align: 'right',
      render: balanceAvail => currency(balanceAvail),
    },
    {
      title: 'METHOD',
      dataIndex: 'payment_method',
      sorter: (a, b) => true,
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      render: payment_method => (
        <Button
          size="small"
          style={{
            fontSize: '12px',
            lineHeight: '18px',
            backgroundColor:
              payment_method === 'Card'
                ? '#B0DFE5'
                : payment_method === 'eCheck'
                ? '#CECFD2'
                : '#fff',
            borderColor: '#E2E5ED',
            color: '#3E3F42',
            width: '67px',
          }}
          className="avenir-meium text-capitalize br btn__disable"
        >
          {payment_method}
        </Button>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      render: status => (
        <span
          style={{
            color: status === 'Cleared' ? '#9D9D9D' : '#3E3F42',
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: 'DATE',
      dataIndex: 'available_on',
      sorter: (a, b) =>
        moment(a.available_on).unix() - moment(b.available_on).unix(),
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      render: available_on =>
        available_on ? moment(available_on).format('MMM DD, YYYY') : '',
    },
    {
      title: '',
      dataIndex: 'uuid',
      render: (uuid, row) => (
        <span
          style={{
            display: 'flex',
            fontSize: '2rem',
            color: '#9EA0A5',
          }}
          onClick={() => {
            setSelectedPayment(row);
            setDrawerVisible(true);
          }}
        >
          <EllipsisOutlined style={{color: '#9EA0A5'}} />
        </span>
      ),
    },
  ];

  function onChange(pagination, filters, sorter, extra) {}

  return (
    <>
      <div className="card" style={{marginBottom: '1rem'}}>
        <div className="details_page-category-header d-flex items-center">
          <div className="details_page-category-header-mark bg-teal white d-inline-flex justify-center items-center">
            <DollarIcon />
          </div>
          <span className="details_page-category-header-title avenir-roman gray-details">
            Payments
          </span>
        </div>
        <div className="d-flex justify-between">
          <div className="details_page-category-item">
            <div className="caption">TOTAL COLLECTED</div>
            <div className="amount">{currency(props?.paymentTotal)}</div>
          </div>
          <div className="details_page-category-item">
            <div className="caption">ITEMS SOLD</div>
            <div className="amount">{props?.itemCount}</div>
          </div>
          <div className="details_page-category-item">
            <div className="caption d-flex justify-between">
              <div>BALANCE</div>
              <Link
                style={{
                  fontSize: '2rem',
                  marginTop: '-7px',
                  marginBottom: '-7px',
                }}
                className="gray-secondary"
                to={`/dashboard/distributors`}
              >
                <EllipsisOutlined style={{color: '#9EA0A5'}} />
              </Link>
            </div>
            <div className="amount">{currency(props?.balance)}</div>
          </div>
        </div>
      </div>

      <Table
        loading={isFetchingPayment}
        bordered={false}
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
        rowKey="id"
        className="gray-details"
      />

      {drawerVisible && (
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
          bodyStyle={{
            background: '#F8F8F8 0% 0% no-repeat padding-box',
            boxShadow: '0px 3px 6px #00000029',
            border: '1px solid #F1F2F2',
          }}
        >
          <PaymentHeader paymentData={selectedPaymentData} />
          <CustomerContainer
            userName={selectedPaymentData?.tab_member?.name}
            image={imageUrl}
            email={selectedPaymentData?.tab_member?.email}
          />
          {!!user && customerInfo?.user && (
            <ShippingInformation data={customerInfo?.user} />
          )}
          <CustomerPaymentDetails
            data={selectedPaymentData}
            paymentData={{
              collection: {
                name: props.salesPageTitle,
              },
              organizer: {
                name: selectedPaymentData?.tab_member?.name,
              },
              date: selectedPaymentData?.created_at,
            }}
            visibleFlag={drawerVisible}
          />
          <ItemPurchased data={selectedPaymentData} />
        </Drawer>
      )}

      <style jsx="true">{`
        .icon-container {
          width: 36px;
          height: 36px;
          border-radius: 4px;
          background-color: #257a91;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 22.4px;
        }
      `}</style>
    </>
  );
};

export default Payments;
