import React, { useState, useEffect } from 'react';
import { Layout, theme, Input, } from 'antd';
import Metadata from '../../components/collapse/Metadata';
import Sidebar from '../../components/sidebar/Sidebar';
import MainHeader from '../../components/header/MainHeader';
import TetuEditor from '../../components/Editor/Editor';
import './note_editor.css';

const { Content } = Layout;

const Notebook = () => {
   const { token: { colorBgContainer }, } = theme.useToken();

   const [title, setTitle] = useState("Untitled");
   useEffect(() => {
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
            <Content className="notebook-container" style={{ margin: '0', overflow: 'initial', }} >
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
                  <TetuEditor />
               </div>
            </Content>
         </Layout>
      </Layout>
   );
};
export default Notebook;