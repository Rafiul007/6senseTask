import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, Modal, Form, Table, Space, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Content } = Layout;

const Employee = () => {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();

    const API_URL = process.env.REACT_APP_API_URL;
    const EMPLOYEE_API = process.env.REACT_APP_EMPLOYEE_API;

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${API_URL}${EMPLOYEE_API}`);
            const employeesWithKeys = response.data.data.map(emp => ({ ...emp, key: emp._id }));
            setEmployees(employeesWithKeys);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const showAddEmployeeModal = () => {
        setIsAddModalVisible(true);
    };

    const showEditEmployeeModal = (employee) => {
        setSelectedEmployee(employee);
        editForm.setFieldsValue(employee);
        setIsEditModalVisible(true);
    };

    const handleCancel = () => {
        setIsAddModalVisible(false);
        setIsEditModalVisible(false);
        form.resetFields();
        editForm.resetFields();
    };

    const handleAddEmployee = async (values) => {
        try {
            const response = await axios.post(`${API_URL}${EMPLOYEE_API}`, values);
            const newEmployee = { ...values, key: response.data.id, _id: response.data.id };
            setEmployees([...employees, newEmployee]);
            setIsAddModalVisible(false);
            form.resetFields();
            message.success('Employee added successfully');
        } catch (error) {
            console.error('Error adding employee:', error);
            message.error('Failed to add employee');
        }
    };

    const handleEditEmployee = async (values) => {
        try {
            await axios.put(`${API_URL}${EMPLOYEE_API}/${selectedEmployee._id}`, values);
            const updatedEmployees = employees.map(emp => 
                emp._id === selectedEmployee._id ? { ...values, _id: selectedEmployee._id, key: selectedEmployee._id } : emp
            );
            setEmployees(updatedEmployees);
            setIsEditModalVisible(false);
            editForm.resetFields();
            message.success('Employee updated successfully');
        } catch (error) {
            console.error('Error updating employee:', error);
            message.error('Failed to update employee');
        }
    };

    const handleDeleteEmployee = async (id) => {
        try {
            await axios.delete(`${API_URL}${EMPLOYEE_API}/${id}`);
            const updatedEmployees = employees.filter(emp => emp._id !== id);
            setEmployees(updatedEmployees);
            message.success('Employee deleted successfully');
        } catch (error) {
            console.error('Error deleting employee:', error);
            message.error('Failed to delete employee');
        }
    };

    const handleToggleBlock = async (id) => {
        try {
            const employeeToUpdate = employees.find(emp => emp._id === id);
            const updatedEmployee = { ...employeeToUpdate, block: !employeeToUpdate.block };
            await axios.patch(`${API_URL}${EMPLOYEE_API}/block/${id}`, { block: updatedEmployee.block });
            const updatedEmployees = employees.map(emp =>
                emp._id === id ? { ...emp, block: !emp.block } : emp
            );
            setEmployees(updatedEmployees);
            message.success(`Employee ${updatedEmployee.block ? 'blocked' : 'unblocked'} successfully`);
        } catch (error) {
            console.error(`Error toggling block status for employee ${id}:`, error);
            message.error('Failed to toggle block status');
        }
    };

    const renderColumnText = (text, record) => (
        <span style={{ color: record.block ? 'red' : 'inherit', textDecoration: record.block ? 'line-through' : 'none' }}>
            {text}
        </span>
    );

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            render: renderColumnText,
        },
        {
            title: 'First Name',
            dataIndex: 'firstname',
            key: 'firstname',
            render: renderColumnText,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastname',
            key: 'lastname',
            render: renderColumnText,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: renderColumnText,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: renderColumnText,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" icon={<EditOutlined />} onClick={() => showEditEmployeeModal(record)}></Button>
                    <Button danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteEmployee(record._id)}
                    ></Button>
                    <Button
                        type='text'
                        icon={<StopOutlined />}
                        onClick={() => handleToggleBlock(record._id)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <Layout style={{ padding: '24px' }}>
            <Content>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <Input
                        placeholder="Search Employee"
                        prefix={<SearchOutlined />}
                        style={{ maxWidth: '300px' }}
                    />
                    <Button type="primary" icon={<PlusOutlined />} onClick={showAddEmployeeModal}>
                        Add Employee
                    </Button>
                </div>

                <Table columns={columns} dataSource={employees} pagination={{ pageSize: 10 }} />

                <Modal
                    title="Add Employee"
                    visible={isAddModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form form={form} layout="vertical" onFinish={handleAddEmployee}>
                        <Form.Item
                            name="firstname"
                            label="First Name"
                            rules={[{ required: true, message: 'Please input the first name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="lastname"
                            label="Last Name"
                            rules={[{ required: true, message: 'Please input the last name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Please input the email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                        >
                            <Input  />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[{ required: true, message: 'Please input the phone number!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Add
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal
                    title="Edit Employee"
                    visible={isEditModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form form={editForm} layout="vertical" onFinish={handleEditEmployee}>
                        <Form.Item
                            name="firstname"
                            label="First Name"
                            rules={[{ required: true, message: 'Please input the first name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="lastname"
                            label="Last Name"
                            rules={[{ required: true, message: 'Please input the last name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Please input the email!' },
                                { type: 'email', message: 'Please enter a valid email!' }
                            ]}
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[{ required: true, message: 'Please input the phone number!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default Employee;
