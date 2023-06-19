import React from 'react';
import Icon from '@ant-design/icons';

const SettingsSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    focusable="false"
    data-icon="settings"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M4,0H2V14H0v2H2v4H4V16H6V14H4V0m7,0H9V9H7v2H9v9h2V11h2V9H11V0m7,0H16V4H14V6h2V20h2V6h2V4H18V0" />
  </svg>
);

const SettingsIcon = props => <Icon component={SettingsSvg} {...props} />;

export default SettingsIcon;
