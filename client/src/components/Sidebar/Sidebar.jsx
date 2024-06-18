import React, { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { DashboardOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Sider style={{ height: '100vh', backgroundColor: '#1890ff', padding: '10px' }}>
      <div className="logo" style={{ height: '32px', margin: '16px' }}>
        <Typography.Title level={4} style={{ color: 'white', fontWeight: 'bold', marginLeft: '10px', fontSize: '25px' }}>6Sense</Typography.Title>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[current]}
        onClick={handleClick}
        style={{ marginTop: '120px', backgroundColor: '#1890ff', color: 'white', borderRight: 0 }}
      >
        <Menu.Item key="/" icon={<DashboardOutlined style={{ color: 'black' }} />}>
          <Link to="/" style={{ color: 'black' }}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="/employees" icon={<UserOutlined style={{ color: 'black' }} />}>
          <Link to="/employees" style={{ color: 'black' }}>Employees</Link>
        </Menu.Item>
        <Menu.Item key="/settings" icon={<SettingOutlined style={{ color: 'black' }} />}>
          <Link to="/settings" style={{ color: 'black' }}>Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
