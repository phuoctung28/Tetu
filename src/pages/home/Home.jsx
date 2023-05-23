import { Layout, theme, Divider, Avatar, Typography, Col, Row } from 'antd';
import { FileTwoTone, FolderAddTwoTone, BookTwoTone, StarTwoTone, AppstoreTwoTone, CalendarTwoTone, WalletTwoTone, SecurityScanTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';
import SideMenu from '../../components/sidebar/SideMenu';
import MainHeader from '../../components/header/MainHeader';
import './home.css';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

const navItems = [
   { title: 'Read Document', key: '1', icon: <FileTwoTone className='nav_icon' /> },
   { title: 'New Session', key: '2', icon: <FolderAddTwoTone className='nav_icon' /> },
   { title: 'New Notebook', key: '3', icon: <BookTwoTone className='nav_icon' /> },
   { title: 'New Canvas', key: '4', icon: <AppstoreTwoTone className='nav_icon' /> },
   { title: 'Graph View', key: '5', icon: <StarTwoTone className='nav_icon' /> },
   { title: 'Calendar View', key: '6', icon: <CalendarTwoTone className='nav_icon' /> },
   { title: 'Citation Box', key: '7', icon: <WalletTwoTone className='nav_icon' /> },
   { title: 'Revision', key: '8', icon: <SecurityScanTwoTone className='nav_icon' /> },
];

const Home = () => {
   const { token: { colorBgContainer }, } = theme.useToken();
   const [user, setUser] = useState('Idol');
   const [color, setColor] = useState('#ffbf00');
   const [gap, setGap] = useState(4);
   return (
      <Layout hasSider>
         <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, background: 'white' }}>
            <div style={{ margin: '30px 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
               <div style={{ padding: 80, background: colorBgContainer, }}>
                  <div style={{ marginBottom: 60 }}>
                     <Title level={4}>Quick Tools</Title>
                     <br />
                     <div>
                        <Row gutter={[30, 30]}>
                           {navItems.map((item, index) => (
                              <Col key={index} className="gutter-row" span={6}>
                                 <button className='nav_btn' >
                                    {item.icon}
                                    <Text style={{ fontSize: '20px' }} strong>{item.title}</Text>
                                 </button>
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