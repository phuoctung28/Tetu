import { Layout, theme, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import MainHeader from '../../components/header/MainHeader';
import Metadata from '../../components/collapse/Metadata';
import TetuEditor from "../../components/Editor/Editor";
import Sidebar from '../../components/sidebar/Sidebar';
import { useParams } from "react-router-dom";
import './note_page.css';

const { Content } = Layout;

const NotePage = () => {
   // const [isLoading, setIsLoading] = useState(true);
   // const [pageData, setPageData] = useState();
   const [title, setTitle] = useState("Untitled");
   const { pageId } = useParams();

   const { token: { colorBgContainer }, } = theme.useToken();

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
            <Content className="notebook-container" style={{ margin: '0', overflow: 'initial', }} >
               <div style={{ padding: 40, background: colorBgContainer, }}>
                  <div className='note-title-container'>
                     <Input
                        className="note-title"
                        onPressEnter={handleKeyUp}
                        placeholder="Untitled"
                        bordered={false}
                        onChange={changeTitle}
                        value={pageId}
                     />
                     <Metadata />
                     <TetuEditor />
                  </div>
               </div>
            </Content>
         </Layout>
      </Layout>
   );
};
export default NotePage;