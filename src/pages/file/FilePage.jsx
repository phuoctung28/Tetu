import React, { useEffect, useState } from 'react';
import { Layout, theme, Divider, Avatar, Typography, Col, Row } from 'antd';
import PdfViewerComponent from '../../components/PdfViewerComponent';
import PdfFile from '../../assets/Project 3 - ChatGPT.pdf';
import SideMenu from '../../components/sidebar/SideMenu';
import MainHeader from '../../components/header/MainHeader';
import './file_page.css';
import Sidebar from '../../components/sidebar/Sidebar';
import NoteEditor from '../notepage/NoteEditor';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

const { Content, Sider } = Layout;

const FilePage = () => {
   const [user, setUser] = useState('Idol');
   const [color, setColor] = useState('#ffbf00');
   const [gap, setGap] = useState(4);
   const url = "https://firebasestorage.googleapis.com/v0/b/tetu-3be72.appspot.com/o/files%2FDu%20l%E1%BB%8Bch%20Ph%C3%BA%20Qu%E1%BB%91c.pdf?alt=media&token=19b4369b-f234-4d5c-b374-cad5750e44cb";

   const [dualNote, setDualNote] = useState(false);

   const handleToggleDualNote = () => {
      setDualNote(!dualNote);
   }

   return (
      <Layout hasSider>
         <Sidebar />
         <Layout className="site-layout" style={{ marginLeft: 200, }} >
            <MainHeader dualNote={dualNote} handleToggleDualNote={handleToggleDualNote} />
            <Content style={{ margin: '0', overflow: 'initial', }} >
               <div className='working-space-container'>
                  <PanelGroup autoSaveId="example" direction="horizontal">
                     <Panel defaultSize={50} >
                        <PdfViewerComponent style={{ border: 'nones' }} pdfUrl={url} />
                     </Panel>
                     {dualNote && <PanelResizeHandle className='space-divider' />}
                     {dualNote &&
                        <Panel>
                           <NoteEditor />
                        </Panel>
                     }
                  </PanelGroup>
               </div>
            </Content>
         </Layout>
      </Layout >
   );
};

export default FilePage;