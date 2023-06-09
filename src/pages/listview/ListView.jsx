import React from 'react';
import { Layout, } from 'antd';
import MainHeader from '../../components/header/MainHeader';
import './list_view.css';
import TableView from '../../components/table/TableView';
import Sidebar from '../../components/sidebar/Sidebar';
import { useEffect } from 'react';

const { Content } = Layout;

const ListView = ({ setIsDarkMode }) => {
    useEffect(() => {
        document.title = 'Table View';
    }, []);
    return (
        <Layout hasSider>
            <Sidebar pageMenu="table" />
            <Layout className="site-layout" style={{ marginLeft: 200, }} >
                <MainHeader setIsDarkMode={setIsDarkMode} />
                <Content className="table-container">
                    <div className="table-view-title">
                        <h2>List of notes and files</h2>
                        <p>You can search, filter by type, tags or sort by date</p>
                    </div>
                    <div className="table-component" >
                        <TableView />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default ListView;