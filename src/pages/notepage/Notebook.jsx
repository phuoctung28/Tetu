import { Layout, theme, Divider, Avatar, Typography, Col, Row, Input, Breadcrumb } from 'antd';
import { FileTwoTone, FolderAddTwoTone, BookTwoTone, StarTwoTone, AppstoreTwoTone, CalendarTwoTone, WalletTwoTone, SecurityScanTwoTone } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import SideMenu from '../../components/sidebar/SideMenu';
import MainHeader from '../../components/header/MainHeader';
import './notebook.css';
import Metadata from '../../components/collapse/Metadata';

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const Notebook = () => {
   const { token: { colorBgContainer }, } = theme.useToken();
   const [user, setUser] = useState('Idol');
   const [color, setColor] = useState('#ffbf00');
   const [gap, setGap] = useState(4);

   const [title, setTitle] = useState("Untitled");
   useEffect(() => {
      // This will run when the page first loads and whenever the title changes
      document.title = title;
   }, [title]);

   const changeTitle = (event) => {
      setTitle(event.target.value);
   };

   const handleKeyUp = (event) => {
      if (event.keyCode === 13) {
         event.preventDefault();
         event.target.blur();
      }
   }
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
            {/* <Breadcrumb items={[
               {
                  title: 'Home',
               },
               {
                  title: <a href="">Application Center</a>,
               },
               {
                  title: <a href="">Application List</a>,
               },
               {
                  title: 'An Application',
               },
            ]} /> */}
            <Content style={{ margin: '0', overflow: 'initial', }} >
               <div style={{ padding: 40, background: colorBgContainer, }}>
                  <div className='note-title-container'>
                     <Input
                        // value="Untitled"
                        className="note-title"
                        onChange={changeTitle}
                        onPressEnter={handleKeyUp}
                        placeholder="Untitled"
                        bordered={false} />
                  </div>
                  <Metadata />
                  <div className='text-editor-container'>
                     <TextArea
                        rows={100}
                        className='text-editor'
                        placeholder='Type "/" for command'
                        bordered={false} />;
                  </div>
               </div>
            </Content>
         </Layout>
      </Layout>
   );
};
export default Notebook;