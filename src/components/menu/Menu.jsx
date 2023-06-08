import React, { useEffect, useState } from 'react';
import { Dropdown, Input, Menu, Modal } from 'antd';
import { BookOutlined, EllipsisOutlined, FilePdfOutlined, FolderOutlined, FileAddOutlined, UploadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FileType } from '../../enums/FileType';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import './menu.css';
import {
    createDocument,
    createRef,
    deleteArrayElement,
    deleteDocument,
    getDocumentById,
    updateDocumentProperty,
    updateExistedDocumentArray, uploadFile,
} from '../../services/firebase';

const TeTuMenu = ({ folderData, currentPage, currentTitle }) => {

    const [pageModalVisible, setPageModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [deleteItemType, setDeleteItemType] = useState(null);
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [files, setFiles] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [noteValue, setNoteValue] = useState('');
    const [renameModalVisible, setRenameModalVisible] = useState(false);
    const [renameItemId, setRenameItemId] = useState(null);
    const [renameItemType, setRenameItemType] = useState(null);
    const [renameItemValue, setRenameItemValue] = useState('');
    const [folder, setFolderData] = useState(folderData);
    const fetchNotesAndFiles = async () => {
        try {
            const fetchedNotes = await Promise.all(
                folder.notes.map(async (noteId) => {
                    const note = await getDocumentById('notes', noteId);
                    return { item_id: noteId, item: note };
                })
            );
            setNotes(fetchedNotes);

            const fetchedFiles = await Promise.all(
                folder.files.map(async (fileId) => {
                    const file = await getDocumentById('files', fileId);
                    return { item_id: fileId, item: file };
                })
            );
            setFiles(fetchedFiles);
        } catch (error) {
            console.error('Error fetching notes and files:', error);
        }
    };

    useEffect(() => {
        const fetchNotesAndFiles = async () => {
            try {
                const fetchedNotes = await Promise.all(
                    folder.notes.map(async (noteId) => {
                        const note = await getDocumentById('notes', noteId);
                        return { item_id: noteId, item: note };
                    })
                );
                setNotes(fetchedNotes);

                const fetchedFiles = await Promise.all(
                    folder.files.map(async (fileId) => {
                        const file = await getDocumentById('files', fileId);
                        return { item_id: fileId, item: file };
                    })
                );
                console.log(fetchedFiles)
                setFiles(fetchedFiles);
            } catch (error) {
                console.error('Error fetching notes and files:', error);
            }
        };
        fetchNotesAndFiles();
        // console.log("current title: ", currentTitle);s
    }, [currentTitle]);

    const handleFileDelete = async () => {
        setConfirmLoading(true);
        try {
            if (deleteItemType === FileType.Folder) {
                await deleteDocument('folders', deleteItemId);
                for (const noteId of folder.notes) {
                    await deleteDocument('notes', noteId);
                }
                for (const fileId of folder.files) {
                    await deleteDocument('files', fileId);
                }
                setNotes([]);
                setFiles([]);
            } else if (deleteItemType === FileType.Note) {
                await deleteArrayElement('folders', folder.id, 'notes', deleteItemId);
                await deleteDocument('notes', deleteItemId);
                setNotes((prevNotes) => prevNotes.filter((note) => note.item_id !== deleteItemId));
            } else {
                await deleteArrayElement('folders', folder.id, 'files', deleteItemId);
                await deleteDocument('files', deleteItemId);
                setFiles((prevFiles) => prevFiles.filter((file) => file.item_id !== deleteItemId));
            }
            setDeleteModalVisible(false);
            setConfirmLoading(false);
        } catch (error) {
            console.error('Error deleting document:', error);
            setConfirmLoading(false);
        }
    };

    const handleMenuClick = (key, item, fileType) => {
        if (key === 'deleteFile') {
            const deletedItemId = item.item_id || folder.id;
            setDeleteModalVisible(true);
            setDeleteItemId(deletedItemId);
            setDeleteItemType(fileType);
        } else if (key === 'createNewPage') {
            setPageModalVisible(true);
        } else if (key === 'addNewFile') {
            handleFileInputClick();
        } else if (key === 'renameFile') {
            const renameItemId = item.item_id || folder.id;
            const renameItemValue = item.folder_name || item.item.name || item.item.title || ''
            setRenameItemId(renameItemId);
            setRenameItemType(fileType);
            setRenameItemValue(renameItemValue);
            setRenameModalVisible(true);
        }
    };

    const handleFileInputClick = () => {
        const fileInput = document.getElementById('file-input');
        fileInput.click();
    };

    const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const fileUrl = await uploadFile(file);

                const fileRef = await createDocument("files", {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    url: fileUrl,
                });
                const fileId = fileRef.id;

                const folderId = folder.id;
                const folderRef = createRef("folders", folderId);
                await updateExistedDocumentArray(folderRef, "files", fileId);

                const fileData = { item_id: fileId, item: file };
                setFiles((prevFiles) => [...prevFiles, fileData]);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        }
    };

    const handleNavigateFile = async (key, fileType, name) => {
        if (fileType === FileType.Note) {
            await navigate(`/note/${key}`, { state: { name: name } }, { replace: true });
        } else if (fileType === FileType.Pdf) {
            const file = await getDocumentById("files", key);
            const url = file?.url;
            navigate(`/file/${key}`, { state: { fileUrl: url }, replace: true });
        }
    }

    const handleRename = async () => {
        setConfirmLoading(true);
        try {
            if (renameItemType === FileType.Folder) {
                await updateDocumentProperty("folders", renameItemId, 'folder_name', renameItemValue);
                setFolderData((prevFolderData) => ({ ...prevFolderData, folder_name: renameItemValue }));
            } else if (renameItemType === FileType.Note) {
                await updateDocumentProperty("notes", renameItemId, 'title', renameItemValue);
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note.item_id === renameItemId ? { ...note, item: { ...note.item, title: renameItemValue } } : note
                    )
                );
            }
            setRenameModalVisible(false);
            setConfirmLoading(false);
        } catch (error) {
            console.error('Error updating document:', error);
            setConfirmLoading(false);
        }
    };

    const handleNoteUpdate = async () => {
        setConfirmLoading(true);
        try {
            const newNote = {
                title: noteValue,
                content: "",
                meta_data: {
                    datetime: dayjs(new Date().toJSON().slice(0, 10)),
                    status: ["To-do"],
                    tags: [],
                    type: ["Self-study"],
                }
            };
            const noteRef = await createDocument('notes', newNote);
            const noteId = noteRef.id;
            const folderId = folder.id;
            const folderRef = createRef('folders', folderId);
            await updateExistedDocumentArray(folderRef, "notes", noteId);
            setPageModalVisible(false);
            const note = await getDocumentById('notes', noteId);
            setNotes((prevNotes) => [...prevNotes, { item_id: noteId, item: note }]);
            setNoteValue('');
            const newNotePath = `/note/${noteId}`;
            await navigate(newNotePath);
            setConfirmLoading(false);
        } catch (error) {
            console.error('Error updating document:', error);
            setConfirmLoading(false);
        }
    };

    const DropDown = ({ fileType, item }) => {
        const isFolder = fileType === FileType.Folder;
        return (
            <Dropdown
                autoAdjustOverflow
                placement={'bottomLeft'}
                autoFocus
                overlay={
                    <Menu style={{ minWidth: '160px' }}>
                        {isFolder && (
                            <>
                                <Menu.Item key="createNewPage"
                                    onClick={() => handleMenuClick('createNewPage', item, fileType)}>
                                    <FileAddOutlined /> New Note
                                </Menu.Item>
                                <Menu.Item key="addNewFile"
                                    onClick={() => handleMenuClick('addNewFile', item, fileType)}>
                                    <UploadOutlined /> Add File
                                </Menu.Item>
                            </>
                        )}
                        {fileType !== FileType.Pdf && (
                            <Menu.Item key="renameFile" onClick={() => handleMenuClick('renameFile', item, fileType)}>
                                <EditOutlined /> {fileType === FileType.Note ? 'Rename Note' : 'Rename Folder'}
                            </Menu.Item>
                        )}
                        <Menu.Item key="deleteFile" onClick={() => handleMenuClick('deleteFile', item, fileType)}>
                            <DeleteOutlined /> {fileType === FileType.Folder ? 'Delete Folder' : 'Delete File'}
                        </Menu.Item>
                    </Menu>
                }
                trigger={['click']}
            >
                <span style={{ float: 'right' }}>
                    <EllipsisOutlined />
                </span>
            </Dropdown>
        );
    };
    // console.log("Open: ", currentPage?.folderId);
    // console.log("Select: ", currentPage?.noteId);
    return (
        <>

            <Menu
                mode="inline"
                defaultSelectedKeys={currentPage?.noteId ? [currentPage.noteId] : undefined}
                openKeys={currentPage?.folderId === folderData.id ? [currentPage.folderId] : undefined}
            >
                <Menu.SubMenu
                    key={folder.id}
                    title={
                        <div className="folder-menu">
                            <span> {folder.folder_name} </span>
                            <DropDown fileType={FileType.Folder} item={folder} />
                        </div>
                    }
                    icon={<FolderOutlined />}
                >
                    {notes.map((note) => (

                        <Menu.Item key={note.item_id} icon={<BookOutlined />} style={{ minWidth: '160px' }}>
                            <span onClick={() => handleNavigateFile(note.item_id, FileType.Note)} className="file-name">{note?.item?.title}</span>
                            <DropDown fileType={FileType.Note} item={note} />
                        </Menu.Item>
                    ))}
                    {files.map((file) => (
                        <Menu.Item key={file.item_id} icon={<FilePdfOutlined />} style={{ minWidth: '160px' }}>
                            <span onClick={() => handleNavigateFile(file.item_id, FileType.Pdf)} className="file-name">{file.item.name}</span>
                            <DropDown fileType={FileType.Pdf} item={file} />
                        </Menu.Item>
                    ))}
                </Menu.SubMenu>
            </Menu>
            <Modal
                title="Create New Page"
                open={pageModalVisible}
                confirmLoading={confirmLoading}
                onCancel={() => setPageModalVisible(false)}
                onOk={handleNoteUpdate}
            >
                <Input value={noteValue} onChange={(e) => setNoteValue(e.target.value)} placeholder="Enter note title" />
            </Modal>
            <Modal
                title="⁉️ Confirm delete?"
                open={deleteModalVisible}
                onOk={handleFileDelete}
                confirmLoading={confirmLoading}
                onCancel={() => setDeleteModalVisible(false)}
            >
                You will not be able to restore this item!
                <br />
                Continue?
            </Modal>
            <Modal
                title={renameItemType === FileType.Folder ? 'Rename Folder' : 'Rename Note'}
                open={renameModalVisible}
                confirmLoading={confirmLoading}
                onCancel={() => setRenameModalVisible(false)}
                onOk={handleRename}
            >
                <Input
                    value={renameItemValue}
                    onChange={(e) => setRenameItemValue(e.target.value)}
                    placeholder={`Enter ${renameItemType === FileType.Folder ? 'folder' : 'note'} name`}
                />
            </Modal>
            <input
                id="file-input"
                type="file"
                accept="application/pdf"
                style={{ display: 'none' }}
                onChange={handleFileInputChange}
            />
        </>
    );
};

export default TeTuMenu;
