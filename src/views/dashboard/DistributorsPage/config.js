import React from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Button} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import {AccountIcon} from '../../../components/icons';
import * as moment from 'moment';

import {currency} from 'helpers/numbers';
import ImagesUtils from '../../../services/image.service';

export const columns = [
  {
    title: 'COLLECTOR',
    dataIndex: 'EnhancedUsers.name',
    sorter: (a, b) => a['EnhancedUsers.name'] > b['EnhancedUsers.name'],
    sortDirections: ['descend', 'ascend'],
    render: (_, distributorInfo) => (
      <div style={{display: 'flex'}}>
        <div style={{marginRight: '1rem'}}>
          {distributorInfo['EnhancedUsers.profilePicturePath'] ? (
            <Avatar
              size="large"
              src={ImagesUtils.getImageUrl(
                distributorInfo['EnhancedUsers.profilePicturePath']
              )}
            />
          ) : (
            <AccountIcon
              className="gray-medium"
              style={{
                fontSize: '20px',
                verticalAlign: 'middle',
              }}
            />
          )}
        </div>
        <div>
          <div className="avenir-roman text-regular">
            {distributorInfo['EnhancedUsers.name']}
          </div>
          <div className="avenir-roman text-small gray-secondary">
            {distributorInfo['EnhancedUsers.email']}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'ACCT CREATED',
    dataIndex: 'EnhancedUsers.createdAt',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) =>
      a['EnhancedUsers.createdAt'] > b['EnhancedUsers.createdAt'],
    align: 'right',
    render: date => moment(date).format('MMM DD, YYYY'),
  },
  {
    title: 'ACCT STATUS',
    dataIndex: 'EnhancedUsers.status',
    sorter: (a, b) => true,
    sortDirections: ['descend', 'ascend'],
    align: 'right',
    render: acctStatus => (
      <>
        <Button
          size="small"
          style={{
            fontSize: '12px',
            lineHeight: '18px',
            backgroundColor: acctStatus === 'active' && '#B0DFE5',
            borderColor: acctStatus === 'active' && '#E2E5ED',
            color: '#3E3F42',
            width: '67px',
          }}
          className="text-capitalize br avenir-medium btn__disable"
          disable
        >
          {acctStatus}
        </Button>
      </>
    ),
  },
  {
    title: 'COLLECTION PAGES',
    dataIndex: 'EnhancedUsers.tabsCount',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) =>
      parseInt(a['EnhancedUsers.tabsCount']) -
      parseInt(b['EnhancedUsers.tabsCount']),
    align: 'right',
    render: salesPagesCount => (
      <div
        style={{
          fontSize: '12px',
          width: '29px',
          height: '24px',
          lineHeight: '24px',
          backgroundColor: '#FBFBFD',
          border: '1px solid #E2E5ED',
          color: '#3E3F42',
          padding: 0,
          marginLeft: 'auto',
        }}
        className="text-capitalize br text-center"
      >
        {parseInt(salesPagesCount)}
      </div>
    ),
  },
  {
    title: 'BALANCE AVAIL',
    dataIndex: 'EnhancedUsers.balance',
    sortDirections: ['descend', 'ascend'],
    align: 'right',
    render: balanceAvail => currency(parseInt(balanceAvail)),
  },
  {
    title: 'TOTAL COLLECTED',
    dataIndex: 'EnhancedUsers.paymentsTotal',
    sortDirections: ['descend', 'ascend'],
    align: 'right',
    render: balanceAvail => currency(parseInt(balanceAvail)),
  },
  {
    title: '',
    dataIndex: 'EnhancedUsers.id',
    render: id => (
      <Link
        className="gray-details"
        style={{
          fontSize: '1.5rem',
          display: 'flex',
        }}
        to={`/dashboard/distributors/${id}`}
      >
        <EllipsisOutlined style={{color: '#9EA0A5'}} />
      </Link>
    ),
  },
];

export const exportItems = {
  date_range: [
    {
      id: 1,
      name: 'Today',
      text: 'Jul 12',
    },
    {
      id: 2,
      name: 'Current Month',
      text: 'Jul 1 - Jul 12',
    },
    {
      id: 3,
      name: 'Previous 7 days',
      text: 'Jul 5 - Jul 11',
    },
    {
      id: 4,
      name: 'Previous Month',
      text: 'Jun 1 - Jun 30',
    },
    {
      id: 5,
      name: 'All',
      text: '',
    },
    {
      id: 6,
      name: 'Custom',
      text: 'Jul 1 - Jul 12',
    },
    {
      id: 7,
      name: '',
      placeholder: 'Jan 1, 2019 $ Jun 12, 2019',
    },
  ],
  Columns: [
    {
      id: 1,
      name: 'First Name',
      checked: true,
    },
    {
      id: 2,
      name: 'Currency',
      checked: true,
    },
    {
      id: 3,
      name: 'Total Withdrawn',
      checked: true,
    },
    {
      id: 4,
      name: 'Last Name',
      checked: false,
    },
    {
      id: 5,
      name: 'Collection Pages',
      checked: false,
    },
    {
      id: 6,
      name: 'Unique Items Sold',
      checked: false,
    },
    {
      id: 7,
      name: 'Email',
      checked: false,
    },
    {
      id: 8,
      name: 'Avaliable Balance',
      checked: false,
    },
    {
      id: 9,
      name: 'Unique Payers',
      checked: false,
    },
    {
      id: 10,
      name: 'Created Date',
      checked: false,
    },
    {
      id: 11,
      name: 'Total Collected',
      checked: false,
    },
  ],
};

export const filterItems = [
  {
    id: 1,
    type: 'date-range',
    key: 'EnhancedUsers.createdAt',
    name: 'Sign Up Date',
    checked: false,
  },
  {
    id: 2,
    type: 'select',
    key: 'EnhancedUsers.status',
    name: 'Status',
    checked: false,
    placeholder: 'Select Status',
    options: [
      {key: 'Active', label: 'Active'},
      {key: 'Disabled', label: 'Disabled'},
      {key: 'Inactive', label: 'Inactive'},
    ],
  },
  {
    id: 3,
    type: 'number',
    key: 'EnhancedUsers.tabsCount',
    name: 'Collection Pages',
    checked: false,
    method: 'equals',
  },
  {
    id: 5,
    type: 'number',
    key: 'EnhancedUsers.paymentsTotal',
    name: 'Total Collected',
    checked: false,
  },
  {
    id: 5,
    type: 'string',
    key: 'EnhancedUsers.email',
    name: 'Email',
    checked: false,
    placeholder: 'Enter Email',
  },
];
