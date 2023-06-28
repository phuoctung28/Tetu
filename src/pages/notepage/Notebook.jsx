import React, { useEffect, useState } from 'react';
import { FloatButton, Input, Layout, message, theme, } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Metadata from '../../components/collapse/Metadata';
import Sidebar from '../../components/sidebar/Sidebar';
import MainHeader from '../../components/header/MainHeader';
import TetuEditor from '../../components/Editor/Editor';
import { getDocumentById, queryDocuments, updateDocumentProperty } from "../../services/firebase";
import { useLocation, useParams } from "react-router-dom";
import './note-book.css';

const { Content } = Layout;

const Notebook = ({setIsDarkMode}) => {
    const [title, setTitle] = useState("");
    const [noteData, setNoteData] = useState({});
    const [currentPage, setCurrentPage] = useState({});
    const { noteId } = useParams();
    const location = useLocation();
    const data = location.state;
    const [currentTitle, setCurrentTitle] = useState(data?.name);
    const [noteContent, setNoteContent] = useState("");
    const [savingMsg, setSavingMsg] = useState(false);

    const fetchNote = async () => {
        try {
            const fetchedNote = await getDocumentById("notes", noteId);
            const folder = await queryDocuments("folders", "notes", "array-contains", noteId);
            setNoteData({
                ...fetchedNote,
                noteId: noteId,
                location: folder[0].folder_name
            });
            setTitle(fetchedNote.title);
            setCurrentPage({
                noteId: noteId,
                folderId: folder[0].id,
            });
            setNoteContent(fetchedNote.content);
        } catch (error) {
            console.error('Error fetching notes and files:', error);
        }
    };

    useEffect(() => {
        fetchNote();
        // console.log("Note data:", noteData);
    }, []);

    useEffect(() => {
        fetchNote();
        // console.log("Note data:", noteData);
    }, [noteId]);


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
            await updateDocumentProperty("notes", noteId, 'title', event.target.value);
            setCurrentTitle(event.target.value);
        }
    }

    const saveNoteContent = async (useKeyboard = true) => {
        // console.log("current note content:", noteContent);
        try {
            setSavingMsg(true);
            await updateDocumentProperty("notes", noteId, "content", noteContent);
            setTimeout(() => setSavingMsg(false), 2000);
            if (useKeyboard !== false)
                message.success("Save successfully!");
        } catch (error) {
            console.error('Error saving note content:', error);
        }
    }

    useEffect(() => {
        const keyDown = (event) => {
            if (event.key === "s" && event.ctrlKey) {
                event.preventDefault();
                saveNoteContent(false);
            }
        };
        document.addEventListener("keydown", keyDown);
        return () => {
            document.removeEventListener("keydown", keyDown);
        };
    });

    return (
        <Layout hasSider>
            <FloatButton
                icon={<QuestionCircleOutlined />}
                type="default"
                style={{ right: 50, }}
            />
            <Sidebar currentPage={currentPage} currentTitle={currentTitle} />
            <Layout className="site-layout">
                <MainHeader setIsDarkMode={setIsDarkMode} noteData={noteData} saveNoteContent={saveNoteContent} savingMsg={savingMsg} />
                <Content className="notebook-wrapper">
                    <div className="note-space-container">
                        <div className="note-header">
                            <div className="note-title-container">
                                <Input
                                    value={title}
                                    className="note-title"
                                    onChange={changeTitle}
                                    onPressEnter={handleKeyUp}
                                    bordered={false} />
                            </div>
                            {noteData !== undefined && <Metadata noteData={noteData} noteId={noteId} />}
                        </div>
                        {noteData && <TetuEditor
                            key={noteId}
                            editorData={noteData?.content}
                            setNoteContent={setNoteContent} />}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Notebook;