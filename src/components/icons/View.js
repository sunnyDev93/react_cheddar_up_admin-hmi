import React from 'react';
import Icon from '@ant-design/icons';

const ViewSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 11.559"
    focusable="false"
    data-icon="page"
    width="20"
    height="11.559"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M-210,900a11.544,11.544,0,0,0-10,5.78,11.545,11.545,0,0,0,10,5.779,11.545,11.545,0,0,0,10-5.779A11.544,11.544,0,0,0-210,900Zm0,9.559a9.591,9.591,0,0,1-7.6-3.779A9.588,9.588,0,0,1-210,902a9.588,9.588,0,0,1,7.6,3.78A9.591,9.591,0,0,1-210,909.559Zm2-3.779a2,2,0,0,1-2,2,2,2,0,0,1-2-2,2,2,0,0,1,2-2A2,2,0,0,1-208,905.78Z"
      transform="translate(220 -900)"
    />
  </svg>
);

const ViewIcon = props => <Icon component={ViewSvg} {...props} />;

export default ViewIcon;
