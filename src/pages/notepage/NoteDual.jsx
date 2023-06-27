import React, { useEffect, useState } from 'react';
import { Input, Layout, message } from 'antd';
import Metadata from '../../components/collapse/Metadata';
import TetuEditor from '../../components/Editor/Editor';
import { getDocumentById, updateDocumentProperty } from "../../services/firebase";
import './note-book.css';

const { Content } = Layout;

const NoteDual = ({ noteId, selectedText }) => {
    // console.log("DUAL DATA:", page)
    const [noteData, setNoteData] = useState({});
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");

    useEffect(() => {
        const fetchNote = async () => {
            try {
                console.log("NOTE ID:", noteId);
                const fetchedNote = await getDocumentById("notes", noteId);
                // const folder = await queryDocuments("folders", "notes", "array-contains", pageId);
                // setNoteData({
                //     ...fetchedNote,
                //     noteId: pageId,
                //     location: folder[0].folder_name,
                // });
                console.log("NOTE CONTENT: ", fetchedNote);
                setNoteTitle(fetchedNote.title);
                setNoteContent(fetchedNote.content);
            } catch (error) {
                console.error('Error fetching notes and files:', error);
            }
        };
        fetchNote();
    }, [noteId]);

    useEffect(() => {
        console.log("SELECTED TEXT:", selectedText);
    }, [selectedText]);

    const handleKeyUp = async (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
            await updateDocumentProperty("notes", noteId, 'title', event.target.value);
            setNoteTitle(event.target.value);
        }
    }

    const saveNoteContent = async () => {
        try {
            await updateDocumentProperty("notes", noteId, "content", noteContent);
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

    const handleChangeNoteTitle = (event) => {
        setNoteTitle(event.target.value);
    }
    return (
        <div className="note-space-container">
            <div className="note-header">
                <div className="note-title-container">
                    <Input
                        value={noteTitle}
                        className="note-title"
                        onChange={handleChangeNoteTitle}
                        onPressEnter={handleKeyUp}
                        bordered={false} />
                </div>
                <Metadata noteId={noteId} noteData={noteData} />
            </div>
            <TetuEditor
                editorData={noteData.content || ""}
                setNoteContent={setNoteContent} />
        </div>
    );
};
export default NoteDual;