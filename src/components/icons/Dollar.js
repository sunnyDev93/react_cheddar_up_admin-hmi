import React from 'react';
import Icon from '@ant-design/icons';

const DollarSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="18.856"
    viewBox="0 0 11 18.856"
    focusable="false"
    data-icon="tag"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M31,30.964h0a4.343,4.343,0,0,0-4.714-4.321v-5.5h1.571a1.571,1.571,0,0,1,1.571,1.571H31a3.143,3.143,0,0,0-3.143-3.143H26.285V18H24.714v1.571A4.347,4.347,0,0,0,20,23.893h0a4.343,4.343,0,0,0,4.714,4.321v5.5H23.143a1.571,1.571,0,0,1-1.571-1.571H20a3.143,3.143,0,0,0,3.143,3.143h1.571v1.571h1.571V35.285A4.347,4.347,0,0,0,31,30.964Zm-1.571,0h0c0,1.421-1,2.75-3.143,2.75v-5.5C28.376,28.214,29.428,29.494,29.428,30.964Zm-4.714-4.321c-2.091,0-3.143-1.28-3.143-2.75h0c0-1.421,1-2.75,3.143-2.75Z"
      transform="translate(-20 -18)"
    />
  </svg>
);

const DollarIcon = props => <Icon component={DollarSvg} {...props} />;

export default DollarIcon;
