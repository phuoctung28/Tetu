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

const NoteDual = ({ page, note }) => {
    // console.log("DUAL DATA:", page)
    const [title, setTitle] = useState(page?.title);
    const [noteData, setNoteData] = useState({});
    const { pageId } = useParams();
    const location = useLocation();
    const data = location.state;
    const [currentTitle, setCurrentTitle] = useState(data?.name);
    const [noteContent, setNoteContent] = useState("");

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const fetchedNote = await getDocumentById("notes", note);
                const folder = await queryDocuments("folders", "notes", "array-contains", pageId);
                setNoteData({
                    ...fetchedNote,
                    noteId: pageId,
                    location: folder[0].folder_name
                });
                setTitle(fetchedNote.title);
                setNoteContent(fetchedNote.content);
            } catch (error) {
                console.error('Error fetching notes and files:', error);
            }
        };

        // fetchNote();
        // console.log("Note data:", noteData);
    }, []);


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
            await updateDocumentProperty("notes", note, 'title', event.target.value);
            setCurrentTitle(event.target.value);
        }
    }

    const saveNoteContent = async () => {
        console.log("current note content:", noteContent);
        try {
            await updateDocumentProperty("notes", note, "content", noteContent);
            message.success("Save successfully!");
        } catch (error) {
            console.error('Error saving note content:', error);
        }
    }

    useEffect(() => {
        const keyDown = (event) => {
            if (event.key === "s" && event.ctrlKey) {
                event.preventDefault();
                saveNoteContent();
            }
        };
        document.addEventListener("keydown", keyDown);

        return () => {
            document.removeEventListener("keydown", keyDown);
        };
    });
    return (
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
    );
};
export default NoteDual;