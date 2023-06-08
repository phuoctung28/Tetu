import React, { useEffect, useState } from 'react';
import { Button, Input, Modal, Tooltip } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import { createDocument, queryDocuments } from "../../services/firebase";
import TeTuMenu from "../menu/Menu";

const SidebarMenu = ({ currentPage, currentTitle }) => {

    // const user_id = JSON.parse(localStorage.getItem("user")).user_id;
    const [folderModalVisible, setFolderModalVisible] = useState(false);
    const [folderValue, setFolderValue] = useState('');
    const [pageValue, setPageValue] = useState('');
    const [folders, setFolders] = useState([]);
    useEffect(() => {
        const loadFolders = async () => {
            try {
                const folderData = await queryDocuments("folders", "owner", "==", "JWwEYRA6yARL9pjMrDDOgG9cbpF3");
                // console.log(folderData);
                setFolders(folderData);
            } catch (error) {
                // console.log(error);
            }
        };

        loadFolders();
    }, []);
    const handleModalOk = async () => {
        if (folderValue) {
            const folderData = {
                files: [],
                notes: [],
                owner: "zzz",
                folder_name: folderValue
            }
            // console.log(folders)
            // console.log(folderData)
            await createDocument("folders", folderData);
            setFolders([...folders, folderData]);
            setFolderModalVisible(false);
        }

        if (pageValue) {
            // console.log(pageValue)
        }
    };
    const handleCreateNewFolder = () => {
        setFolderModalVisible(true);
    };

    return (
        <div>
            <div className='new-item-btn-container'>
                <Tooltip title="New folder">
                    <Button block className="btn-new-item" icon={<FolderAddOutlined />}
                        onClick={() => handleCreateNewFolder(null)}>
                        New Session
                    </Button>
                </Tooltip>
            </div>

            {folders.map((data) =>
                <TeTuMenu
                    key={data.id}
                    folderData={data}
                    currentPage={currentPage}
                    currentTitle={currentTitle} />

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