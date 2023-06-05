import React, { useEffect, useState } from 'react';
import { Input, Layout, message, theme, } from 'antd';
import Metadata from '../../components/collapse/Metadata';
import Sidebar from '../../components/sidebar/Sidebar';
import MainHeader from '../../components/header/MainHeader';
import TetuEditor from '../../components/Editor/Editor';
import './note_editor.css';
import { getDocumentById, queryDocuments, updateDocument, updateDocumentProperty } from "../../services/firebase";
import { useLocation, useParams } from "react-router-dom";
import { useCallback } from 'react';

const { Content } = Layout;

const Notebook = () => {
    const { token: { colorBgContainer }, } = theme.useToken();

    const [title, setTitle] = useState("Untitled");
    const [noteData, setNoteData] = useState({});
    const [currentPage, setCurrentPage] = useState({});
    const { pageId } = useParams();
    const location = useLocation();
    const data = location.state;
    const [currentTitle, setCurrentTitle] = useState(data.name);
    const [noteContent, setNoteContent] = useState("");

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const fetchedNote = await getDocumentById("notes", pageId);
                const folder = await queryDocuments("folders", "notes", "array-contains", pageId);
                setNoteData({
                    ...fetchedNote,
                    noteId: pageId,
                    location: folder[0].folder_name
                });
                setTitle(fetchedNote.title);
                setCurrentPage({
                    noteId: pageId,
                    folderId: folder[0].id,
                });
                setNoteContent(fetchedNote.content);

            } catch (error) {
                console.error('Error fetching notes and files:', error);
            }
        };

        fetchNote();
        // console.log("Note data:", noteData);
    }, [pageId]);

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };

    useEffect(() => {
        document.title = title;
    }, [title]);

    const handleKeyUp = async (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
            await updateDocumentProperty("notes", pageId, 'title', event.target.value);
            setCurrentTitle(event.target.value);
        }
    }

    const saveNoteContent = async () => {
        console.log("current note content:", noteContent);
        try {
            await updateDocumentProperty("notes", pageId, "content", noteContent);
            message.success("Save successfully!");
        } catch (error) {
            console.error('Error saving note content:', error);
        }
    }


    useEffect(() => {
        // check if the key is "s" with ctrl key
        const keyDown = (event) => {
            if (event.key === "s" && event.ctrlKey) {
                // prevent the browser from opening the save dialog
                event.preventDefault();
                // call our callback method
                saveNoteContent();
            }
        };
        // listen to keydown events
        document.addEventListener("keydown", keyDown);
        // stop listening on component destory
        return () => {
            document.removeEventListener("keydown", keyDown);
        };
    });

    return (
        <Layout hasSider>
            <Sidebar currentPage={currentPage} currentTitle={currentTitle} />
            <Layout className="site-layout" style={{ marginLeft: 200, }}>
                <MainHeader noteData={noteData} saveNoteContent={saveNoteContent} />
                <Content className="notebook-container">
                    <div className='note-space-container' style={{ padding: 40, background: colorBgContainer, }}>
                        <div className='note-title-container'>
                            <Input
                                value={title}
                                className="note-title"
                                onChange={changeTitle}
                                onPressEnter={handleKeyUp}
                                // placeholder="Untitled"
                                bordered={false} />
                        </div>
                        <Metadata noteData={noteData} />
                        <TetuEditor
                            editorData={noteData.content || ""}
                            setNoteContent={setNoteContent} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Notebook;