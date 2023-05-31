import React from 'react';
import { Dropdown, Menu, message } from "antd";
import { BookOutlined, EllipsisOutlined, FilePdfOutlined, FolderOutlined, FileAddOutlined, CloseCircleOutlined, FormOutlined } from "@ant-design/icons";
import { FileType } from "../../enums/FileType";
import { deleteDocument } from '../../services/firebase';

const TeTuMenu = ({ folderData }) => {
    console.log(folderData)
    const deleteFolder = async ({ fid }) => {
        await deleteDocument("folders", fid);
        message.success("Delete folder successfully!");
    };

    const deleteNote = async ({ nid }) => {
        await deleteDocument("notes", nid);
        message.success("Delete note successfully!");
    }

    const deleteFile = () => {

    }

    const handleMenuClick = () => {
    };

    const renameFolder = (folderId) => {

    };

    const DropDown = (fileType) => {
        const isFolder = fileType.fileType === FileType.Folder;
        console.log(isFolder)
        return (<Dropdown
            overlay={
                <Menu>
                    {isFolder ? <Menu.Item key="createNewPage">Create Page</Menu.Item> : <></>}
                    <Menu.Item key="renameFolder"><FormOutlined /> Rename</Menu.Item>
                    <Menu.Item key="deleteFolder"><CloseCircleOutlined /> Delete</Menu.Item>
                </Menu>
            }
            trigger={['click']}
        >
            <span style={{ float: 'right' }}>
                <EllipsisOutlined />
            </span>
        </Dropdown>)
    }
    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item key="createNewPage"><FileAddOutlined /> Create Page</Menu.Item>
                    <Menu.Item key="renameFolder"><FormOutlined /> Rename</Menu.Item>
                    <Menu.Item
                        key="deleteFolder"
                        onClick={() => deleteFolder({ fid: folderData.id })}>
                        <CloseCircleOutlined /> Delete
                    </Menu.Item>
                </Menu>
            }
            trigger={['contextMenu']}
        >

            <Menu.SubMenu
                key={folderData.id}
                title={folderData.folder_name}
                icon={<FolderOutlined />}
            // popupOffset={[10, 10]}
            // style={{marginLeft: 10}}
            // style={{ height: 30 }}
            >
                {folderData.notes.map((note) => (
                    <Menu.Item key={note} icon={<BookOutlined />} style={{ height: 30 }} >
                        {note}
                        <DropDown fileType={FileType.Note.toString()} />
                    </Menu.Item>))
                }
                {folderData.files.map((file) => (
                    <Menu.Item key={file} icon={<FilePdfOutlined />} style={{ height: 30 }}>
                        {file}
                        <DropDown fileType={FileType.Pdf.toString()} />
                    </Menu.Item>))
                }
            </Menu.SubMenu>
        </Dropdown>
    );
};

export default TeTuMenu;