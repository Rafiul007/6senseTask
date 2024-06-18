import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
import Employee from './pages/Employee';
// import Settings from './pages/Settings';
import './App.css';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Content style={{ padding: '24px', backgroundColor: '#fff' }}>
            <Routes>
            <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<Employee />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
