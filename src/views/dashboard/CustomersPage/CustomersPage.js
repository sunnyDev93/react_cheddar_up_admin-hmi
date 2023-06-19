import React, {useState} from 'react';
import {Button, PageHeader, Table, Dropdown} from 'antd';
import {useCubeQuery} from '@cubejs-client/react';

import {SettingsIcon, DownloadIcon} from 'components/icons';
import Filter from 'components/Filter';
import Export from 'components/Export';
import {
  CUBE_CUSTOMERS,
  CUBE_CUSTOMERS_COUNT,
} from 'services/cube-query/customers';

import {columns, exportItems, filterItems} from './config';

const CustomersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const [filters, setFilters] = useState([]);
  const [order, setOrder] = useState([]);
  const {resultSet: distributors, isLoading} = useCubeQuery({
    ...CUBE_CUSTOMERS,
    filters,
    order,
    limit: pageSize,
    offset: pageSize * (currentPage - 1),
  });
  const {resultSet: totalCountData} = useCubeQuery({
    ...CUBE_CUSTOMERS_COUNT,
    filters,
  });
  const totalCount =
    totalCountData && totalCountData.rawData()[0]
      ? totalCountData.rawData()[0]['Customers.count']
      : 0;
  const dataSource = distributors?.tablePivot() || [];

  const onChange = (pagination, filters, sorter) => {
    const newOrder = sorter?.order
      ? [[sorter.field, sorter.order === 'descend' ? 'desc' : 'asc']]
      : [];
    setOrder(newOrder);
  };

  const onFilterCheckChange = items => {
    const newStatus = [...items];
    const betweenItem = newStatus.find(itm => itm.method === 'between');
    const betweenItemIndex = newStatus.indexOf(betweenItem);
    if (betweenItem) {
      newStatus.splice(betweenItemIndex, 1);
      const smallItem = {
        key: betweenItem.key,
        method: 'gt',
        option: betweenItem.option,
        type: betweenItem.type,
        value: betweenItem.value[0],
      };
      const largeItem = {
        key: betweenItem.key,
        method: 'lt',
        option: betweenItem.option,
        type: betweenItem.type,
        value: betweenItem.value[1],
      };
      newStatus.push(smallItem);
      newStatus.push(largeItem);
    }
    const filteredItems = newStatus.filter(
      item => item.option && item.value !== null
    );
    const newFilters =
      filteredItems.length > 0
        ? filteredItems.map(item => ({
            member: item.key === 'Type' ? 'Payments.total' : item.key,
            operator:
              item.type === 'number'
                ? item?.method
                : item.key === 'Type' && item.value
                ? 'gt'
                : 'contains',
            values: [item.key === 'Type' ? '0' : `${item.value}`],
          }))
        : [];

    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <>
      <PageHeader
        title={
          <>
            <span className="avenir-roman">Payers</span>{' '}
            <span className="avenir-roman gray-secondary text-regular">
              ({totalCount})
            </span>
          </>
        }
        ghost={false}
        extra={[
          <Dropdown
            key="filter"
            trigger="click"
            overlay={
              <Filter
                filterItems={filterItems}
                onSubmit={onFilterCheckChange}
              />
            }
          >
            <Button icon={<SettingsIcon className="gray-icon" />} size="large">
              <span className="avenir-roman gray-details text-regular">
                Filter
              </span>
            </Button>
          </Dropdown>,
          <Dropdown
            key="export"
            overlay={<Export title="Payers" exportItems={exportItems} />}
          >
            <Button icon={<DownloadIcon className="gray-icon" />} size="large">
              <span className="avenir-roman gray-details text-regular">
                Export
              </span>
            </Button>
          </Dropdown>,
        ]}
      />
      <Table
        bordered={false}
        loading={isLoading}
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
        rowKey="Customers.email"
        style={{color: '#3E3F42'}}
        pagination={{
          current: currentPage,
          total: totalCount,
          pageSize,
          onChange: (page, size) => {
            handlePageChange(page, size);
          },
        }}
      />
    </>
  );
};

const EnhancedCustomersPage = React.memo(CustomersPage);

export default EnhancedCustomersPage;
