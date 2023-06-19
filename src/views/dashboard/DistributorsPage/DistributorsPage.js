import React, {useState} from 'react';
import {Button, Dropdown, PageHeader, Table} from 'antd';
import {useCubeQuery} from '@cubejs-client/react';

import {DownloadIcon, SettingsIcon} from 'components/icons';

import Filter from 'components/Filter';
import Export from 'components/Export';

import {
  CUBE_DISTRIBUTORS,
  CUBE_DISTRIBUTORS_COUNT,
} from 'services/cube-query/distributors';

import {columns, exportItems, filterItems} from './config';

const DistributorsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const [cubeQuery, setCubeQuery] = useState(CUBE_DISTRIBUTORS);
  const [filters, setFilters] = useState([]);
  const [order, setOrder] = useState([]);
  const {resultSet: distributors, isLoading} = useCubeQuery({
    ...cubeQuery,
    filters,
    order,
    limit: pageSize,
    offset: pageSize * (currentPage - 1),
  });
  const {resultSet: totalCountData} = useCubeQuery({
    ...CUBE_DISTRIBUTORS_COUNT,
    filters,
    timeDimensions: cubeQuery.timeDimensions,
  });
  const totalCount = totalCountData
    ? totalCountData.rawData()[0]['EnhancedUsers.count']
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

    const newCubeQuery = {...cubeQuery};
    const timeDimension = newStatus.find(
      item => item.key === 'EnhancedUsers.createdAt'
    );
    if (timeDimension.option && timeDimension.value) {
      const startDate = timeDimension.value[0].format('YYYY-MM-DD');
      const endDate = timeDimension.value[1].format('YYYY-MM-DD');
      newCubeQuery.timeDimensions = [
        CUBE_DISTRIBUTORS.timeDimensions[0],
        {
          dimension: 'EnhancedUsers.createdAt',
          dateRange: [startDate, endDate],
        },
      ];
    } else {
      newCubeQuery.timeDimensions = CUBE_DISTRIBUTORS.timeDimensions;
    }

    setCubeQuery(newCubeQuery);

    const filteredItems = newStatus.filter(
      item =>
        item.option &&
        item.value !== null &&
        item.key !== 'EnhancedUsers.createdAt'
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
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <>
      <PageHeader
        title={
          <>
            <span className="avenir-roman">Collectors</span>{' '}
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
            overlay={<Export title="Collectors" exportItems={exportItems} />}
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
        rowKey="EnhancedUsers.email"
        className="gray-details"
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

const EnhancedDistributorsPage = React.memo(DistributorsPage);

export default EnhancedDistributorsPage;
