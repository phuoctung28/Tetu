import React, { useEffect, useState } from 'react';
import { Input, Layout, message } from 'antd';
import Metadata from '../../components/collapse/Metadata';
import TetuEditor from '../../components/Editor/Editor';
import { getDocumentById, queryDocuments, updateDocumentProperty } from "../../services/firebase";
import './note-book.css';

const { Content } = Layout;

const NoteDual = ({ noteId, textFromFile }) => {
    // console.log("DUAL DATA:", page)
    const [noteData, setNoteData] = useState({});
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [currentContent, setCurrentContent] = useState({});
    const [currentBlocks, setCurrentBlocks] = useState([]);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                // console.log("NOTE ID:", noteId);
                const fetchedNote = await getDocumentById("notes", noteId);
                setNoteData({
                    ...fetchedNote,
                    noteId: noteId,
                });
                // console.log("NOTE CONTENT: ", fetchedNote);
                setNoteTitle(fetchedNote.title);
                setNoteContent(fetchedNote.content);
            } catch (error) {
                console.error('Error fetching notes and files:', error);
            }
        };
        fetchNote();
    }, [noteId]);

    useEffect(() => {
        setCurrentContent(noteData?.content);
        setCurrentBlocks(noteData?.content?.blocks);
    }, [noteData]);

    useEffect(() => {
        // console.log("SELECTED TEXT:", textFromFile);
        if (textFromFile && textFromFile.length > 0) {
            if (currentBlocks) {
                // console.log("CUR BLOCKS:", currentBlocks);
                let length = currentBlocks?.length;
                if (length !== 0) {
                    let newBlock = {
                        data: {
                            text: textFromFile,
                        },
                        type: "paragraph",
                    }
                    let newBlocks = [...currentBlocks, newBlock];
                    let newContent = {
                        ...currentContent,
                        time: new Date().getTime(),
                        blocks: newBlocks,
                    };
                    setCurrentContent(newContent);
                    setCurrentBlocks(newBlocks);
                    setNoteContent(newContent);
                    setNoteData({
                        ...noteData,
                        content: newContent,
                    });
                }
            }
            // let currentContent = [...noteData?.content, addNote];
            // setNoteContent({ ...noteContent, content: currentContent })
        }
    }, [textFromFile]);


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