import React from 'react';
import {Table} from 'antd';
import {currency} from 'helpers/numbers';
import {Link} from 'react-router-dom';
import {ViewIcon} from 'components/icons';
import {useQuery} from 'react-query';
import moment from 'moment';

import DistributorsQueryTypes from '../../../services/query-types/distributors';
import {getVisitors} from '../../../services/sales.service';

const Visitors = props => {
  const {
    data: visitorsData,
    isFetching,
  } = useQuery(
    DistributorsQueryTypes.REST_DISTRIBUTORS_SALES,
    () => getVisitors(props.id, props.uuid),
    {enabled: !!props.id, refetchOnWindowFocus: false}
  );

  const visitors = visitorsData || [];

  const getAllPayments = payments => {
    let allPayment = 0;
    if (payments && payments.length > 0) {
      payments.map(item => {
        allPayment += item.total;
      });
    }
    return allPayment;
  };

  const columns = [
    {
      title: 'VISITOR',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
      align: 'left',
      render: (name, visitor) => (
        <div>
          <div className="avenir-medium gray-details text-regular">
            <Link
              style={{
                color: '#3E3F42',
              }}
              to={`/dashboard/customers/${visitor?.id}`}
            >
              {visitor?.name || ''}
            </Link>
          </div>{' '}
          <div className="avenir-roman gray-medium text-small">
            {visitor?.email || ''}
          </div>
        </div>
      ),
    },
    {
      title: 'FIRST VISIT',
      dataIndex: 'created_at',
      sorter: (a, b) =>
        moment(a.created_at).unix() - moment(b.created_at).unix(),
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      render: createdAt => moment(createdAt).format('MMM DD, YYYY'),
    },
    {
      title: '# OF VISITS',
      dataIndex: 'identify_count',
      sorter: (a, b) =>
        parseInt(a['identify_count']) - parseInt(b['identify_count']),
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      render: visitsCount => (
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
          {visitsCount}
        </div>
      ),
    },
    {
      title: 'PAYMENTS',
      dataIndex: 'payments',
      sorter: (a, b) =>
        parseInt(getAllPayments(a['payments'])) -
        parseInt(getAllPayments(b['payments'])),
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      render: payments => currency(getAllPayments(payments)),
    },
  ];

  function onChange(pagination, filters, sorter, extra) {}

  return (
    <>
      <div className="card" style={{marginBottom: '1rem'}}>
        <div className="details_page-category-header d-flex items-center">
          <div className="details_page-category-header-mark bg-light-blue-2 white d-inline-flex justify-center items-center">
            <ViewIcon />
          </div>
          <span className="details_page-category-header-title avenir-roman gray-details">
            Visitors
          </span>
        </div>

        <div
          className="d-flex justify-between"
          style={{borderTop: 'solid 1px #EAEDF3'}}
        >
          <div className="details_page-category-item">
            <div className="caption">TOTAL Visitors</div>
            <div className="amount">9</div>
          </div>
          <div className="details_page-category-item">
            <div className="caption">TOTAL VISITS</div>
            <div className="amount">10</div>
          </div>
        </div>
      </div>

      <Table
        loading={isFetching}
        bordered={false}
        columns={columns}
        dataSource={visitors}
        onChange={onChange}
        rowKey="id"
        className="gray-details p-3"
      />
    </>
  );
};

export default Visitors;
