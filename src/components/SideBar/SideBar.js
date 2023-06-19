import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Layout, Menu} from 'antd';
import Icon, {StarFilled} from '@ant-design/icons';
import {
  ContactIcon,
  GearIcon,
  HomeIcon,
  LifeRingIcon,
  PinIcon,
  TagIcon,
} from 'components/icons';
const {Sider} = Layout;

const SideBar = ({history, match, location}) => {
  const menu = [
    // {
    //   key: 'dashboard',
    //   link: '/dashboard',
    //   icon: HomeIcon,
    //   text: 'Home',
    // },
    {
      key: 'distributors',
      link: '/dashboard/distributors',
      icon: StarFilled,
      text: 'Collectors',
    },
    {
      key: 'sales-pages',
      link: '/dashboard/sales-pages',
      icon: PinIcon,
      text: 'Collection Pages',
    },
    // {
    //   key: 'products',
    //   link: '/dashboard/products',
    //   icon: TagIcon,
    //   text: 'Products',
    // },
    {
      key: 'customers',
      link: '/dashboard/customers',
      icon: ContactIcon,
      text: 'Payers',
    },
    {
      divider: true,
    },
    // {
    //   key: 'settings',
    //   link: '/dashboard/settings',
    //   icon: GearIcon,
    //   text: 'Settings',
    // },
    // {
    //   key: 'support',
    //   link: '/dashboard/support',
    //   icon: LifeRingIcon,
    //   text: 'Support',
    // },
  ];

  const selectedKeys = [
    (menu.find(item => item.link === location.pathname) || {}).key,
  ];

  return (
    <Sider width={270}>
      <Menu mode="inline" selectedKeys={selectedKeys}>
        {menu.map((item, idx) => {
          const IconComponent = item.icon;

          if (item.divider)
            return <Menu.Divider key={idx} style={{margin: '2rem 0'}} />;

          return (
            <Menu.Item
              className="d-flex items-center"
              key={item.key}
              onClick={() => {
                history.push(item.link);
              }}
            >
              <IconComponent />
              <span className="nav-text" style={{marginTop: '6px'}}>
                {item.text}
              </span>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  );
};

const EnhancedSideBar = withRouter(SideBar);

export default EnhancedSideBar;
