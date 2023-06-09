import React from 'react'
import { Layout, Switch } from 'antd';
import './pricing_page.css'
import PricingPlan from './PricingPlan';
import Sidebar from '../../components/sidebar/Sidebar';
import MainHeader from '../../components/header/MainHeader';

const { Content } = Layout;

function PricingPage({ setIsDarkMode }) {
    return (
        <Layout hasSider>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: 200, }} >
                <MainHeader setIsDarkMode={setIsDarkMode} />
                <Content style={{ margin: '0', overflow: 'initial', }} >
                    <PricingPlan />
                </Content>
            </Layout>
        </Layout>
    )
}

export default PricingPage