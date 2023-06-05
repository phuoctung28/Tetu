import React, { useState } from 'react';
import { Layout } from 'antd';
import PdfViewerComponent from '../../components/PdfViewerComponent';
import MainHeader from '../../components/header/MainHeader';
import './file_page.css';
import Sidebar from '../../components/sidebar/Sidebar';
import NoteEditor from '../notepage/NoteEditor';
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useLocation, useParams } from 'react-router-dom';

const { Content } = Layout;

const FilePage = () => {
    const { fileId } = useParams();
   const [dualNote, setDualNote] = useState(false);
   const location = useLocation();
   const data = location.state;
   console.log("url", data.fileUrl);

   const handleToggleDualNote = () => {
      setDualNote(!dualNote);
   }

   return (
      <Layout hasSider>
         <Sidebar />
         <Layout className="site-layout" style={{ marginLeft: 200, }} >
            <MainHeader showButton={true} dualNote={dualNote} handleToggleDualNote={handleToggleDualNote} />
            <Content style={{ margin: '0', overflow: 'initial', }} >
               <div className='working-space-container'>
                  <PanelGroup autoSaveId="example" direction="horizontal">
                     <Panel defaultSize={50} >
                        <PdfViewerComponent style={{ border: 'nones' }} pdfUrl={data?.fileUrl} />
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