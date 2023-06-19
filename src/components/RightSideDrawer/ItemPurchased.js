import React from 'react';
import {currency} from 'helpers/numbers';
import {ReactComponent as TagIcon} from '../../theme/images/tag.svg';

const ItemPurchased = props => {
  const itemsPurchased = props?.data?.payment_items;

  const renderItemPurchased = () => {
    return (
      itemsPurchased &&
      itemsPurchased.map((purchasedItem, id) => (
        <div
          className="d-flex bg-white"
          style={{padding: '1rem'}}
          key={purchasedItem.id}
        >
          <div className="d-flex items-center" style={{width: '70%'}}>
            <div style={{marginRight: '19px'}}>
              <TagIcon fill="grey" style={{width: '30px', height: '30px'}} />
            </div>
            <div>
              <div className="avenir-roman text-regular">
                {purchasedItem?.tab_item?.name}
              </div>{' '}
              <div className="avenir-roman text-small gray-secondary">
                {purchasedItem?.tab_item?.amount_type} Price:{' '}
                {currency(purchasedItem?.tab_item?.amount)}
              </div>
            </div>
          </div>
          <div className="d-flex items-center" style={{width: '10%'}}>
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
              }}
              className="text-capitalize br text-small"
            >
              {purchasedItem?.quantity}
            </div>
          </div>
          <div
            className="d-flex items-center"
            style={{width: '20%', justifyContent: 'flex-end'}}
          >
            {currency(purchasedItem?.total)}
          </div>
        </div>
      ))
    );
  };

  const itemCounts = itemsPurchased?.length || 0;

  return (
    <>
      <div
        className="bg-white avenir-roman"
        style={{border: 'solid 1px #EAEDF3', marginTop: '1.5rem'}}
      >
        <div
          className="fs-18 gray-thick p-3"
          style={{
            borderBottom: 'solid 2px #EAEDF3',
          }}
        >
          Items Purchased: {itemCounts}
        </div>
        <div>{renderItemPurchased(itemsPurchased)}</div>
      </div>
    </>
  );
};

export default ItemPurchased;
