import React from 'react';
import {EllipsisOutlined} from '@ant-design/icons';

import {Link} from 'react-router-dom';
import {currency} from '../../../helpers/numbers';

export const columns = [
  {
    title: 'NAME',
    dataIndex: 'Customers.name',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) => a['Customers.name'] > b['Customers.name'],
    render: (name, row) => (
      <Link
        className="gray-details"
        to={`/dashboard/customers/${row['Customers.email']}`}
      >
        <div style={{display: 'flex'}}>
          <div>
            <div className="avenir-roman text-regular">{name}</div>
            <div className="avenir-roman text-small gray-secondary">
              {row['Customers.email']}
            </div>
          </div>
        </div>
      </Link>
    ),
  },
  {
    title: 'TOTAL SPENT',
    dataIndex: 'Payments.total',
    sortDirections: ['descend', 'ascend'],
    align: 'right',
    sorter: (a, b) =>
      parseInt(a['Payments.total']) - parseInt(b['Payments.total']),
    render: totalSpent => <>{currency(totalSpent)}</>,
  },
  {
    title: 'ITEMS PURCHASED',
    dataIndex: 'PaymentItems.totalQuantity',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) =>
      parseInt(a['PaymentItems.totalQuantity']) -
      parseInt(b['PaymentItems.totalQuantity']),
    align: 'right',
  },
  {
    title: 'PAYMENTS',
    dataIndex: 'Payments.count',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) =>
      parseInt(a['Payments.count']) - parseInt(b['Payments.count']),
    align: 'right',
  },
  {
    title: 'SAVE VISITS',
    dataIndex: 'Tabs.count',
    sortDirections: ['descend', 'ascend'],
    sorter: (a, b) => parseInt(a['Tabs.count']) - parseInt(b['Tabs.count']),
    align: 'right',
    render: collected => <>{currency(collected)}</>,
  },
  {
    title: '',
    dataIndex: 'Customers.email',
    render: id => (
      <Link
        className="gray-details"
        style={{fontSize: '2rem'}}
        to={`/dashboard/customers/${id}`}
      >
        <EllipsisOutlined style={{color: '#9EA0A5'}} />
      </Link>
    ),
  },
];

export const filterItems = [
  {
    id: 1,
    type: 'string',
    key: 'Customers.name',
    name: 'Name',
    placeholder: 'Enter Name',
    checked: false,
  },
  {
    id: 2,
    type: 'string',
    key: 'Customers.email',
    name: 'Email',
    placeholder: 'Enter Email',
    checked: false,
  },
  {
    id: 3,
    type: 'number',
    key: 'Payments.total',
    name: 'Total Spent',
    checked: false,
    method: 'equals',
  },
  {
    id: 4,
    type: 'number',
    key: 'Payments.count',
    name: 'Number (#) of Orders',
    checked: false,
    method: 'equals',
  },
  {
    id: 5,
    type: 'number',
    key: 'Tabs.count',
    name: 'Number (#) of Collections Visited',
    checked: false,
    method: 'equals',
  },
  {
    id: 6,
    type: 'switch',
    key: 'Type',
    name: 'Type (Customer or Visitor Only)',
    checked: false,
    checkedLabel: 'Customer',
    unCheckedLabel: 'Visitor',
  },
  {
    id: 7,
    type: 'string',
    key: 'Users.name',
    name: 'Collector',
    placeholder: 'Enter Name',
    checked: false,
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
      name: 'Number (#) of Orders: Completed',
      checked: true,
    },
    {
      id: 3,
      name: 'Last Name',
      checked: true,
    },
    {
      id: 4,
      name: 'Number (#) of Orders: Abandoned',
      checked: false,
    },
    {
      id: 5,
      name: 'Email',
      checked: false,
    },
    {
      id: 6,
      name: 'Number (#) of Collections Visitied',
      checked: false,
    },
    {
      id: 7,
      name: 'Total Spent',
      checked: false,
    },
    {
      id: 8,
      name: 'Number (#) of Items Purchased',
      checked: false,
    },
  ],
};
