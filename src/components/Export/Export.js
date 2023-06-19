import React from 'react';
import {Col, Row, Button, Input, Checkbox, Radio} from 'antd';

const Export = props => {
  const {title, exportItems} = props;

  return (
    <>
      <div className="export avenir-roman">
        <div className="export-title fs-18 ">Export {title}</div>
        <div className="export-body">
          <div className="date-range">
            <div className="avenir-medium sub-title">Date Range</div>
            <div className="radio-container">
              {exportItems.date_range.map((item, idx) => {
                if (item.placeholder)
                  return (
                    <Row key="input_">
                      <Input
                        className="gray-secondary"
                        size="large"
                        placeholder={item.placeholder}
                        // key={`export_input_${item.key}`}
                        style={{
                          verticalAlign: 'middle',
                          marginLeft: '25px',
                          width: '208px',
                        }}
                      />
                    </Row>
                  );
                return (
                  <Row
                    style={{marginBottom: '17px'}}
                    key={`export_date_range_${idx}`}
                  >
                    <Col span={12}>
                      <Radio
                      // key={`export_date_range_radio_${item.key}`}
                      >
                        {item.name}
                      </Radio>
                    </Col>
                    <Col span={12} className="gray-secondary">
                      {item.text}
                    </Col>
                  </Row>
                );
              })}
            </div>
          </div>
          <div className="columns">
            <div
              className="avenir-medium sub-title"
              style={{paddingTop: '30px'}}
            >
              Columns
            </div>
            <div className="check-container">
              <Row>
                {exportItems.Columns.map((item, idx) => {
                  if (item.name == '')
                    return (
                      <Col
                        span={title == 'Payers' || title == 'Products' ? 12 : 8}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        // key={`export_column_${idx}`}
                      ></Col>
                    );
                  return (
                    <Col
                      span={title == 'Payers' || title == 'Products' ? 12 : 8}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                      // key={`export_column_${idx}`}
                    >
                      <Checkbox
                        style={{
                          fontSize: '14px',
                          color: '#414142',
                          marginBottom: '15px',
                        }}
                        // key={`export_column_check_${idx}`}
                      >
                        {item.name}
                      </Checkbox>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </div>
        </div>
        <div className="export-footer d-flex items-center">
          <Button
            style={{
              fontSize: '14px',
              backgroundColor: '#257A91',
              borderColor: '#D8DCE6',
              color: '#fff',
              width: '71px',
              marginRight: '32px',
            }}
            className="avenir-meium text-capitalize br"
          >
            Export
          </Button>
          <Button
            style={{
              fontSize: '14px',
              borderColor: '#D8DCE6',
              color: '#414142',
              width: '71px',
              marginRight: '19px',
            }}
            className="avenir-meium text-capitalize br"
          >
            Cancel
          </Button>
        </div>
      </div>

      <style jsx="true">{`
        .export {
          background-color: #fff;
          width: 599px;
          box-shadow: 0px 3px 6px;
        }
        .export .export-title {
          padding: 24px 0px 22px 29.4px;
          border-bottom: solid 1px #eaedf3;
        }
        .export .export-body {
          padding: 17.9px 0px 20px 29.4px;
          border-top: solid 1px #eaedf3;
          border-bottom: solid 1px #eaedf3;
        }
        .export .export-body .sub-title {
          padding-bottom: 19px;
          font-size: 16px;
        }
        .radio-container {
          display: flex;
          flex-direction: column;
        }
        .radio-container > div {
          margin-bottom: 16px;
        }
        .export .export-footer {
          height: 76px;
          flex-direction: row-reverse;
        }
      `}</style>
    </>
  );
};

export default Export;
