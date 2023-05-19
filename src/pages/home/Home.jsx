import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, theme, Divider, Avatar, Typography, Col, Row } from 'antd';
import { FileTwoTone, FolderAddTwoTone, BookTwoTone, StarTwoTone, AppstoreTwoTone, CalendarTwoTone, WalletTwoTone, SecurityScanTwoTone } from '@ant-design/icons';
import React, { useState } from 'react';
import SideMenu from '../../components/sidebar/SideMenu';
import MainHeader from '../../components/header/MainHeader';
import './home.css';

const { Content, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));
const { Title, Text } = Typography;


function getItem(label, key, icon) {
  return {
    'title': label,
    'key': key,
    'icon': icon,
  };
}

const navItems = [
  getItem('Read Document', '1', <FileTwoTone className='nav_icon' />),
  getItem('New Session', '2', <FolderAddTwoTone className='nav_icon' />),
  getItem('New Notebook', '3', <BookTwoTone className='nav_icon' />),
  getItem('New Canvas', '4', <AppstoreTwoTone className='nav_icon' />),
  getItem('Graph View', '5', <StarTwoTone className='nav_icon' />),
  getItem('Calendar View', '6', <CalendarTwoTone className='nav_icon' />),
  getItem('Citation Box', '7', <WalletTwoTone className='nav_icon' />),
  getItem('Revision', '8', <SecurityScanTwoTone className='nav_icon' />),

]
const Home = () => {
  const { token: { colorBgContainer }, } = theme.useToken();
  const [user, setUser] = useState('Idol');
  const [color, setColor] = useState('#ffbf00');
  const [gap, setGap] = useState(4);
  return (
    <Layout hasSider>
      <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, background: 'white' }}
      // className='overflow-auto h-screen fixed left-0 top-0 bottom-0'
      >
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
        {/* <Header style={{ height: 40, padding: 0, background: '#E6EDF7', }} /> */}
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
                      <button className='nav_btn'>
                        {item.icon}
                        {/* <FileTwoTone style={{ fontSize: '25px' }} className='nav_icon' /> */}
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
              // className='w-full h-fit flex flex-col'
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