import React from 'react';
import Icon from '@ant-design/icons';

const AccountSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.815em"
    height="1.815em"
    viewBox="0 0 29.04 29.04"
    focusable="false"
    data-icon="account"
    fill="currentColor"
    aria-hidden="true"
  >
    <g>
      <path d="M14.52,15.24A5.31,5.31,0,1,0,9.21,9.93h0A5.31,5.31,0,0,0,14.52,15.24Z" />
      <path d="M14.52,0A14.52,14.52,0,1,0,29,14.52h0A14.52,14.52,0,0,0,14.52,0Zm0,1.45a13.06,13.06,0,0,1,10.41,21,7.51,7.51,0,0,0-7.35-5.95H11.46a7.51,7.51,0,0,0-7.35,5.95A13.07,13.07,0,0,1,14.52,1.46Z" />
    </g>
  </svg>
);

const AccountIcon = props => <Icon component={AccountSvg} {...props} />;

export default AccountIcon;
