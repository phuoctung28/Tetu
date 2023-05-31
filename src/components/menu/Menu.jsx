import React from 'react';
import {Dropdown, Menu} from "antd";
import {BookOutlined, EllipsisOutlined, FilePdfOutlined, FolderOutlined} from "@ant-design/icons";
import {FileType} from "../../enums/FileType";

const TeTuMenu = ({folderData}) => {
    console.log(folderData)
    const deleteFolder = () => {

    };
    const deleteNote = () => {

    }

    const deleteFile = () => {

    }
    const DropDown = (fileType) => {
        const isFolder = fileType.fileType === FileType.Folder;
        console.log(isFolder)
        return (<Dropdown
                overlay={<Menu>
                    {isFolder ? <Menu.Item key="createNewPage">Create Page</Menu.Item> : <></>}
                    <Menu.Item key="deleteFolder">Delete Folder</Menu.Item>
                </Menu>}
                trigger={['click']}
            >
          <span style={{float: 'right'}}>
            <EllipsisOutlined/>
          </span>
            </Dropdown>)
    }
    return (<Menu
            mode="inline"
            theme="light"
        >
            <Menu.SubMenu key={folderData.id} title={folderData.folder_name} icon={<FolderOutlined/>}
                          popupOffset={[20, 20]}>
                {folderData.notes.map((note) => (<Menu.Item key={note} icon={<BookOutlined/>}>{note}
                        <DropDown fileType={FileType.Note.toString()}/>
                    </Menu.Item>))}
                {folderData.files.map((file) => (<Menu.Item key={file} icon={<FilePdfOutlined/>}>{file}
                        <DropDown fileType={FileType.Pdf.toString()}/>
                    </Menu.Item>))}
            </Menu.SubMenu>
        </Menu>);
};

export default TeTuMenu;