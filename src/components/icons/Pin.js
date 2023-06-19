import React from 'react';
import Icon from '@ant-design/icons';

const PinSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 11.94 15.81"
    focusable="false"
    data-icon="page"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M1.94,2.72A1.42,1.42,0,0,0,1.5,3.78a1.4,1.4,0,0,0,.44,1.06l5.37,5.38a2.77,2.77,0,0,1-2.87-.78L.91,5.91A2.83,2.83,0,0,1,0,3.8,2.88,2.88,0,0,1,.91,1.66L1.69.88A2.88,2.88,0,0,1,3.81,0,2.9,2.9,0,0,1,5.94.88L9.47,4.41a2.78,2.78,0,0,1,.75,2.9L4.88,1.94A1.44,1.44,0,0,0,3.81,1.5a1.42,1.42,0,0,0-1.06.44Zm.53,8.69A2.8,2.8,0,0,1,1.72,8.5l5.34,5.38a1.52,1.52,0,0,0,2.13,0l.81-.78A1.5,1.5,0,0,0,10,11L4.62,5.59a2.8,2.8,0,0,1,2.88.78L11,9.9A2.83,2.83,0,0,1,11.94,12,3,3,0,0,1,11,14.15l-.78.79a2.93,2.93,0,0,1-2.13.87A2.91,2.91,0,0,1,6,14.94Z" />
  </svg>
);

const PinIcon = props => <Icon component={PinSvg} {...props} />;

export default PinIcon;
