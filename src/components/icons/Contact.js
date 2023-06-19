import React from 'react';
import Icon from '@ant-design/icons';

const ContactSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    focusable="false"
    data-icon="contact"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M13.7.3A1,1,0,0,1,14,1V15a1,1,0,0,1-1,1H1a1,1,0,0,1-.7-.3A1,1,0,0,1,0,15V1A1,1,0,0,1,.3.3,1,1,0,0,1,1,0H13A1,1,0,0,1,13.7.3ZM1,15H3V1H1ZM13,1H4V15h9Zm-2.06,9.81c0,.59-.41,1-1.24,1.22a4.51,4.51,0,0,1-2.47,0C6.41,11.8,6,11.4,6,10.81a3.84,3.84,0,0,1,.72-2.34,2.06,2.06,0,0,1,3.5,0,3.84,3.84,0,0,1,.72,2.34Zm-2.5-7A1.55,1.55,0,0,1,10,5.38a1.47,1.47,0,0,1-.45,1.06,1.56,1.56,0,0,1-1.08.44,1.48,1.48,0,0,1-1.06-.44,1.44,1.44,0,0,1-.44-1.06V4.75l.44-.45a1.41,1.41,0,0,1,1.06-.46ZM15,4h1V1H15Zm0,4h1V5H15Zm0,4h1V9H15Z" />
  </svg>
);

const ContactIcon = props => <Icon component={ContactSvg} {...props} />;

export default ContactIcon;
