import { Button, Layout, Avatar, Tooltip, Divider, message, Popover, Popconfirm, Modal } from 'antd';
import { EllipsisOutlined, TableOutlined, ShareAltOutlined, CalendarOutlined } from '@ant-design/icons';
import { auth } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SidebarMenu from './SidebarMenu';
import "../../assets/styles/sidebar.css";
import NewItem from './NewItem';

const { Sider } = Layout;

const Sidebar = ({ currentPage, currentTitle }) => {

    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("user"));
    // console.log(currentUser);

    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    // console.log(currentUser);
    return (
        <Sider className='home-sider' style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            background: 'white'
        }}>
            <div className='sider-top'
                style={{ margin: '0 0 10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Avatar
                    shape="square"
                    style={{ verticalAlign: 'middle', marginRight: 10 }}
                    size="small"
                    gap={4}
                    src={currentUser?.profilePic}>
                    {currentUser?.profilePic ? '' : currentUser?.name.split(' ').at(-1).charAt(0)}
                </Avatar>
                <p>{currentUser?.name}</p>
            </div>
            <div className='quicktool-container'>

                <Tooltip title="Table view">
                    <Button size="small" icon={<TableOutlined />} onClick={() => {
                        navigate("/table")
                    }} />
                </Tooltip>
                <Tooltip title="Calendar view">
                    <Button size="small" icon={<CalendarOutlined />} onClick={() => {
                        navigate("/calendar")
                    }} />
                </Tooltip>
                <Tooltip title="Graph view">
                    <Button size="small" icon={<ShareAltOutlined />} onClick={() => {
                        navigate("/graph")
                    }} />
                </Tooltip>
                <Popover
                    content={<NewItem />}
                    placement='rightTop'
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                >
                    <Button size="small" icon={<EllipsisOutlined />} />
                </Popover>
            </div>
            <Divider />
            {/* <SideMenu /> */}
            <SidebarMenu
                currentPage={currentPage}
                currentTitle={currentTitle}
            />
        </Sider>
    );
};
export default Sidebar;