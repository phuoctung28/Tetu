import { Layout, Typography, Col, Row, Card, Statistic } from 'antd';
import { UserOutlined, FundOutlined, ArrowDownOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import CountUp from 'react-countup';
import MainHeader from '../../components/header/MainHeader';
import './dashboard.css';
import Sidebar from '../../components/sidebar/Sidebar';
import TableUser from '../../components/adminTable/TableUser';
import AdminSidebar from '../../components/adminSidebar/AdminSidebar';

const { Content } = Layout;
const { Title, Text } = Typography;

const Dashboard = ({ setIsDarkMode }) => {
    const formatter = (value) => <CountUp end={value} separator="," />;
    return (
        <Layout hasSider>
            <AdminSidebar selectedMenuItem="user" />
            <Layout className="site-layout" style={{ marginLeft: 200, }} >
                <MainHeader setIsDarkMode={setIsDarkMode} />
                <Content className="dashboard-content-ctn" >
                    <div className="dashboard-wrapper">
                        <Row gutter={20}>
                            <Col span={8}>
                                <Card bordered={false}>
                                    <Statistic
                                        // formatter={formatter}
                                        title="Revenue This Month"
                                        value={3567000}
                                        precision={0}
                                        valueStyle={{
                                            color: '#3f8600',
                                        }}
                                        prefix={<FundOutlined />}
                                        suffix="đ"
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false}>
                                    <Statistic
                                        formatter={formatter}
                                        title="Active Users"
                                        value={12}
                                        precision={0}
                                        valueStyle={{
                                            color: '#3f8600',
                                        }}
                                        prefix={<UserOutlined />}
                                    // suffix="%"
                                    />
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card bordered={false}>
                                    <Statistic
                                        title="Retention Rate"
                                        value={9.3}
                                        precision={2}
                                        valueStyle={{
                                            color: '#cf1322',
                                        }}
                                        prefix={<ArrowDownOutlined />}
                                        suffix="%"
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    <div className="table-user" >
                        <Card style={{ height: "100%" }} bordered={false}>
                            <TableUser />
                        </Card>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Dashboard;