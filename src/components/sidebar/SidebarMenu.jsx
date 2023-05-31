import { useEffect, useState } from 'react';
import { Button, Input, Modal, Tooltip } from 'antd';
import { AppstoreAddOutlined, FolderAddOutlined, FolderOutlined, ProfileOutlined } from '@ant-design/icons';
import { createDocument, queryDocuments } from "../../services/firebase";
import TeTuMenu from "../menu/Menu";

let getItem = (label, key, icon, children) => ({ key, icon, children, label });

const SidebarMenu = () => {
    const [items, setItems] = useState([
        getItem('Navigation One', '1', <ProfileOutlined />),
        getItem('Navigation Two', '2', <FolderOutlined />),
        getItem('Navigation Two', 'sub1', <FolderOutlined />, [
            getItem('Option 3', '3'),
            getItem('Option 4', '4'),
            getItem('Submenu', 'sub1-2', <FolderOutlined />, [
                getItem('Option 5', '5'),
                getItem('Option 6', '6')
            ]),
        ]),
        getItem('Navigation Three', 'sub2', <FolderOutlined />, [
            getItem('Option 7', '7'),
            getItem('Option 8', '8'),
            getItem('Option 9', '9'),
            getItem('Option 10', '10'),
        ]),
        getItem('Navigation Four', 'sub3', <FolderOutlined />, [
            getItem('Option 11', '11'),
            getItem('Option 12', '12'),
            getItem('Submenu', 'sub3-4', <FolderOutlined />, [
                getItem('Option 13', '13'),
                getItem('Option 14', '14')
            ]),
        ]),
    ]);
    const [folderModalVisible, setFolderModalVisible] = useState(false);
    const [pageModalVisible, setPageModalVisible] = useState(false);
    const [folderValue, setFolderValue] = useState('');
    const [pageValue, setPageValue] = useState('');
    const [parentKey, setParentKey] = useState(null);
    const [deleteKey, setDeleteKey] = useState(null);
    const [notes, setNotes] = useState([])
    const [files, setFiles] = useState([]);
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        const loadFolders = async () => {
            try {
                const folderData = await queryDocuments("folders", "owner", "==", "tung");
                setFolders(folderData);
            } catch (error) {
                console.log(error);
            }
        };

        loadFolders();
    }, []);

    const handleMenuClick = ({ key }) => {
        if (key === 'createSubfolder') {
            setFolderModalVisible(true);
        } else if (key === 'deleteFolder') {
        } else if (key === 'createNewPage') {
            setPageModalVisible(true);
        }
        // else {
        //     const selectedItem = findLabelByKey(items, key);
        //     if (selectedItem) {
        //         const urlTitle = convertToSlug(selectedItem.label)
        //         navigate(`/note/${urlTitle}`, {
        //             state: {
        //                 key: key,
        //                 title: selectedItem.label
        //             }
        //         });
        //     }
        // }
    };


    const handleModalOk = async () => {
        if (folderValue) {
            const folderData = {
                files: [],
                notes: [],
                owner: "tung",
                folder_name: folderValue
            }
            console.log(folderData)
            await createDocument("folders", folderData);
            setFolderModalVisible(false);
            setParentKey(null);
        }
        // if (pageValue) {
        //    const newKey = `${parentKey}-${items.length + 1}`;
        //    const newItem = getItem(pageValue, newKey, <ProfileOutlined />);
        //    const updatedItems = items.map(item =>
        //       item.key === parentKey ? {
        //          ...item,
        //          children: item.children ? [...item.children, newItem] : [newItem]
        //       } : item
        //    );
        //    setItems(updatedItems);
        //    setPageValue('');
        //    setPageModalVisible(false);
        //    setParentKey(null);
        // }
    };

    const findLabelByKey = (items, key) => {
        for (const item of items) {
            if (item.key === key) {
                return { key, label: item.label };
            }
            if (item.children) {
                const label = findLabelByKey(item.children, key);
                if (label) {
                    return { key, label };
                }
            }
        }
        return undefined;
    };


    const convertToSlug = (text) => {
        return String(text).toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }
    const handleCreateNewFolder = () => {
        setFolderModalVisible(true);
    };
    const handleCreateNewPage = () => {
        setPageModalVisible(true);
    };


    return (
        <div>
            <div className='new-item-btn-container'>
                <Tooltip title="New folder">
                    <Button className="btn-new-item" icon={<FolderAddOutlined />}
                        onClick={() => handleCreateNewFolder(null)} />
                </Tooltip>
                <Tooltip title="New canvas">
                    <Button className="btn-new-item" icon={<AppstoreAddOutlined />} />
                </Tooltip>
            </div>

            {folders.map((data) =>
                <TeTuMenu folderData={data} />
            )
            }
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
            <Modal
                title="Create New Page"
                open={pageModalVisible}
                onOk={handleModalOk}
                onCancel={() => setPageModalVisible(false)}
            >
                <Input
                    value={pageValue}
                    onChange={e => setPageValue(e.target.value)}
                    placeholder="Page Name"
                />
            </Modal>
        </div>
    );
};
export default SidebarMenu;