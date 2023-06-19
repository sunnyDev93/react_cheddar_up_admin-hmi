import React from 'react';
import {Link} from 'react-router-dom';

import {Avatar, Badge, Dropdown} from 'antd';

import {CaretUpOutlined, CaretDownOutlined} from '@ant-design/icons';

import {AccountIcon} from 'components/icons';
import {AccountOverlay} from './components';
import ImagesUtils from 'services/image.service';

const TopNavRight = ({user, isAdmin}) => {
  const imageUrl = user
    ? ImagesUtils.getImageUrl(user['EnhancedUsers.profilePicturePath'])
    : null;

  return (
    <div className="top-nav-right">
      {user && (
        <Dropdown
          key="account"
          placement="bottomRight"
          trigger={['click']}
          overlay={
            <AccountOverlay
              name={user['EnhancedUsers.name']}
              isAdmin={isAdmin}
            />
          }
        >
          {imageUrl ? (
            <Avatar size="large" src={imageUrl} />
          ) : (
            <AccountIcon
              className="gray-medium"
              style={{
                fontSize: '1rem',
                verticalAlign: 'middle',
                margin: '0 1rem',
              }}
            />
          )}
        </Dropdown>
      )}
      <span
        className="gray-medium"
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          verticalAlign: 'middle',
        }}
      >
        <CaretUpOutlined style={{fontSize: 10}} />
        <CaretDownOutlined style={{fontSize: 10}} />
      </span>
      <style jsx>{`
        .top-nav-right {
          text-align: right;
        }

        .divider {
          display: inline-block;
          vertical-align: middle;
          width: 0;
          height: 36px;
          border-right: 1px solid #eaedf3;
          margin: 0 1.5rem;
        }
      `}</style>
    </div>
  );
};

const EnhancedTopNavRight = React.memo(TopNavRight);

export default EnhancedTopNavRight;
