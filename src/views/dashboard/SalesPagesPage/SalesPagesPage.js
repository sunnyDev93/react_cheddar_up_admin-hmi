import React, {useState} from 'react';
import {Button, Dropdown, PageHeader, Table} from 'antd';
import {useCubeQuery} from '@cubejs-client/react';

import {SettingsIcon, DownloadIcon} from 'components/icons';
import Filter from 'components/Filter';
import Export from 'components/Export';
import {
  CUBE_SALES_PAGES,
  CUBE_SALES_PAGES_COUNT,
} from 'services/cube-query/sales-pages';
import {columns, exportItems, filterItems} from './config';

const SalesPagesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const deletedItemFilter = {
    member: 'Tabs.status',
    operator: 'notEquals',
    values: ['Deleted'],
  };

  const [cubeQuery, setCubeQuery] = useState(CUBE_SALES_PAGES);
  const [filters, setFilters] = useState([deletedItemFilter]);
  const [order, setOrder] = useState([]);

  const {resultSet: salesPages, isLoading} = useCubeQuery({
    ...cubeQuery,
    filters,
    order,
    limit: pageSize,
    offset: pageSize * (currentPage - 1),
  });

  const {resultSet: totalCountData} = useCubeQuery({
    ...CUBE_SALES_PAGES_COUNT,
    filters,
    timeDimensions: cubeQuery.timeDimensions,
  });

  const totalCount =
    totalCountData && totalCountData.rawData().length > 0
      ? totalCountData.rawData()[0]['Tabs.count']
      : 0;

  const dataSource = salesPages?.tablePivot() || [];

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

    const newCubeQuery = {...cubeQuery};
    const timeDimension = items.find(item => item.key === 'Tabs.createdAt');
    if (timeDimension.option && timeDimension.value) {
      const startDate = timeDimension.value[0].format('YYYY-MM-DD');
      const endDate = timeDimension.value[1].format('YYYY-MM-DD');
      newCubeQuery.timeDimensions = [
        {
          dimension: 'Tabs.createdAt',
          dateRange: [startDate, endDate],
        },
      ];
    } else {
      newCubeQuery.timeDimensions = [];
    }

    setCubeQuery(newCubeQuery);

    const filteredItems = newStatus.filter(
      item =>
        item.option && item.value !== null && item.key !== 'Tabs.createdAt'
    );
    const newFilters =
      filteredItems.length > 0
        ? filteredItems.map(item => ({
            member: item.key,
            operator:
              item.type === 'number'
                ? item?.method
                : item.type === 'select'
                ? 'equals'
                : 'contains',
            values: [`${item.value}`],
          }))
        : [];
    const tabCountItem = newFilters.find(item => item.member === 'Tabs.status');
    if (!tabCountItem) newFilters.push(deletedItemFilter);
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <>
      <PageHeader
        title={
          <>
            <span className="avenir-roman">Collection Pages</span>{' '}
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
            overlay={
              <Export title="Collection Pages" exportItems={exportItems} />
            }
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
        rowKey="Tabs.id"
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

const EnhancedSalesPagesPage = React.memo(SalesPagesPage);

export default EnhancedSalesPagesPage;
