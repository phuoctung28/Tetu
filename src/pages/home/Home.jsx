import { Layout, theme, Typography, Col, Row, Popover, Button, Tooltip } from 'antd';
import { FileTwoTone, FolderAddTwoTone, BookTwoTone, StarTwoTone, AppstoreTwoTone, CalendarTwoTone, WalletTwoTone, SecurityScanTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';
import MainHeader from '../../components/header/MainHeader';
import './home.css';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import ReadDocument from '../../components/popover/ReadDocument';
import Sidebar from '../../components/sidebar/Sidebar';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

const navItems = [
   // { title: 'Read Document', key: '1', icon: <FileTwoTone className='nav_icon' />, navLink: '' },
   { title: 'New Session', key: '2', icon: <FolderAddTwoTone className='nav_icon' />, navLink: '' },
   { title: 'New Notebook', key: '3', icon: <BookTwoTone className='nav_icon' />, navLink: '/note' },
   { title: 'New Canvas', key: '4', icon: <AppstoreTwoTone className='nav_icon' />, navLink: '' },
   { title: 'Graph View', key: '5', icon: <StarTwoTone className='nav_icon' />, navLink: '' },
   { title: 'Calendar View', key: '6', icon: <CalendarTwoTone className='nav_icon' />, navLink: '' },
   { title: 'Citation Box', key: '7', icon: <WalletTwoTone className='nav_icon' />, navLink: '' },
   { title: 'Revision', key: '8', icon: <SecurityScanTwoTone className='nav_icon' />, navLink: '' },
];

const Home = () => {
   const { token: { colorBgContainer }, } = theme.useToken();
   const [open, setOpen] = useState(false);
   const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
   };

   return (
      <Layout hasSider>
         <Sidebar />
         <Layout className="site-layout" style={{ marginLeft: 200, }} >
            <MainHeader />
            <Content style={{ margin: '0', overflow: 'initial', }} >
               <div style={{ padding: 80, background: colorBgContainer, }}>
                  <div style={{ marginBottom: 60 }}>
                     <Title level={4}>Quick Tools</Title>
                     <br />
                     <div>
                        <Row gutter={[30, 30]}>
                           <Col className="gutter-row" span={6}>
                              <Popover
                                 content={<ReadDocument />}
                                 trigger="click"
                                 open={open}
                                 onOpenChange={handleOpenChange}
                              >
                                 <div className='nav-btn' >
                                    <FileTwoTone className='nav_icon' />
                                    <Text style={{ fontSize: '20px' }} strong>Read Document</Text>
                                 </div>
                              </Popover>
                           </Col>
                           {navItems.map((item, index) => (
                              <Col key={index} className="gutter-row" span={6}>
                                 <a href={item.navLink} className='nav-btn' >
                                    {item.icon}
                                    <Text style={{ fontSize: '20px' }} strong>{item.title}</Text>
                                 </a>
                              </Col>
                           ))}
                        </Row>
                     </div>
                  </div>
                  <div style={{ marginBottom: 30 }}>
                     <Title level={4}>Recent Files</Title>
                     <br />
                     <div
                        style={{ width: '100%', height: 'fit-content', display: 'flex', flexDirection: 'column' }}
                     >
                        <img src={require("../../assets/images/empty_file.png")} className='empty_file_img' alt="empty file" />
                        <button className='quick_btn'>
                           Open File (Ctrl + O)
                        </button>
                        <button className='quick_btn'>
                           New Note (Ctrl + N)
                        </button>
                     </div>
                  </div>
               </div>
            </Content>
         </Layout>
      </Layout>
   );
};
export default Home;