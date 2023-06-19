import React, {useState} from 'react';
import {Row, Col} from 'antd';
import {PhoneIcon, AddressIcon} from 'components/icons';

const ShippingInformation = props => {
  return (
    <>
      <div
        className="p-3 avenir-roman gray-secondary bg-white"
        style={{border: 'solid 1px #EAEDF3'}}
      >
        <div className="text-small " style={{paddingBottom: '1.5rem'}}>
          SHIPPING INFORMATION
        </div>
        <div className="text-regular">
          <Row>
            <Col span={2}>
              <AddressIcon />
            </Col>
            <Col span={22} className="gray-details">
              {props.data?.full_name}
              <br />
              {props.data?.personal_address?.city}
              <br />
              {props.data?.personal_address?.state}
              <br />
              {props.data?.personal_address?.country}
            </Col>
          </Row>
          <Row>
            <Col span={2}>
              <PhoneIcon />
            </Col>
            <Col span={22} className="gray-details">
              {props.data?.profile?.phone?.phoneNumber}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ShippingInformation;
