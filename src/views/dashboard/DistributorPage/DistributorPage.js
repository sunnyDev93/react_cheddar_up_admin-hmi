import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Menu,
  PageHeader,
  Row,
  Table,
} from 'antd';
import Icon, {
  DollarCircleOutlined,
  EllipsisOutlined,
  EnvironmentOutlined,
  MobileOutlined,
  MessageOutlined,
  PhoneOutlined,
  StarFilled,
  CaretUpOutlined,
  CaretDownOutlined,
} from '@ant-design/icons';
import {useCubeQuery} from '@cubejs-client/react';
import {useQuery} from 'react-query';
import * as moment from 'moment';

import {currency} from 'helpers/numbers';
import {ContactIcon, PinIcon} from 'components/icons';
import {CUBE_DISTRIBUTORS} from '../../../services/cube-query/distributors';
import {getUserInfo, getUserTabInfo} from '../../../services/user.service';
import DistributorsQueryTypes from '../../../services/query-types/distributors';
import ImagesUtils from '../../../services/image.service';
import {AccountIcon} from '../../../components/icons';
import {ReactComponent as MessageIcon} from '../../../theme/images/message.svg';
import {ReactComponent as LocationIcon} from '../../../theme/images/location.svg';
import {ReactComponent as DollarIcon} from '../../../theme/images/dollar.svg';

const DistributorPage = () => {
  const [activeRoleIdx, setActiveRoleIdx] = React.useState(0);
  const {distributor: routeId} = useParams();
  const {resultSet: distributors} = useCubeQuery({
    ...CUBE_DISTRIBUTORS,
    filters: [
      {
        member: 'EnhancedUsers.id',
        operator: 'equals',
        values: [`${routeId}`],
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

  const {
    data: userInfoResult,
    refetch: userRefetch,
    isFetching,
  } = useQuery(
    DistributorsQueryTypes.REST_SINGLE_DISTRIBUTOR,
    () => getUserInfo(distributor['EnhancedUsers.uuid']),
    {enabled: !!distributor, refetchOnWindowFocus: false}
  );

  if (!!distributor && !userInfoResult) {
    userRefetch();
  }

  const {
    data: salesResult,
    refetch: salesRefetch,
  } = useQuery(
    DistributorsQueryTypes.REST_DISTRIBUTORS_SALES,
    () => getUserTabInfo(distributor['EnhancedUsers.uuid']),
    {enabled: !!distributor, refetchOnWindowFocus: false}
  );

  if (!!distributor && !salesResult) {
    salesRefetch();
  }

  useEffect(() => {
    if (!!distributor) {
      if (distributor['EnhancedUsers.paymentsTotal'] * 1 > 0)
        setActiveRoleIdx(1);
    }
  }, [distributor]);

  const iconStyle = {
    fontSize: '1.25rem',
    marginRight: '0.75rem',
    width: '20px',
    height: '20px',
    marginBottom: '0.5rem',
  };

  const columns = [
    {
      title: 'COLLECTION NAME',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
      align: 'left',
      render: (name, row) => (
        <Link
          className="gray-details"
          to={{
            pathname: `/dashboard/sales-pages/${row['id']}`,
            state: {uuid: distributor && distributor['EnhancedUsers.uuid']},
          }}
        >
          {name}
        </Link>
      ),
    },
    {
      title: 'CREATED DATE',
      dataIndex: 'created_at',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) =>
        moment(a.created_at).unix() - moment(b.created_at).unix(),
      align: 'right',
      render: created_at => moment(created_at).format('MMM DD, YYYY'),
    },
    {
      title: 'STATUS',
      dataIndex: 'access',
      sorter: (a, b) => true,
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      render: access => (
        <Button
          size="small"
          style={{
            fontSize: '12px',
            lineHeight: '18px',
            backgroundColor: access?.deleted_at
              ? '#F8F8F8'
              : access?.closed_at
              ? '#B0DFE5'
              : '#257A91',
            borderColor: '#E2E5ED',
            color:
              !access?.closed_at && !access?.deleted_at ? '#fff' : '#373737',
            width: '67px',
          }}
          className="avenir-meium text-capitalize br btn__disable"
        >
          {access?.deleted_at
            ? 'deleted'
            : access?.closed_at
            ? 'closed'
            : 'open'}
        </Button>
      ),
    },
    {
      title: 'COLLECTED',
      dataIndex: 'payments_total',
      sorter: (a, b) =>
        parseInt(a['payments_total']) - parseInt(b['payments_total']),
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      render: payments_total => currency(payments_total),
    },
    {
      title: '',
      dataIndex: 'id',
      render: id => (
        <Link
          style={{
            fontSize: '1.5rem',
            color: '#9EA0A5',
            display: 'flex',
          }}
          to={{
            pathname: `/dashboard/sales-pages/${id}`,
            state: {
              uuid: distributor && distributor['EnhancedUsers.uuid'],
              email: distributor && distributor['EnhancedUsers.email'],
            },
          }}
        >
          <EllipsisOutlined style={{color: '#9EA0A5'}} />
        </Link>
      ),
    },
  ];

  const menuIconStyle = {color: '#CECFD2', marginRight: '10px'};
  const menuOptions = [
    {
      icon: props => <Icon component={StarFilled} {...props} />,
      text: 'Collector',
    },
    {
      icon: props => <Icon component={ContactIcon} {...props} />,
      text: 'Payer',
    },
  ];
  const renderMenuOption = i => {
    const IconComponent = menuOptions[i].icon;

    return (
      <>
        <Icon
          component={() => <IconComponent style={menuIconStyle} />}
          style={menuIconStyle}
        />
        {menuOptions[i].text} &nbsp;
        {activeRoleIdx === i ? '(Active)' : ''}
      </>
    );
  };

  const menu = (
    <Menu>
      {menuOptions.map((menuOption, i) => (
        <Menu.Item
          key={menuOption.text}
          onClick={() => {
            setActiveRoleIdx(i);
          }}
          style={{display: 'flex', alignItems: 'center'}}
        >
          {menuOption.text === 'Payer' ? (
            <Link
              style={{width: '100%'}}
              to={`/dashboard/customers/${distributor &&
                distributor['EnhancedUsers.email']}`}
            >
              {renderMenuOption(i)}
            </Link>
          ) : (
            renderMenuOption(i)
          )}
        </Menu.Item>
      ))}
    </Menu>
  );

  function onChange(pagination, filters, sorter, extra) {}

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
                    fontSize: '22px',
                    verticalAlign: 'middle',
                    margin: '0 1rem',
                  }}
                />
              )}
            </div>
            <div>
              <div className="avenir-medium fs-18 lh-28 gray-details">
                {distributor && distributor['EnhancedUsers.name']}
              </div>{' '}
              <div className="avenir-roman gray-medium text-regular">
                {distributor && distributor['EnhancedUsers.email']}
              </div>
            </div>
          </div>
        }
        ghost={false}
        extra={[
          <Dropdown overlay={menu} key="dropdown">
            <a
              className="ant-dropdown-link gray-main br avenir-roman"
              onClick={e => e.preventDefault()}
              style={{
                width: '190px',
                display: 'flex',
                alignItems: 'center',
                padding: '5px 12px',
                border: '1px solid #D8DCE6',
                position: 'relative',
              }}
            >
              {renderMenuOption(activeRoleIdx)}
              <span
                className="gray-medium"
                style={{
                  display: 'inline-flex',
                  flexDirection: 'column',
                  verticalAlign: 'middle',
                  marginRight: 7,
                  position: 'absolute',
                  right: 0,
                }}
              >
                <CaretUpOutlined style={{fontSize: 10}} />
                <CaretDownOutlined style={{fontSize: 10}} />
              </span>
            </a>
          </Dropdown>,
        ]}
      />

      <div className="d-flex items-start page-content">
        <div className="overview-n-account">
          <div className="overview card">
            <div className="p-3">
              <div className="avenir-roman text-small gray-secondary">
                DISPLAY NAME
              </div>
              <div className="merriweather italic gray-thick role">
                {distributor && distributor['EnhancedUsers.name']}
              </div>
            </div>
            <div className="p-3">
              <div className="d-flex justify-between">
                <div>
                  <div className="caption">TOTAL COLLECTED</div>
                  <div className="amount">
                    {distributor &&
                      currency(distributor['EnhancedUsers.paymentsTotal'])}
                  </div>
                </div>
                <div>
                  <div className="caption">BALANCE AVAIL</div>
                  <div className="amount">
                    {distributor &&
                      currency(distributor['EnhancedUsers.balance'])}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3">
              <div style={{margin: '0 -0.75rem'}}>
                <div className="detail-view-button on avenir-roman">
                  Collection Pages
                </div>
              </div>
              <div style={{margin: '0 -0.75rem'}}>
                <div className="detail-view-button">Payers</div>
              </div>
            </div>
          </div>

          <div className="account-info card">
            <div className="p-3">
              <div className="avenir-roman text-small gray-secondary account-info__title">
                ACCOUNT INFORMATION
              </div>
              <div className="account-info__details">
                <div>
                  <MessageIcon fill="grey" style={iconStyle} />
                  <span className="account-info__details-text text-regular avenir-roman gray-details">
                    {distributor && distributor['EnhancedUsers.email']}
                  </span>
                </div>
                <div>
                  <MobileOutlined className="gray-icon" style={iconStyle} />
                  <span className="text-regular avenir-roman gray-details">
                    {userInfoResult?.profile?.phone?.lastTwoNumbers || ''}
                  </span>
                </div>
                <div>
                  <LocationIcon fill="#CECFD2" style={iconStyle} />
                  <div>
                    <span
                      className="text-regular avenir-roman gray-details"
                      style={{display: 'block'}}
                    >
                      &nbsp;
                      {userInfoResult?.profile?.returnAddress?.street1}
                    </span>
                    <span className="text-regular avenir-roman gray-details">
                      {userInfoResult?.profile?.returnAddress?.city} &nbsp;
                      {userInfoResult?.profile?.returnAddress?.country}
                    </span>
                  </div>
                </div>
                <div>
                  <DollarIcon fill="#CECFD2" style={iconStyle} />
                  <span className="text-regular avenir-roman gray-details">
                    {userInfoResult?.currency || 'USD'}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-3">
              <Row>
                <Col span={12} className="gray-medium">
                  Account Created
                </Col>
                <Col span={12} className="gray-details">
                  {distributor &&
                    moment(distributor['EnhancedUsers.createdAt']).format(
                      'MMM DD, YYYY'
                    )}
                </Col>
              </Row>
              <Row>
                <Col span={12} className="gray-medium">
                  Status
                </Col>
                <Col span={12} className="gray-details">
                  {distributor && distributor['EnhancedUsers.status']}
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <div className="card flex-fill">
          <div className="details_page-category-header d-flex items-center">
            <span className="details_page-category-header-mark bg-yellow white d-inline-flex justify-center items-center">
              <PinIcon />
            </span>
            <span className="details_page-category-header-title avenir-roman gray-details">
              Collection Pages: {salesResult ? salesResult.length : 0}
            </span>
          </div>

          <Table
            loading={isFetching}
            bordered={false}
            columns={columns}
            dataSource={salesResult}
            onChange={onChange}
            rowKey="id"
            className="gray-details details_table-container"
            pagination={false}
          />
        </div>
      </div>

      <style jsx="true">{`
        .page-content {
          margin-top: 15px;
        }
        .overview-n-account {
          width: 350px;
          margin-right: 20px;
        }
        .overview {
          margin-bottom: 20px;
        }
        .role {
          font-size: 13px;
          line-height: 20px;
        }
        .account-info__title {
          margin-bottom: 1.25rem;
        }
        .account-info__details > div {
          display: flex;
          padding: 0.25rem 0;
        }
        .account-info__details-text {
          font-size: 14px;
          line-height: 22px;
          font-family: 'AvenirLTStd-Roman', sans-serif;
          color: #3e3f42;
        }
      `}</style>
    </>
  );
};

const EnhancedDistributorPage = React.memo(DistributorPage);

export default EnhancedDistributorPage;
