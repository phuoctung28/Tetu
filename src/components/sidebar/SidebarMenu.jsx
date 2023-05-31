import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Input, Menu, Modal, Button, Tooltip } from 'antd';
import { ProfileOutlined, FolderOutlined, EllipsisOutlined, FileAddOutlined, FolderAddOutlined, AppstoreAddOutlined } from '@ant-design/icons';

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
      // getItem('Navigation Three', 'sub2', <FolderOutlined />, [
      //    getItem('Option 7', '7'),
      //    getItem('Option 8', '8'),
      //    getItem('Option 9', '9'),
      //    getItem('Option 10', '10'),
      // ]),
      // getItem('Navigation Four', 'sub3', <FolderOutlined />, [
      //    getItem('Option 11', '11'),
      //    getItem('Option 12', '12'),
      //    getItem('Submenu', 'sub3-4', <FolderOutlined />, [
      //       getItem('Option 13', '13'),
      //       getItem('Option 14', '14')
      //    ]),
      // ]),
   ]);
   const [folderModalVisible, setFolderModalVisible] = useState(false);
   const [pageModalVisible, setPageModalVisible] = useState(false);
   const [folderValue, setFolderValue] = useState('');
   const [pageValue, setPageValue] = useState('');
   const [parentKey, setParentKey] = useState(null);
   const [deleteKey, setDeleteKey] = useState(null);
   const navigate = useNavigate();

   const handleMenuClick = ({ key }) => {
      if (key === 'createSubfolder') {
         setFolderModalVisible(true);
         setParentKey(deleteKey);
      } else if (key === 'deleteFolder') {
         deleteFolder(deleteKey);
      } else if (key === 'createNewPage') {
         setPageModalVisible(true);
         setParentKey(deleteKey);
      } else {
         const selectedItem = findLabelByKey(items, key);
         if (selectedItem) {
            const urlTitle = convertToSlug(selectedItem.label)
            navigate(`/note/${urlTitle}`, {
               state: {
                  key: key,
                  title: selectedItem.label
               }
            });
         }
      }
   };

   function convertToSlug(Text) {
      return String(Text).toLowerCase()
         .replace(/ /g, '-')
         .replace(/[^\w-]+/g, '');
   }

   const handleCreateNewFolder = (parentKey) => {
      setFolderModalVisible(true);
      // setParentKey(parentKey);

   };

   const handleCreateNewPage = (parentKey) => {
      setPageModalVisible(true);
      setParentKey(parentKey);
   };

   const handleModalOk = () => {
      console.log("new folder: ", folderValue);
      items.push(getItem(folderValue, items.length + 1, <FolderOutlined />));
      setFolderModalVisible(false);
      // if (folderValue) {
      //    const newKey = `${parentKey}-${items.length + 1}`;
      //    const newItem = getItem(folderValue, newKey, <FolderOutlined />);
      //    const updatedItems = items.map(item =>
      //       item.key === parentKey ? {
      //          ...item,
      //          children: item.children ? [...item.children, newItem] : [newItem]
      //       } : item
      //    );
      //    setItems(updatedItems);
      //    setFolderValue('');
      //    setFolderModalVisible(false);
      //    setParentKey(null);
      // }
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

   const deleteFolder = (deleteKey) => {
      const updatedItems = items.filter(item => item.key !== deleteKey);
      setItems(updatedItems);
      setDeleteKey(null);
   };

   const renderMenuItem = ({ key, label, icon, children }) => {
      if (children) {
         return (
            <Menu.SubMenu key={key} title={label} icon={icon}>
               {children.map(childItem => renderMenuItem(childItem))}
               <Menu.Divider />
               <Menu.Item key="createSubfolder" onClick={() => handleCreateNewFolder(key)}>
                  Create Subfolder
               </Menu.Item>
            </Menu.SubMenu>
         );
      }
      return (
         <Menu.Item key={key} icon={icon}>
            {label}
            <Dropdown
               overlay={
                  <Menu>
                     <Menu.Item key="createSubfolder" onClick={() => handleCreateNewFolder(key)}>
                        Create Subfolder
                     </Menu.Item>
                     <Menu.Item key="createNewPage" onClick={() => handleCreateNewPage(key)}>
                        Create Page
                     </Menu.Item>
                     <Menu.Item key="deleteFolder" onClick={() => setDeleteKey(key)}>
                        Delete Folder
                     </Menu.Item>
                  </Menu>
               }
               trigger={['click']}
            >
               <span style={{ float: 'right' }}>
                  <EllipsisOutlined />
               </span>
            </Dropdown>
         </Menu.Item>
      );
   };

   const renderMenuItems = (items) => {
      return items.map(item => renderMenuItem(item));
   };

   return (
      <div>
         <div className='new-item-btn-container'>
            <Tooltip title="New folder">
               <Button className="btn-new-item" icon={<FolderAddOutlined />} onClick={() => handleCreateNewFolder(null)} />
            </Tooltip>
            <Tooltip title="New note">
               <Button className="btn-new-item" icon={<FileAddOutlined />} />
            </Tooltip>
            <Tooltip title="New canvas">
               <Button className="btn-new-item" icon={<AppstoreAddOutlined />} />
            </Tooltip>
         </div >
         <Menu
            style={{ width: 200 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="light"
            onClick={handleMenuClick}
         >
            {renderMenuItems(items)}
         </Menu>

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