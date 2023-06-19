import React from 'react';
import Icon from '@ant-design/icons';

const GearSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    focusable="false"
    data-icon="gear"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M13.3,5.2l1.1-2.1L13,1.7,10.9,2.8a3.54,3.54,0,0,0-1.1-.4L9,0H7L6.2,2.3a4,4,0,0,0-1,.4L3.1,1.6,1.6,3.1,2.7,5.2a4,4,0,0,0-.4,1L0,7V9l2.3.8c.1.4.3.7.4,1.1L1.6,13,3,14.4l2.1-1.1a3.54,3.54,0,0,0,1.1.4L7,16H9l.8-2.3c.4-.1.7-.3,1.1-.4L13,14.4,14.4,13l-1.1-2.1a3.54,3.54,0,0,0,.4-1.1L16,9V7l-2.3-.8A4,4,0,0,0,13.3,5.2ZM8,11A2.94,2.94,0,0,1,5,8.11V8A2.94,2.94,0,0,1,7.89,5H8a2.94,2.94,0,0,1,3,2.89V8a2.94,2.94,0,0,1-2.89,3Z" />
  </svg>
);

const GearIcon = props => <Icon component={GearSvg} {...props} />;

export default GearIcon;
