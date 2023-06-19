import React from 'react';
import Icon from '@ant-design/icons';

const LifeRingSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    focusable="false"
    data-icon="support"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M8,0a8,8,0,1,0,8,8A8,8,0,0,0,8,0ZM8,10a2,2,0,1,1,2-2A2,2,0,0,1,8,10ZM8,2a5.87,5.87,0,0,1,2.6.6L9,4.16A3.55,3.55,0,0,0,7,4.16L5.4,2.6A5.87,5.87,0,0,1,8,2ZM2,8a5.87,5.87,0,0,1,.6-2.6L4.16,7a3.55,3.55,0,0,0,0,2.09L2.6,10.6A5.87,5.87,0,0,1,2,8Zm6,6a5.87,5.87,0,0,1-2.6-.6L7,11.84a3.55,3.55,0,0,0,2.09,0L10.6,13.4A5.87,5.87,0,0,1,8,14Zm5.4-3.4L11.84,9a3.55,3.55,0,0,0,0-2.09L13.4,5.4A5.93,5.93,0,0,1,13.4,10.6Z" />
  </svg>
);

const LifeRingIcon = props => <Icon component={LifeRingSvg} {...props} />;

export default LifeRingIcon;
