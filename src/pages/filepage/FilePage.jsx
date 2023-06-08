import React, {useEffect, useState} from 'react';
import {Layout} from 'antd';
import PdfViewerComponent from '../../components/PdfViewerComponent';
import MainHeader from '../../components/header/MainHeader';
import './file_page.css';
import Sidebar from '../../components/sidebar/Sidebar';
import NoteEditor from '../notepage/NoteEditor';

import {Panel, PanelGroup, PanelResizeHandle} from "react-resizable-panels";
import {useLocation} from 'react-router-dom';
import {createDocument, getDocumentById, queryDocuments} from "../../services/firebase";
const FilePage = () => {
    const [dualNote, setDualNote] = useState(false);
    const [note, setNote] = useState({});
    const location = useLocation();
    const data = location.state;
    useEffect(() => {
        const initDualNote = async () => {
            const pages = await queryDocuments("pages", "file", "==", data?.fileUrl);
            const page = pages[0];
            if (page == null) {
                const newNote = {
                    title: "File note",
                };
                const noteRef = await createDocument('notes', newNote);
                const noteId = noteRef.id;
                await createDocument("pages", {
                    file: data?.fileUrl,
                    note: noteId
                })
            } else {
                console.log("c")
            }
        }
        initDualNote();
    }, [data]);

    const handleToggleDualNote = async () => {
        setDualNote(!dualNote);
        const pages = await queryDocuments("pages", "file", "==", data?.fileUrl);
        const page = pages[0];

        const note = await getDocumentById("notes", page.note);
        setNote(note)
    }

    return (
        <Layout hasSider>
            <Sidebar/>
            <Layout className="site-layout" style={{marginLeft: 200,}}>
                <MainHeader showButton={true} dualNote={dualNote} handleToggleDualNote={handleToggleDualNote}/>
                <div className='working-space-container'>
                    <PanelGroup autoSaveId="example" direction="horizontal">
                        <Panel defaultSize={50}>
                            <PdfViewerComponent style={{border: 'nones'}} pdfUrl={data?.fileUrl}/>
                        </Panel>
                        {dualNote && <PanelResizeHandle className='space-divider'/>}
                        {dualNote &&
                            <Panel>
                                <NoteEditor note={note}/>
                            </Panel>
                        }
                    </PanelGroup>
                </div>
            </Layout>
        </Layout>
    );
};

export default FilePage;