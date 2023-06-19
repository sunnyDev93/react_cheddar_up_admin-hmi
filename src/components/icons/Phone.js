import React from 'react';
import Icon from '@ant-design/icons';

const PhoneSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12.001"
    height="20.001"
    viewBox="0 0 12.001 20.001"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M1066,284h-8a2,2,0,0,1-2-2V266a2,2,0,0,1,2-2h8a2,2,0,0,1,2,2v16A2,2,0,0,1,1066,284Zm-7-18a1,1,0,0,0-1,1v14a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V267a1,1,0,0,0-1-1Zm3.02,14a1,1,0,1,1,1-1A1,1,0,0,1,1062.021,280Z"
      transform="translate(-1056 -264)"
    />
  </svg>
);

const PhoneIcon = props => <Icon component={PhoneSvg} {...props} />;

export default PhoneIcon;
