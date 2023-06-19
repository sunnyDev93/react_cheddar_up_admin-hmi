import React from 'react';
import {Avatar, Button, Input, PageHeader, Table, Dropdown} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import {currency} from 'helpers/numbers';
import apiClient from 'helpers/apiClient';
import {Link} from 'react-router-dom';
import {SettingsIcon, DownloadIcon} from 'components/icons';

import Filter from 'components/Filter';
import Export from 'components/Export';

const ProductsPage = () => {
  const columns = [
    {
      title: 'ITEM NAME',
      dataIndex: 'item',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => true,
      render: item => (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: '19px'}}>
            <Avatar size="large" src={item.image} shape="square" />
          </div>
          <div>
            <div className="avenir-roman text-regular gray-main">
              {item.name}
            </div>{' '}
          </div>
        </div>
      ),
    },
    {
      title: 'RETAIL PRICE',
      dataIndex: 'retail_price',
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      sorter: (a, b) => true,
      render: retail_price => currency(retail_price),
    },
    {
      title: 'COLLECTION PRICE',
      dataIndex: 'sale_price',
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      sorter: (a, b) => true,
      render: sale_price => currency(sale_price),
    },
    {
      title: 'TOTAL COLLECTED',
      dataIndex: 'total_collected',
      sorter: (a, b) => true,
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      render: total_collected => currency(total_collected),
    },
    {
      title: '# SOLD',
      dataIndex: 'sold',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => true,
      align: 'right',
      render: sold => (
        <Input
          size="small"
          style={{width: '29px', padding: 0}}
          className="text-capitalize br text-center"
          value={sold}
        />
      ),
    },
  ];

  const [data, setData] = React.useState([
    {
      id: 1,
      item: {
        image: 'product1',
        name: 'Baby Blue Dress',
      },
      retail_price: 34,
      sale_price: 17,
      total_collected: 7157,
      sold: 421,
    },
    {
      id: 2,
      item: {
        image: 'product2',
        name: 'Girls Big Ruffle',
      },
      retail_price: 36,
      sale_price: 18,
      total_collected: 15951,
      sold: 409,
    },

    {
      id: 3,
      item: {
        image: 'product3',
        name: 'Girls’ Puffer Tee',
      },
      retail_price: 30,
      sale_price: 15,
      total_collected: 15210,
      sold: 390,
    },

    {
      id: 4,
      item: {
        image: 'product4',
        name: 'Girls’ Collared Dress',
      },
      retail_price: 34,
      sale_price: 17,
      total_collected: 13533,
      sold: 347,
    },

    {
      id: 5,
      item: {
        image: 'product5',
        name: 'Tween Legging',
      },
      retail_price: 32,
      sale_price: 16,
      total_collected: 12051,
      sold: 309,
    },
  ]);

  //flag for updating this component.
  const [stateChangeFlag, setStateChangeFlag] = React.useState(true);

  const [filterItems, setFilterItems] = React.useState([
    {
      id: 1,
      type: 'check',
      name: 'Item Name',
      checked: false,
    },
    {
      id: 2,
      type: 'check',
      name: 'Retail Price',
      checked: false,
    },
    {
      id: 3,
      type: 'check',
      name: 'Sale Price',
      checked: false,
    },
    {
      id: 4,
      type: 'check',
      name: 'Total Collected',
      checked: false,
    },
    {
      id: 5,
      type: 'check',
      name: 'Number Sold',
      checked: false,
    },
    {
      id: 6,
      type: 'check',
      name: 'Source',
      checked: false,
    },
  ]);

  const exportItems = {
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
        name: 'Item Name',
        checked: false,
      },
      {
        id: 2,
        name: 'Number Sold',
        checked: false,
      },
      {
        id: 3,
        name: 'Retail Price',
        checked: false,
      },
      {
        id: 4,
        name: 'Across # of Sales',
        checked: false,
      },
      {
        id: 5,
        name: 'Sale Price',
        checked: false,
      },
      {
        id: 6,
        name: 'Source (Catalog, Seller, API)',
        checked: false,
      },
      {
        id: 7,
        name: 'Sold Price',
        checked: false,
      },
      {
        id: 8,
        name: '',
        checked: false,
      },
      {
        id: 9,
        name: 'Total Collected',
        checked: false,
      },
    ],
  };

  React.useEffect(() => {
    const getCustomers = async () => {
      const {data} = await apiClient.get(`/customers`);

      setData(data);
    };

    getCustomers();
  }, []);

  function onChange(pagination, filters, sorter, extra) {
    // console.log('params', pagination, filters, sorter, extra);
  }

  const onFilterCheckChange = (e, id) => {
    filterItems.find(item => item.id == id).checked = e.target.checked;
    setStateChangeFlag(!stateChangeFlag);
  };

  const onFilter = () => {
    if (
      filterItems.find(item => item.name == 'Total Collected').checked == true
    ) {
      return data.filter(item => item.total_collected > 10000);
    }
    return data;
  };

  return (
    <>
      <PageHeader
        title={
          <>
            <span className="avenir-roman">Products</span>{' '}
            <span className="avenir-roman gray-secondary text-regular">
              ({data.length})
            </span>
          </>
        }
        ghost={false}
        extra={[
          <Dropdown
            key="filter"
            overlay={
              <Filter
                filterItems={filterItems}
                onFilterCheckChange={onFilterCheckChange}
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
            overlay={<Export title="Customers" exportItems={exportItems} />}
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
        columns={columns}
        dataSource={onFilter()}
        onChange={onChange}
        rowKey="id"
        className="products-table"
        style={{color: '#3E3F42'}}
      />
    </>
  );
};

const EnhancedProductsPage = React.memo(ProductsPage);

export default EnhancedProductsPage;
