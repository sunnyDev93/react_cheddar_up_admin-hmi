import React from 'react';
import Icon from '@ant-design/icons';

const HomeSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    focusable="false"
    data-icon="home"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M15.58,5.19l-7-5a1,1,0,0,0-1.16,0l-7,5A1,1,0,1,0,1.58,6.81h0L2,6.52V15a1,1,0,0,0,1,1H13a1,1,0,0,0,1-1V6.52A1.71,1.71,0,0,0,15,7a1,1,0,0,0,1-1,1,1,0,0,0-.42-.81ZM12,14H10V11a2,2,0,0,0-4,0v3H4V5.09L8,2.23l4,2.86Z" />
  </svg>
);

const HomeIcon = props => <Icon component={HomeSvg} {...props} />;

export default HomeIcon;
