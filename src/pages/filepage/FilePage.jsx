import React, { useEffect, useState } from 'react';
import { Dropdown, Layout, message } from 'antd';
import PdfViewerComponent from '../../components/PdfViewerComponent';
import MainHeader from '../../components/header/MainHeader';
import './file_page.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useLocation, useParams } from 'react-router-dom';
import { getDocumentById } from '../../services/firebase';
import moment from 'moment';
import NoteDual from '../notepage/NoteDual';

const FilePage = ({ setIsDarkMode }) => {
    const [selectedText, setSelectedText] = useState("");
    const [textFromFile, setTextFromFile] = useState("");
    const [fileData, setFileData] = useState({});
    const [dualNote, setDualNote] = useState(false);
    const [noteId, setNoteId] = useState("");
    const [noteContent, setNoteContent] = useState('');
    const location = useLocation();
    const data = location.state;
    const { fileId } = useParams();
    const userId = JSON.parse(localStorage.getItem("user")).user_id;

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const fetchedFile = await getDocumentById("files", fileId);
                const currentFile = {
                    id: fileId,
                    name: fetchedFile.name.split(".")[0].trim(),
                    url: fetchedFile.url,
                    noteId: fetchedFile.noteId || "",
                }
                setFileData(currentFile);
                setNoteId(fetchedFile.noteId);
                document.title = fetchedFile.name.split(".")[0].trim();
            } catch (error) {
                console.log("Error fetch file:", error);
            }
        }
        fetchFile();
    }, [fileId]);

    const handleToggleDualNote = async () => {
        setDualNote(!dualNote);
    };

    const handleMouseUp = () => {
        const currentSelectedText = window.getSelection().toString().trim().toLowerCase();
        setSelectedText(currentSelectedText)
        // console.log(`Selected text: ${currentSelectedText}`);
    }
    const items = [{ label: 'Add to note', key: '1', },];

    const onClick = async ({ key }) => {
        // const addNote = {
        //     "time": new Date().getTime(),
        //     "blocks": [
        //         {
        //             "type": "paragraph",
        //             "data": {
        //                 "text": selectedText
        //             }
        //         },
        //     ]
        // }
        // let currentContent = noteContent?.content;
        // if (!currentContent || currentContent.length === 0) {
        //     currentContent = [addNote];
        // }
        // setNoteContent({ ...noteContent, content: currentContent })
        // console.log("FETCH NOTE", noteContent);
        if (selectedText.length > 0) {
            setTextFromFile(selectedText);
        } else {
            message.warning("Nothing to add!");
        }
    };

    // toggle dual note
    useEffect(() => {
        const keyDown = (event) => {
            if (event.key === "d" && event.ctrlKey) {
                event.preventDefault();
                handleToggleDualNote();
            }
        };
        document.addEventListener("keydown", keyDown);

        return () => {
            document.removeEventListener("keydown", keyDown);
        };
    });

    return (
        <Layout hasSider>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <MainHeader setIsDarkMode={setIsDarkMode} showButton={true} dualNote={dualNote} handleToggleDualNote={handleToggleDualNote} />
                <div className="working-space-container">
                    <PanelGroup autoSaveId="example" direction="horizontal">
                        <Panel defaultSize={50} >
                            <Dropdown
                                menu={{ items, onClick }}
                                trigger={['contextMenu']}>
                                <div style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                                    onMouseUp={handleMouseUp}>
                                    <PdfViewerComponent style={{ border: 'none' }} pdfUrl={data?.fileUrl} />
                                </div>
                            </Dropdown>
                        </Panel>
                        {dualNote && <PanelResizeHandle className="space-divider" />}
                        {dualNote && (
                            <Panel className="dual-note-panel">
                                <NoteDual key={noteId} noteId={noteId} textFromFile={textFromFile} />
                            </Panel>
                        )}
                    </PanelGroup>
                </div>
            </Layout>
        </Layout>
    );
};

export default FilePage;
