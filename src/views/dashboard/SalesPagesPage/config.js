import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Input} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import * as moment from 'moment';
import {currency} from 'helpers/numbers';

export const columns = [
  {
    title: 'COLLECTION TITLE',
    dataIndex: 'Tabs.name',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) => a['Tabs.name'] > b['Tabs.name'],
    render: (title, row) => (
      <Link
        className="gray-details"
        to={{
          pathname: `/dashboard/sales-pages/${row['Tabs.id']}`,
          state: {uuid: row['Users.uuid']},
        }}
      >
        {title}
      </Link>
    ),
  },
  {
    title: 'COLLECTOR',
    dataIndex: 'Users.name',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) => a['Users.name'] > b['Users.name'],
  },
  {
    title: 'CREATED DATE',
    dataIndex: 'Tabs.createdAt',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) => a['Tabs.createdAt'] > b['Tabs.createdAt'],
    render: date => moment(date).format('MMM DD, YYYY'),
  },
  {
    title: 'STATUS',
    dataIndex: 'Tabs.status',
    sorter: (a, b) => true,
    sortDirections: ['descend', 'ascend'],
    align: 'right',
    render: status => (
      <Button
        size="small"
        style={{
          fontSize: '12px',
          lineHeight: '18px',
          backgroundColor:
            status === 'closed' ? '#B0DFE5' : status === 'open' && '#257A91',
          borderColor: '#E2E5ED',
          color: status !== 'open' ? '#373737' : '#fff',
          width: '67px',
        }}
        className="avenir-meium text-capitalize br btn__disable"
      >
        {status}
      </Button>
    ),
  },
  {
    title: 'PAYMENTS',
    dataIndex: 'Payments.count',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) =>
      parseInt(a['Payments.count']) - parseInt(b['Payments.count']),
    align: 'right',
    render: age => (
      <Input
        size="small"
        style={{width: '50px', padding: 0}}
        className="text-capitalize br text-center"
        value={age}
      />
    ),
  },
  {
    title: 'COLLECTED',
    dataIndex: 'Tabs.paymentsTotal',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) =>
      parseInt(a['Tabs.paymentsTotal']) - parseInt(b['Tabs.paymentsTotal']),
    align: 'right',
    render: collected => <>{currency(collected)}</>,
  },
  {
    title: '',
    dataIndex: 'Tabs.id',
    render: (id, row) =>
      row['Tabs.status'] !== 'Deleted' ? (
        <Link
          className="gray-details"
          style={{fontSize: '2rem'}}
          to={{
            pathname: `/dashboard/sales-pages/${id}`,
            state: {uuid: row['Users.uuid'], email: row['Users.email']},
          }}
        >
          <EllipsisOutlined style={{color: '#9EA0A5'}} />
        </Link>
      ) : null,
  },
];

export const filterItems = [
  {
    id: 1,
    type: 'date-range',
    key: 'Tabs.createdAt',
    name: 'Sign Up Date',
    checked: false,
  },
  {
    id: 2,
    type: 'number',
    key: 'Tabs.paymentsTotal',
    name: 'Collected',
    checked: false,
  },
  {
    id: 3,
    type: 'select',
    key: 'Tabs.status',
    name: 'Status',
    checked: false,
    placeholder: 'Select Status',
    options: [
      {key: 'Open', label: 'Open'},
      {key: 'Deleted', label: 'Deleted'},
      {key: 'Closed', label: 'Closed'},
    ],
  },
  {
    id: 4,
    type: 'number',
    key: 'Payments.count',
    name: 'Payments',
    checked: false,
    method: 'equals',
  },
  {
    id: 5,
    type: 'string',
    key: 'Users.name',
    name: 'Distributor',
    checked: false,
    placeholder: 'Enter Name',
  },
  {
    id: 6,
    type: 'string',
    key: 'Tabs.name',
    name: 'Collection Page Name',
    checked: false,
    placeholder: 'Enter  Name',
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
      name: 'Withdraw Date',
      checked: false,
    },
    {
      id: 3,
      name: 'Number of Visits',
      checked: false,
    },
    {
      id: 4,
      name: 'Last Name',
      checked: false,
    },
    {
      id: 5,
      name: 'Currency',
      checked: false,
    },
    {
      id: 6,
      name: 'Sale ID',
      checked: false,
    },
    {
      id: 7,
      name: 'Email',
      checked: false,
    },
    {
      id: 8,
      name: 'Bank Account',
      checked: false,
    },
    {
      id: 9,
      name: 'Status',
      checked: false,
    },
    {
      id: 10,
      name: 'Created Date',
      checked: false,
    },
    {
      id: 11,
      name: 'Total Balance',
      checked: false,
    },
    {
      id: 12,
      name: 'Closed Date',
      checked: false,
    },
    {
      id: 13,
      name: 'Total Collected',
      checked: false,
    },
    {
      id: 14,
      name: 'Number of Payments',
      checked: false,
    },
    {
      id: 15,
      name: 'Deleted Date',
      checked: false,
    },
    {
      id: 16,
      name: 'Total Withdrawn',
      checked: false,
    },
  ],
};
