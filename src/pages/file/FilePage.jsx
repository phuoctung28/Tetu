import React, { useState } from 'react';
import { Layout, theme, Divider, Avatar, Typography, Col, Row } from 'antd';
import PdfViewerComponent from '../../components/PdfViewerComponent';
import PdfFile from '../../assets/ML glossary.pdf';
import SideMenu from '../../components/sidebar/SideMenu';
import MainHeader from '../../components/header/MainHeader';
import './file_page.css';

const { Content, Sider } = Layout;

const FilePage = () => {
   const [user, setUser] = useState('Idol');
   const [color, setColor] = useState('#ffbf00');
   const [gap, setGap] = useState(4);
   return (
      <Layout hasSider>
         <Sider className='home-sider' style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, background: 'white' }}>
            <div className='sider-top' style={{ margin: '30px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <Avatar
                  style={{ backgroundColor: color, verticalAlign: 'middle', marginRight: 10 }}
                  size="medium"
                  gap={gap}
               >
                  {user}
               </Avatar>
               <h3>Tung Ng.P</h3>
            </div>
            <Divider />
            <SideMenu />
         </Sider>
         <Layout className="site-layout" style={{ marginLeft: 200, }} >
            <MainHeader />
            <Content style={{ margin: '0', overflow: 'initial', }} >
               <PdfViewerComponent pdfUrl={PdfFile} />
            </Content>
         </Layout>
      </Layout>
   );
};

export default FilePage;