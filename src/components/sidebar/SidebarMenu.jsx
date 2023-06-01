import React, {useEffect, useState} from 'react';
import {Button, Input, Modal, Tooltip} from 'antd';
import {AppstoreAddOutlined, FolderAddOutlined} from '@ant-design/icons';
import {createDocument, queryDocuments} from "../../services/firebase";
import TeTuMenu from "../menu/Menu";

const SidebarMenu = () => {
    const user_id = JSON.parse(localStorage.getItem("user")).user_id;
    const [folderModalVisible, setFolderModalVisible] = useState(false);
    const [pageModalVisible, setPageModalVisible] = useState(false);
    const [folderValue, setFolderValue] = useState('');
    const [pageValue, setPageValue] = useState('');
    const [parentKey, setParentKey] = useState(null);
    const [deleteKey, setDeleteKey] = useState(null);
    const [notes, setNotes] = useState([]);
    const [files, setFiles] = useState([]);

    const [folders, setFolders] = useState([]);
    // const [folders, setFolders] = useState([
    //     {
    //         files: ["file 1", "file 2"],
    //         folder_name: "aaa",
    //         notes: ["note 1", "note 2"],
    //         owner: "abc"
    //     }
    // ]);

    useEffect(() => {
        const loadFolders = async () => {
            try {
                const folderData = await queryDocuments("folders", "owner", "==", user_id);
                setFolders(folderData);
            } catch (error) {
                console.log(error);
            }
        };

        loadFolders();
    }, [folders]);

    const handleModalOk = async () => {
        if (folderValue) {
            const folderData = {
                files: [],
                notes: [],
                owner: user_id,
                folder_name: folderValue
            }
            console.log(folderData)
            await createDocument("folders", folderData);
            setFolderModalVisible(false);
            setParentKey(null);
        }
        if (pageValue) {
            console.log(pageValue)
        }
    };
    const handleCreateNewFolder = () => {
        setFolderModalVisible(true);
    };


    return (
        <div>
            <div className='new-item-btn-container'>
                <Tooltip title="New folder">
                    <Button block className="btn-new-item" icon={<FolderAddOutlined/>}
                            onClick={() => handleCreateNewFolder(null)}>
                        New Session
                    </Button>
                </Tooltip>
            </div>

            {folders.map((data) =>
                <TeTuMenu folderData={data}/>
            )}
            <Modal
                title="Create New Folder"
                open={folderModalVisible}
                onOk={handleModalOk}
                onCancel={() => setFolderModalVisible(false)}
            >
                <Input
                    value={folderValue}
                    onChange={e => setFolderValue(e.target.value)}
                    placeholder="Folder Name"
                />
            </Modal>
        </div>
    );
};
export default SidebarMenu;