import React, { useEffect, useState } from 'react';
import { Dropdown, Layout } from 'antd';
import PdfViewerComponent from '../../components/PdfViewerComponent';
import MainHeader from '../../components/header/MainHeader';
import './file_page.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useLocation, useParams } from 'react-router-dom';
import { createDocument, getDocumentById, queryDocuments, getDocument, updateDocumentProperty, updateDocument } from '../../services/firebase';
import TetuEditor from '../../components/Editor/Editor';
import NotePage from "../notepage/NotePage";
import Notebook from "../notepage/Notebook";
import moment from 'moment';
import NoteDual from '../notepage/NoteDual';

const FilePage = () => {
    const [fileData, setFileData] = useState({});
    const [dualNote, setDualNote] = useState(false);
    const [note, setNote] = useState("");
    const [noteContent, setNoteContent] = useState('');
    const [fetchedNote, setFetchedNote] = useState([]);
    const location = useLocation();
    const data = location.state;
    const { fileId } = useParams();
    const userId = JSON.parse(localStorage.getItem("user")).user_id;

    const fetchFile = async () => {
        try {
            const fetchedFile = await getDocumentById("files", fileId);
            // console.log("fetch file:", fetchedFile.url);
            const currentFile = {
                id: fileId,
                name: fetchedFile.name.split(".")[0].trim(),
                url: fetchedFile.url,
                noteId: fetchedFile.noteId || "",
            }
            // console.log("current file:", currentFile);
            setFileData(currentFile);
        } catch (error) {
            console.log("Error fetch file:", error);
        }
    }

    const initDualNote = async () => {
        // console.log("EXIST DATA:", fileData);
        if (!fileData.noteId || fileData.noteId.length === 0) {
            const newNote = {
                title: 'Note - ' + fileData.name,
                content: "",
                meta_data: {
                    datetime: moment(new Date()).format("DD/MM/YYYY"),
                    status: ["To-do"],
                    tags: [],
                    type: ["Self-study"],
                },
                owner: userId,
            };
            const noteRef = await createDocument('notes', newNote);
            const noteId = noteRef.id;
            setNote(noteId);
            try {
                await updateDocumentProperty("files", fileId, "noteId", noteId);
            } catch (error) {
                console.log("Error update", error)
            }
            // await createDocument('pages', {
            //     file: data?.fileUrl,
            //     note: noteId,
            // });
        } else {
            const note = await getDocumentById('notes', fileData.noteId);
            // console.log("NOTE FILE CONTENT", note);
            setNoteContent(note?.content || []);
        }

        // const files = await queryDocuments('files', 'note', '==', fileId);
        // const page = pages[0];
        // if (page == null) {
        //     const newNote = {
        //         title: 'File note',
        //         content: "",
        //         meta_data: {
        //             datetime: moment(new Date()).format("DD/MM/YYYY"),
        //             status: ["To-do"],
        //             tags: [],
        //             type: ["Self-study"],
        //         },
        //         owner: userId,
        //     };
        //     const noteRef = await createDocument('notes', newNote);
        //     const noteId = noteRef.id;
        //     await createDocument('pages', {
        //         file: data?.fileUrl,
        //         note: noteId,
        //     });
        // } else {
        //     const note = await getDocumentById('notes', page.note);
        //     setNoteContent(note?.content || '');
        // }
    };

    useEffect(() => {
        // console.log("FILE ID:", fileId)
        fetchFile();
    }, []);

    const handleToggleDualNote = async () => {
        initDualNote();
        setDualNote(!dualNote);
        // console.log("FILE DATA:", fileData);
        // await updateDocumentProperty("files",)
        // const pages = await queryDocuments('pages', 'file', '==', data?.fileUrl);
        // const page = pages[0];

        // if (page) {
        //     const note = await getDocumentById('notes', page.note);
        //     setFetchedNote(note)
        //     setNoteContent(note?.content || '');
        // }
    };

    const [selectedText, setSelectedText] = useState("");
    const handleMouseUp = () => {
        const currentSelectedText = window.getSelection().toString().trim().toLowerCase();
        setSelectedText(currentSelectedText)
        console.log(`Selected text: ${currentSelectedText}`);
    }
    const items = [
        {
            label: 'Add to note',
            key: '1',
        },
    ];

    const onClick = async ({ key }) => {
        const addNote = {
            "time": new Date().getTime(),
            "blocks": [
                {
                    "type": "paragraph",
                    "data": {
                        "text": selectedText
                    }
                },
            ]
        }
        let currentContent = noteContent?.content;
        if (!currentContent || currentContent.length === 0) {
            currentContent = [addNote];
        }
        // noteContent.content = currentContent;
        setNoteContent({ ...noteContent, content: currentContent })
        // fetchedNote.push(addNote);
        console.log("FETCH NOTE", noteContent);
    };

    return (
        <Layout hasSider>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <MainHeader showButton={true} dualNote={dualNote} handleToggleDualNote={handleToggleDualNote} />
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
                            <Panel>
                                <NoteDual page={noteContent} note={note} />
                            </Panel>
                        )}
                    </PanelGroup>
                </div>
            </Layout>
        </Layout>
    );
};

export default FilePage;
