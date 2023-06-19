import React from 'react';
import Icon from '@ant-design/icons';

const DownloadSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    focusable="false"
    data-icon="download"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      id="arrow_in_down"
      d="M20,18.22c0,1-.68,1.78-2.11,1.78H1.78A1.78,1.78,0,0,1,0,18.22H0V11.78A1.78,1.78,0,0,1,1.78,10H3a1,1,0,0,1,1,1v0a1,1,0,0,1-1,1H3a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1H17a1,1,0,0,0,1-1V13a1,1,0,0,0-1-1h0a1,1,0,0,1-1-1v0a1,1,0,0,1,1-1h1.23A1.78,1.78,0,0,1,20,11.78h0v6.44ZM14.27,6.67h0a1,1,0,0,0-1.4,0h0l-1,1a.5.5,0,0,1-.71,0A.52.52,0,0,1,11,7.21V1a1,1,0,0,0-1-1h0A1,1,0,0,0,9,1V7.2a.5.5,0,0,1-.5.5.48.48,0,0,1-.34-.14l-1-.93a1,1,0,0,0-1.4,0h0a1,1,0,0,0,.05,1.4l2.85,2.69a2,2,0,0,0,2.75,0l2.81-2.69A1,1,0,0,0,14.27,6.67Z"
    />
  </svg>
);

const DownloadIcon = props => <Icon component={DownloadSvg} {...props} />;

export default DownloadIcon;
