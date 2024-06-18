// Dashboard.jsx

import React from 'react';
import { Layout, Card, Row, Col, Statistic, Divider, Typography } from 'antd';
import {
  TeamOutlined,
  UserOutlined,
  BarChartOutlined,
  LineChartOutlined,
} from '@ant-design/icons';

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  return (
    <Content style={{ padding: '24px', backgroundColor: '#fff' }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 360 }}>
        <Row gutter={16}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Employees"
                value={1500}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Total Departments"
                value={20}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Revenue"
                value={2000000}
                prefix="$"
                suffix="USD"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Active Users"
                value={5000}
                prefix={<LineChartOutlined />}
              />
            </Card>
          </Col>
        </Row>
        <Divider style={{ margin: '24px 0' }} />
        <Title level={3}>Sales Overview</Title>
        {/* Add more components such as charts, tables, etc. */}
      </div>
    </Content>
  );
};

export default Dashboard;
