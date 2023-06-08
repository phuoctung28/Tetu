import React from 'react';
import { Layout, } from 'antd';
import MainHeader from '../../components/header/MainHeader';
import './list_view.css';
import TableView from '../../components/table/TableView';
import Sidebar from '../../components/sidebar/Sidebar';

const { Content } = Layout;

const ListView = () => {
   return (
      <Layout hasSider>
         <Sidebar />
         <Layout className="site-layout" style={{ marginLeft: 200, }} >
            <MainHeader />
            <Content style={{ margin: '0', overflow: 'initial', }} >
               <TableView />
            </Content>
         </Layout>
      </Layout>
   );
};

export default ListView;