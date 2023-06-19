import React from 'react';
import {Col, Row} from 'antd';
import {currency} from 'helpers/numbers';
import {ListIcon} from 'components/icons';

const CollectionSummary = props => {
  return (
    <>
      <div className="card" style={{marginBottom: '1rem'}}>
        <div className="details_page-category-header d-flex items-center">
          <div className="details_page-category-header-mark bg-teal white d-inline-flex justify-center items-center">
            <ListIcon />
          </div>
          <span className="details_page-category-header-title avenir-roman gray-details">
            Collection Summary
          </span>
        </div>
        <div
          className="d-flex justify-between"
          style={{borderTop: 'solid 1px #EAEDF3'}}
        >
          <div className="details_page-category-item">
            <div className="caption">TOTAL COLLECTED</div>
            <div className="amount">{currency(props.data?.payments_total)}</div>
          </div>
          <div className="details_page-category-item">
            <div className="caption">TOTAL BALANCE</div>
            <div className="amount">
              {currency(props.data?.withdrawal_balance_available)}
            </div>
          </div>
        </div>
      </div>
      <div className="card" style={{marginBottom: '22px'}}>
        <div style={{padding: '15px 0px 10px 24px'}}>
          <span className="fs-18 gray-details">Collected</span>
        </div>
        <div className="p-3" style={{borderTop: 'solid 1px #EAEDF3'}}>
          <Row style={{paddingBottom: '10px'}} className="text-regular">
            <Col span={8} className="gray-medium">
              Total Collected
            </Col>
            <Col span={16} className="gray-details">
              {currency(props.data?.payments_total)}
            </Col>
          </Row>
          <Row style={{paddingBottom: '10px'}}>
            <Col span={8} className="gray-medium">
              Cash or Check
            </Col>
            <Col span={16} className="gray-details">
              {currency(props.data?.offline_total)}
            </Col>
          </Row>
          <Row style={{paddingBottom: '10px'}}>
            <Col span={8} className="gray-medium">
              Past payouts
            </Col>
            <Col span={16} className="gray-details">
              {currency(props.data?.approved_withdrawals)}
            </Col>
          </Row>
          <Row style={{paddingBottom: '10px'}}>
            <Col span={8} className="gray-medium">
              Fees
            </Col>
            <Col span={16} className="gray-details">
              {currency(props.data?.total_user_fees)}
            </Col>
          </Row>
        </div>
      </div>
      <div className="card">
        <div style={{padding: '15px 0px 10px 24px'}}>
          <span className="fs-18 gray-details">Balance</span>
        </div>
        <div className="p-3" style={{borderTop: 'solid 1px #EAEDF3'}}>
          <Row style={{paddingBottom: '10px'}} className="text-regular">
            <Col span={8} className="gray-medium">
              Balance
            </Col>
            <Col span={16} className="gray-details">
              {currency(props.data?.withdrawal_balance_available)}
            </Col>
          </Row>
          <Row style={{paddingBottom: '10px'}}>
            <Col span={8} className="gray-medium">
              Available to Pay Out
            </Col>
            <Col span={16} className="gray-details">
              {currency(props.data?.withdrawal_balance_available)}
            </Col>
          </Row>
          <Row style={{paddingBottom: '10px'}}>
            <Col span={8} className="gray-medium">
              Available Soon
            </Col>
            <Col span={16} className="gray-details">
              {currency(props.data?.online_pending_total)}
            </Col>
          </Row>
          <Row style={{paddingBottom: '10px'}}>
            <Col span={8} className="gray-medium">
              In transit to bank ending in 3456
            </Col>
            <Col span={16} className="gray-details">
              {currency(props.data?.pending_withdrawals)}
            </Col>
          </Row>
          <Row>
            <Col span={8} className="gray-medium">
              Withdrawn Amount
            </Col>
            <Col span={16} className="gray-details">
              {currency(props.data?.approved_withdrawals)}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default CollectionSummary;
