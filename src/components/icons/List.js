import React from 'react';
import Icon from '@ant-design/icons';

const ListSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    focusable="false"
    data-icon="page"
    width="20"
    height="20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M40,31H28V29H40Zm0-9H28v2H40Zm0,14H28v2H40ZM23,29a1,1,0,1,0,1,1,1,1,0,0,0-1-1m0-2a3,3,0,1,1-3,3,3,3,0,0,1,3-3Zm0-5a1,1,0,1,0,1,1,1,1,0,0,0-1-1m0-2a3,3,0,1,1-3,3,3,3,0,0,1,3-3Zm0,16a1,1,0,1,0,1,1,1,1,0,0,0-1-1m0-2a3,3,0,1,1-3,3,3,3,0,0,1,3-3Z"
      transform="translate(-20 -20)"
      fill="#fff"
    />
  </svg>
);

const ListIcon = props => <Icon component={ListSvg} {...props} />;

export default ListIcon;
