import React, {useEffect, useState} from 'react';
import {Dropdown, Input, Menu, Modal} from 'antd';
import {BookOutlined, EllipsisOutlined, FilePdfOutlined, FolderOutlined} from '@ant-design/icons';
import {FileType} from '../../enums/FileType';
import {useNavigate} from 'react-router-dom';
import './menu.css';
import {
    createDocument, createRef, deleteDocument, getDocumentById, queryDocuments, updateDocument
} from "../../services/firebase";

const TeTuMenu = ({folderData}) => {
    const [pageModalVisible, setPageModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const navigate = useNavigate();
    const [updatedNotes, setUpdatedNotes] = useState([...folderData.notes]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [noteValue, setNoteValue] = useState("");
    const [notes, setNotes] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetchNotesAndFiles = async () => {
            const fetchedNotes = [];
            for (const noteId of folderData.notes) {
                const note = await getDocumentById("notes", noteId);
                fetchedNotes.push({item_id: noteId, item: note});
            }
            setNotes(fetchedNotes);
            const fetchedFiles = [];
            for (const fileId of folderData.files) {
                const file = await getDocumentById("files", fileId);
                fetchedFiles.push({item_id: fileId, item: file});
            }
            setFiles(fetchedFiles);
        };
        fetchNotesAndFiles()
    }, []);

    const handleDeleteFile = async (key, fileType) => {
        // setConfirmLoading(true);
        console.log(folderData.folder_name)
        console.log(noteValue)
        // try {
        //     if (folderData.folder_name) {
        //         // Delete folder case
        //         await deleteDocument("folders", folderData.id);
        //     } else if (noteValue) {
        //         // Delete note case
        //         await deleteDocument("notes", noteValue);
        //         const updatedNotes = folderData.notes.filter(note => note !== noteValue);
        //         const folderRef = createRef("folders", folderData.id);
        //         await updateDocument(folderRef, { notes: updatedNotes });
        //         setUpdatedNotes(updatedNotes);
        //     } else {
        //         // Delete file case
        //         // Implement the delete file functionality here
        //     }
        //
        //     setDeleteModalVisible(false);
        //     setConfirmLoading(false);
        // } catch (error) {
        //     console.error('Error deleting document:', error);
        //     setConfirmLoading(false);
        // }
    };

    const handleMenuClick = ({key}) => {
        console.log("KEY: ", key);
        if (key === 'deleteFile') {
            setDeleteModalVisible(true);
        } else if (key === 'createNewPage') {
            setPageModalVisible(true);
        } else {
            // Handle other cases
        }
    };

    const handleDropdownItemClick = (event, item, type) => {
        console.log("EVENT: ", event);
        console.log("ITEM: ", item);
        console.log("FILE TYPE: ", type);
    }

    const handleNoteUpdate = async () => {
        try {
            const newNote = {
                title: noteValue,
            };
            const noteRef = await createDocument("notes", newNote);
            const noteId = noteRef.id;

            const folderId = folderData.id;
            const folderRef = createRef("folders", folderId);
            const updatedNotes = [...folderData.notes, noteId];
            await updateDocument(folderRef, {notes: updatedNotes});
            setPageModalVisible(false);
            setUpdatedNotes(updatedNotes);
            const newNotePath = `/note/${noteId}`;
            await navigate(newNotePath);
            console.log('Note and document updated successfully');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    const DropDown = ({fileType, item}) => {
        const isFolder = fileType === FileType.Folder;
        return (<Dropdown
            autoAdjustOverflow
            placement={"bottomLeft"}
            autoFocus
            overlay={
                <Menu
                    style={{minWidth: '160px'}}
                    onClick={(e) => handleDropdownItemClick(e, item, fileType)}
                >
                    {isFolder && <Menu.Item key="createNewPage">New Note</Menu.Item>}
                    <Menu.Item key="renameFile">
                        {fileType.fileType === FileType.Note ? 'Rename Note' : 'Rename File'}
                    </Menu.Item>
                    <Menu.Item key="deleteFile">
                        {fileType.fileType === FileType.Folder ? 'Delete Folder' : 'Delete File'}
                    </Menu.Item>
                </Menu>
            }
            trigger={
                ['click']
            }>
        <span style={{float: 'right'}}>
          <EllipsisOutlined/>
        </span>
        </Dropdown>);
    };

    return (<>
        <Menu
            mode="inline"
            // onClick={handleMenuClick}
        >
            <Menu.SubMenu
                key={folderData.id}
                title={<div className="folder-menu">
                    <span> {folderData.folder_name} </span>
                    <DropDown fileType={FileType.Folder} item={folderData}
                    />
                </div>}
                icon={<FolderOutlined/>}>
                {notes.map((note) => {
                    // console.log("NOTE: ", note?.item)
                    return (<Menu.Item
                        key={note.item_id}
                        icon={<BookOutlined/>}
                        style={{minWidth: '160px'}}>
                        <span className="file-name">{note?.item?.title}</span>
                        <DropDown fileType={FileType.Note} item={note}/>
                    </Menu.Item>)
                })}
                {files.map((file) => (<Menu.Item
                    key={file}
                    icon={<FilePdfOutlined/>}
                    style={{minWidth: '160px'}}>
                    <span className="file-name">{file.title}</span>
                    <DropDown fileType={FileType.Pdf} key={file}/>
                </Menu.Item>))}
            </Menu.SubMenu>
        </Menu>
        <Modal
            title="Create New Page"
            open={pageModalVisible}
            onCancel={() => setPageModalVisible(false)}
            onOk={handleNoteUpdate}
        >
            <Input
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
                placeholder="Enter note content"
            />
        </Modal>
        <Modal
            title="⁉️ Confirm delete?"
            open={deleteModalVisible}
            onOk={() => handleDeleteFile()}
            confirmLoading={confirmLoading}
            onCancel={() => setDeleteModalVisible(false)}
        >
            You will not be able to restore this item!<br/>
            Continue?
        </Modal>
    </>);
};

export default TeTuMenu;
