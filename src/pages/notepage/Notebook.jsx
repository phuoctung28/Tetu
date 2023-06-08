import React, { useEffect, useState } from 'react';
import { Input, Layout, theme, } from 'antd';
import Metadata from '../../components/collapse/Metadata';
import Sidebar from '../../components/sidebar/Sidebar';
import MainHeader from '../../components/header/MainHeader';
import TetuEditor from '../../components/Editor/Editor';
import './note_editor.css';
import { getDocumentById, queryDocuments } from "../../services/firebase";
import { useParams } from "react-router-dom";

const { Content } = Layout;

const Notebook = () => {
    const { token: { colorBgContainer }, } = theme.useToken();

    const [title, setTitle] = useState("Untitled");
    const [noteData, setNoteData] = useState({});
    const [location, setLocation] = useState("");
    const { pageId } = useParams();
    const [currentPage, setCurrentPage] = useState({});

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const fetchedNote = await getDocumentById("notes", pageId);
                const folder = await queryDocuments("folders", "notes", "array-contains", pageId);
                setNoteData({ ...fetchedNote, location: folder[0].folder_name });
                setLocation(folder[0].folder_name);
                setCurrentPage({
                    noteId: pageId,
                    folderId: folder[0].id,
                })

            } catch (error) {
                console.error('Error fetching notes and files:', error);
            }

        };

        fetchNote();
        document.title = noteData.title;
        // console.log("NOTE DATA:", noteData);
        setTitle(noteData.title);
    }, [pageId, title]);

    // useEffect(() => {
    //     document.title = title;
    // }, [title]);

    const changeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
        }
    }
    return (
        <Layout hasSider>
            <Sidebar currentPage={currentPage} />
            <Layout className="site-layout" style={{ marginLeft: 200, }}>
                <MainHeader noteData={noteData} />
                <Content className="notebook-container" style={{ margin: '0', overflow: 'initial', }}>
                    <div className='note-space-container' style={{ padding: 40, background: colorBgContainer, }}>
                        <div className='note-title-container'>
                            <Input
                                value={title}
                                className="note-title"
                                onChange={changeTitle}
                                onPressEnter={handleKeyUp}
                                placeholder="Untitled"
                                bordered={false} />
                        </div>
                        <Metadata />
                        <TetuEditor editorData={noteData.content || ""} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Notebook;