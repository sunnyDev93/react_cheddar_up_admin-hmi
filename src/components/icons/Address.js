import React from 'react';
import Icon from '@ant-design/icons';

const AddressSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="20.001"
    viewBox="0 0 14 20.001"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M1250,284a3.818,3.818,0,0,1-2.725-1.488,14.048,14.048,0,0,1-2.225-3.563A22.06,22.06,0,0,1,1243,271a7,7,0,1,1,14,0,22.061,22.061,0,0,1-2.05,7.95,14.047,14.047,0,0,1-2.225,3.563A3.818,3.818,0,0,1,1250,284Zm0-18a5.006,5.006,0,0,0-5,5c0,4.009,3.178,11,5,11s5-6.991,5-11A5.006,5.006,0,0,0,1250,266Zm0,7.22a2,2,0,1,1,2-2A2,2,0,0,1,1250,273.219Z"
      transform="translate(-1243 -264)"
    />
  </svg>
);

const AddressIcon = props => <Icon component={AddressSvg} {...props} />;

export default AddressIcon;
