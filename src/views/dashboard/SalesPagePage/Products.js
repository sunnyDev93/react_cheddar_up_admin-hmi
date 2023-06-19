import React from 'react';
import {Avatar, Table} from 'antd';
import {currency} from 'helpers/numbers';
import {TagIcon} from 'components/icons';

const Products = () => {
  const columns = [
    {
      title: 'ITEM NAME',
      dataIndex: 'product-info',
      sorter: (a, b) => true,
      sortDirections: ['descend', 'ascend'],
      align: 'left',
      render: productInfo => (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: '19px'}}>
            <Avatar size="large" src={productInfo.image} shape="square" />
          </div>
          <div>
            <div className="avenir-roman text-regular">{productInfo.name}</div>{' '}
            <div className="avenir-roman text-small gray-secondary">
              Retail Price: {currency(productInfo.price)}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'COLLECTION PRICE',
      dataIndex: 'salePrice',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => true,
      align: 'right',
      render: balanceAvail => currency(balanceAvail),
    },
    {
      title: 'TOTAL COLLECTED',
      dataIndex: 'totalCollected',
      sorter: (a, b) => true,
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      render: totalCollected =>
        totalCollected !== 0 ? currency(totalCollected) : '-',
    },
    {
      title: '#SOLD',
      dataIndex: 'sold',
      sorter: (a, b) => true,
      sortDirections: ['descend', 'ascend'],
      align: 'right',
      render: sold => (
        <div
          style={{
            width: '32px',
            height: '22px',
            backgroundColor: '#FBFBFD',
            border: '1px solid #E2E5ED',
            color: '#3E3F42',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            marginLeft: 'auto',
          }}
          className="text-capitalize br text-small"
        >
          {sold}
        </div>
      ),
    },
  ];
  const [data, setData] = React.useState([
    {
      id: 1,
      'product-info': {
        image: 'https://products1.githubusercontent.com/u/6828924?s=40&v=4',
        name: 'Baby Blue Dress',
        price: 34,
      },
      salePrice: 12,
      totalCollected: 36,
      sold: 3,
    },
    {
      id: 2,
      'product-info': {
        image: 'https://products2.githubusercontent.com/u/6828924?s=40&v=4',
        name: 'Girls Big Ruffly',
        price: 36,
      },
      salePrice: 18,
      totalCollected: 18,
      sold: 1,
    },
    {
      id: 3,
      'product-info': {
        image: 'https://products3.githubusercontent.com/u/6828924?s=40&v=4',
        name: 'Girls’ Puffer Tee',
        price: 30,
      },
      salePrice: 15,
      totalCollected: 15,
      sold: 1,
    },
    {
      id: 4,
      'product-info': {
        image: 'https://products4.githubusercontent.com/u/6828924?s=40&v=4',
        name: 'Girls’ Collared Dress',
        price: 34,
      },
      salePrice: 17,
      totalCollected: 17,
      sold: 1,
    },
    {
      id: 5,
      'product-info': {
        image: 'https://products5.githubusercontent.com/u/6828924?s=40&v=4',
        name: 'Tween Legging',
        price: 32,
      },
      salePrice: 16,
      totalCollected: 16,
      sold: 1,
    },
    {
      id: 6,
      'product-info': {
        image: 'https://products6.githubusercontent.com/u/6828924?s=40&v=4',
        name: 'Start Fresh Dress',
        price: 48,
      },
      salePrice: 24,
      totalCollected: 0,
      sold: 0,
    },
    {
      id: 7,
      'product-info': {
        image: 'https://products7.githubusercontent.com/u/6828924?s=40&v=4',
        name: 'Seashell Shorts',
        price: 34,
      },
      salePrice: 17,
      totalCollected: 0,
      sold: 0,
    },
    {
      id: 8,
      'product-info': {
        image: 'https://products8.githubusercontent.com/u/6828924?s=40&v=4',
        name: 'Be Sweet Dress',
        price: 46,
      },
      salePrice: 23,
      totalCollected: 0,
      sold: 0,
    },
  ]);

  React.useEffect(() => {}, []);

  function onChange(pagination, filters, sorter, extra) {
    // console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <>
      <div className="card" style={{marginBottom: '1rem'}}>
        <div className="details_page-category-header d-flex items-center">
          <div className="details_page-category-header-mark bg-orange white d-inline-flex justify-center items-center">
            <TagIcon />
          </div>
          <span className="details_page-category-header-title avenir-roman gray-details">
            Products
          </span>
        </div>
        <div
          className="d-flex justify-between"
          style={{borderTop: 'solid 1px #EAEDF3'}}
        >
          <div className="details_page-category-item">
            <div className="caption">PRODUCTS LISTED</div>
            <div className="amount">11</div>
          </div>
          <div className="details_page-category-item">
            <div className="caption">ITEMS SOLD</div>
            <div className="amount">8</div>
          </div>
        </div>
      </div>

      <Table
        bordered={false}
        columns={columns}
        dataSource={data}
        onChange={onChange}
        rowKey="id"
        className="gray-details p-3"
      />
    </>
  );
};

export default Products;
