import React from 'react';
import {Avatar} from 'antd';
import {Link} from 'react-router-dom';

import {AccountIcon} from '../icons';

const CustomerContainer = props => {
  return (
    <>
      <div style={{border: 'solid 1px #EAEDF3', marginTop: '1.5rem'}}>
        <div
          className="fs-18 avenir-roman gray-thick p-3 bg-white"
          style={{
            paddingLeft: '28px',
          }}
        >
          Payer
        </div>
        <div
          className="d-flex justify-between bg-white"
          style={{
            borderTop: 'solid 2px #EAEDF3',
            borderBottom: 'solid 1px #EAEDF3',
            padding: '1rem 0.5rem',
            alignItems: 'baseline',
          }}
        >
          <div className="d-flex items-center">
            <div>
              {props?.image ? (
                <Avatar size="large" src={props.image} />
              ) : (
                <AccountIcon
                  className="gray-medium"
                  style={{
                    fontSize: '1rem',
                    verticalAlign: 'middle',
                    margin: '0 1rem',
                  }}
                />
              )}
            </div>
            <div>
              <div className="avenir-roman text-regular gray-details">
                {props?.userName}
              </div>
            </div>
          </div>
          {props.email && (
            <div className="avenir-roman text-regular gray-medium">
              <Link
                className="text-regular"
                to={`/dashboard/customers/${props.email}`}
              >
                view Details
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerContainer;
