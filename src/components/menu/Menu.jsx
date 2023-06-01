import React, {useState} from 'react';
import {Dropdown, Input, Menu, message, Modal, Popconfirm} from 'antd';
import {BookOutlined, EllipsisOutlined, FilePdfOutlined, FolderOutlined} from '@ant-design/icons';
import {FileType} from '../../enums/FileType';
import {useNavigate} from 'react-router-dom';
import './menu.css';
import {createRef, deleteDocument, updateDocument} from "../../services/firebase";
import {deleteDoc} from "firebase/firestore";

const TeTuMenu = ({folderData}) => {
    const [folderModalVisible, setFolderModalVisible] = useState(false);
    const [pageModalVisible, setPageModalVisible] = useState(false);
    const navigate = useNavigate();
    const [updatedNotes, setUpdatedNotes] = useState([...folderData.notes]);
    const handleMenuClick = ({key}) => {
        console.log(key)
        if (key === 'deleteFile') {
            // Handle delete file case
        } else if (key === 'createNewPage') {
            console.log(key)
            setPageModalVisible(true);
        } else {
            // Handle other cases
        }
    };
    const handleNoteUpdate = async (folderId, newNotes) => {
        try {
            const folderRef = createRef("folders", folderId)

            await updateDocument(folderRef, {notes: [updatedNotes, newNotes]});
            setPageModalVisible(false);
            setUpdatedNotes([...folderData.notes]);
            console.log('Document updated successfully');
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };
    const convertToSlug = (text) => {
        return String(text)
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    };

    const deleteFolder = async () => {
        await deleteDocument("folders", folderData.id);
        message.success("Delete folder successfully!");
    };

    const deleteNote = () => {
    };

    const deleteFile = () => {
    };

    const DropDown = (fileType) => {
        const isFolder = fileType.fileType === FileType.Folder;
        return (
            <Dropdown
                autoAdjustOverflow
                placement={"bottomLeft"}
                autoFocus
                overlay={
                    <Menu style={{minWidth: '160px'}} onClick={handleMenuClick}>
                        {isFolder && <Menu.Item key="createNewPage">New Note</Menu.Item>}
                        <Popconfirm title={"Confirm delete folder?"} onConfirm={deleteFolder()}>
                            {isFolder && <Menu.Item key="deleteNote">Delete Note</Menu.Item>}
                        </Popconfirm>
                        <Menu.Item key="renameFile">
                            {fileType.fileType === FileType.Note ? 'Rename Note' : 'Rename File'}
                        </Menu.Item>
                        <Menu.Item key="deleteFile">
                            {fileType.fileType === FileType.Note ? 'Delete Note' : 'Delete File'}
                        </Menu.Item>
                    </Menu>
                }
                trigger={['click']}>
                <span style={{float: 'right'}}>
                  <EllipsisOutlined/>
                </span>
            </Dropdown>);
    };

    return (<>
        <Menu mode="inline" onClick={handleMenuClick}>
            <Menu.SubMenu
                key={folderData.id}
                fileType={FileType.Folder}
                title={
                    <div className="folder-menu">
                        <span> {folderData.folder_name} </span>
                        <DropDown fileType={FileType.Folder} key={folderData.id}/>
                    </div>}
                icon={<FolderOutlined/>}>
                {folderData.notes.map((note) => (
                    <Menu.Item
                        fileType={FileType.Note}
                        key={note}
                        icon={<BookOutlined/>}
                        style={{minWidth: '160px'}}>
                        {note}
                        <DropDown fileType={FileType.Note} key={note}/>
                    </Menu.Item>)
                )}
                {folderData.files.map((file) => (
                    <Menu.Item
                        fileType={FileType.Pdf} key={file} icon={<FilePdfOutlined/>}
                        style={{minWidth: '160px'}}>
                        {file}
                        <DropDown fileType={FileType.Pdf} key={file}/>
                    </Menu.Item>)
                )}
            </Menu.SubMenu>
        </Menu>
        <Modal
            title="Create New Page"
            open={pageModalVisible}
            onCancel={() => setPageModalVisible(false)}
            onOk={handleNoteUpdate}
        >
            <Input
                value={updatedNotes}
                onChange={(e) => setUpdatedNotes(e.target.value)}
                placeholder="Enter note content"
            />
        </Modal>

        {/*{*/}
        {/*    folderModalVisible && (*/}
        {/*        <Modal*/}
        {/*            title="Create New Folder"*/}
        {/*            open={folderModalVisible}*/}
        {/*            onOk={handleModalOk}*/}
        {/*            onCancel={() => setFolderModalVisible(false)}*/}
        {/*        >*/}
        {/*            <Input*/}
        {/*                value={folderValue}*/}
        {/*                onChange={e => setFolderValue(e.target.value)}*/}
        {/*                placeholder="Folder Name"*/}
        {/*            />*/}
        {/*        </Modal>*/}
        {/*    )*/}
        {/*}*/}
    </>);
};

export default TeTuMenu;