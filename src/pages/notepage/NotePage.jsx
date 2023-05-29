import { Layout, theme, Input, } from 'antd';
import React, { useState, useEffect } from 'react';
import MainHeader from '../../components/header/MainHeader';
import './note_page.css';
import Metadata from '../../components/collapse/Metadata';
import Sidebar from '../../components/sidebar/Sidebar';

const { Content } = Layout;
const { TextArea } = Input;

const NotePage = () => {
   const { token: { colorBgContainer }, } = theme.useToken();

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
         <Sidebar />
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
export default NotePage;