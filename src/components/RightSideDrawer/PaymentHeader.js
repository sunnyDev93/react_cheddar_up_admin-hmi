import React, {useState} from 'react';
import {currency} from 'helpers/numbers';
import {Button} from 'antd';

const PaymentHeader = props => {
  const {paymentData} = props;

  return (
    <>
      <div
        className="d-flex br bg-white"
        style={{
          alignItems: 'center',
          border: 'solid 1px #EAEDF3',
          marginTop: '2.5rem',
        }}
      >
        <div
          style={{
            fontSize: '26px',
            lineHeight: '60px',
            padding: '0.5rem 2rem 0.5rem 1rem',
          }}
        >
          Payment: {currency(paymentData?.total)}
        </div>
        <Button
          size="small"
          style={{
            fontSize: '12px',
            lineHeight: '18px',
            backgroundColor: '#B0DFE5',
            borderColor: '#E2E5ED',
            color: '#3E3F42',
            width: '67px',
          }}
          className="avenir-meium text-capitalize br btn__disable"
        >
          {paymentData?.status}
        </Button>
      </div>
    </>
  );
};

export default PaymentHeader;
