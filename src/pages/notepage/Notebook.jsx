import React, { useEffect, useState } from 'react';
import { Input, Layout, message, theme, } from 'antd';

import Metadata from '../../components/collapse/Metadata';
import Sidebar from '../../components/sidebar/Sidebar';
import MainHeader from '../../components/header/MainHeader';
import TetuEditor from '../../components/Editor/Editor';
import { getDocumentById, queryDocuments, updateDocumentProperty } from "../../services/firebase";
import { useLocation, useParams } from "react-router-dom";
import './note-book.css';

const { Content } = Layout;

const Notebook = ({ page }) => {
    const [title, setTitle] = useState(page?.title);
    const [noteData, setNoteData] = useState({});
    const [currentPage, setCurrentPage] = useState({});
    const { pageId } = useParams();
    const location = useLocation();
    const data = location.state;
    const [currentTitle, setCurrentTitle] = useState(data?.name);
    const [noteContent, setNoteContent] = useState("");

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const fetchedNote = await getDocumentById("notes", pageId || page.id);
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
    // window.location.reload();
    return (
        <Layout hasSider>
            <Sidebar currentPage={currentPage} currentTitle={currentTitle} />
            <Layout className="site-layout">
                <MainHeader noteData={noteData} saveNoteContent={saveNoteContent} />
                <Content className="notebook-wrapper">
                    <div className="note-space-container">
                        <div className="note-header">
                            <div className="note-title-container">
                                <Input
                                    value={currentTitle || title}
                                    className="note-title"
                                    onChange={changeTitle}
                                    onPressEnter={handleKeyUp}
                                    bordered={false} />
                            </div>
                            <Metadata noteData={noteData} />
                        </div>
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