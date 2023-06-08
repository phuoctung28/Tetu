import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import PdfViewerComponent from '../../components/PdfViewerComponent';
import MainHeader from '../../components/header/MainHeader';
import './file_page.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useLocation } from 'react-router-dom';
import { createDocument, getDocumentById, queryDocuments } from '../../services/firebase';
import TetuEditor from '../../components/Editor/Editor';
import NotePage from "../notepage/NotePage";
import Notebook from "../notepage/Notebook";

const FilePage = () => {
    const [dualNote, setDualNote] = useState(false);
    const [note, setNote] = useState({});
    const [noteContent, setNoteContent] = useState('');
    const [fetchedNote, setFetchedNote] = useState();
    const location = useLocation();
    const data = location.state;

    useEffect(() => {
        const initDualNote = async () => {
            const pages = await queryDocuments('pages', 'file', '==', data?.fileUrl);
            const page = pages[0];
            if (page == null) {
                const newNote = {
                    title: 'File note',
                };
                const noteRef = await createDocument('notes', newNote);
                const noteId = noteRef.id;
                await createDocument('pages', {
                    file: data?.fileUrl,
                    note: noteId,
                });
            } else {
                const note = await getDocumentById('notes', page.note);
                setNoteContent(note?.content || '');
            }
        };

        initDualNote();
    }, [data]);

    const handleToggleDualNote = async () => {
        setDualNote(!dualNote);
        const pages = await queryDocuments('pages', 'file', '==', data?.fileUrl);
        const page = pages[0];

        if (page) {
            const note = await getDocumentById('notes', page.note);
            setFetchedNote(note)
            setNoteContent(note?.content || '');
        }
    };

    return (
        <Layout hasSider>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <MainHeader showButton={true} dualNote={dualNote} handleToggleDualNote={handleToggleDualNote} />
                <div className="working-space-container" style={{ paddingTop: '50px' }}>
                    <PanelGroup autoSaveId="example" direction="horizontal">
                        <Panel defaultSize={50}>
                            <PdfViewerComponent style={{ border: 'none' }} pdfUrl={data?.fileUrl} />
                        </Panel>
                        {dualNote && <PanelResizeHandle className="space-divider" />}
                        {dualNote && (
                            <Panel>
                                <Notebook page={fetchedNote}/>
                            </Panel>
                        )}
                    </PanelGroup>
                </div>
            </Layout>
        </Layout>
    );
};

export default FilePage;
