import React from 'react';
import Icon from '@ant-design/icons';

const TagSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12.99 15.99"
    focusable="false"
    data-icon="tag"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.87.13A.52.52,0,0,1,13,.49V8.8a.72.72,0,0,1-.31.53L6.34,15.71a1,1,0,0,1-.7.28,1,1,0,0,1-.7-.28L.28,11.05a1,1,0,0,1-.28-.7,1,1,0,0,1,.28-.7l.78-.78L.28,8.06A1,1,0,0,1,0,7.36a.94.94,0,0,1,.28-.7L6.66.28A.77.77,0,0,1,7.19,0h5.34A.43.43,0,0,1,12.87.13ZM12,8.61V7.05L6.34,12.71a.93.93,0,0,1-.7.28.92.92,0,0,1-.7-.28L1.78,9.55,1,10.37,5.63,15,12,8.65ZM11,1.47a.49.49,0,0,0,.15.36.44.44,0,0,0,.35.16.45.45,0,0,0,.36-.16A.48.48,0,0,0,12,1.47a.41.41,0,0,0-.14-.34A.43.43,0,0,0,11.49,1a.43.43,0,0,0-.35.14A.45.45,0,0,0,11,1.47Z" />
  </svg>
);

const TagIcon = props => <Icon component={TagSvg} {...props} />;

export default TagIcon;
