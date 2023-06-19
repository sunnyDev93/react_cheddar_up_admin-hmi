import React from 'react';
import {currency} from 'helpers/numbers';
import {Row, Col} from 'antd';
import * as moment from 'moment';

const CustomerPaymentDetails = props => {
  const {data} = props;
  const {paymentData} = props;

  return (
    <>
      <div
        style={{border: 'solid 1px #EAEDF3', marginTop: '1.5rem'}}
        className="bg-white"
      >
        <div
          className="fs-18 avenir-roman gray-thick p-3"
          style={{
            borderBottom: 'solid 2px #EAEDF3',
          }}
        >
          Payment Details
        </div>

        <div className="p-3 avenir-roman gray-secondary">
          <div
            className="text-regular"
            style={{
              borderBottom: 'solid 2px #EAEDF3',
              paddingBottom: '1rem',
            }}
          >
            <Row>
              <Col span={10}>Collection Page</Col>
              <Col span={12} className="gray-details">
                {paymentData?.collection?.name}
              </Col>
            </Row>
            <Row>
              <Col span={10}>Payer</Col>
              <Col span={12} className="gray-details">
                {paymentData?.organizer?.name}
              </Col>
            </Row>
            <Row>
              <Col span={10}>Payment Date</Col>
              <Col span={12} className="gray-details">
                {moment(paymentData?.date).format('MMM DD, YYYY')}
              </Col>
            </Row>
            <Row>
              <Col span={10}>Method</Col>
              <Col span={12} className="gray-details">
                {data?.metadata_exposed?.source?.brand} ending in{' '}
                {data?.metadata_exposed?.source?.exp_year}
              </Col>
            </Row>
          </div>
          <div
            className="text-regular"
            style={{
              borderBottom: 'solid 2px #EAEDF3',
              paddingBottom: '1rem',
              paddingTop: '1rem',
            }}
          >
            <Row>
              <Col span={10}>Subtotal</Col>
              <Col span={12} className="gray-details">
                {currency(data?.subtotal)}
              </Col>
            </Row>
            <Row>
              <Col span={10}>Shipping</Col>
              <Col span={12} className="gray-details">
                {currency(data?.shipping_charge)}
              </Col>
            </Row>
            <Row>
              <Col span={10}>Fees</Col>
              <Col span={12} className="gray-details">
                {currency(data?.user_fee)}
              </Col>
            </Row>
          </div>
          <div style={{paddingTop: '1rem'}}>
            <Row>
              <Col span={10}>Total Payment</Col>
              <Col className="gray-details">
                {currency(
                  data?.subtotal + data?.shipping_charge + data?.user_fee
                )}
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerPaymentDetails;
