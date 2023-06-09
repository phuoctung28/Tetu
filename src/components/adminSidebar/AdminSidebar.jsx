import { Button, Layout, Avatar, Tooltip, Divider, message, Popover, Popconfirm, Modal } from 'antd';
import { InfoCircleOutlined, EllipsisOutlined, TableOutlined, ShareAltOutlined, CalendarOutlined, HomeOutlined, FieldTimeOutlined, BellOutlined, CustomerServiceOutlined, UnorderedListOutlined, FileSyncOutlined } from '@ant-design/icons';
import { getDocumentById } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../../assets/styles/sidebar.css";
import { UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import NewItem from '../sidebar/NewItem';
const { Sider } = Layout;
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('User', 'user', <UserOutlined />),
    getItem('Order', 'order', <UnorderedListOutlined />),
    // getItem('Transaction', 'trans', <FieldTimeOutlined />),
    getItem('Bill', 'bill', <FileSyncOutlined />),
    getItem('Notification', 'noti', <BellOutlined />),
    getItem('Customer Support', 'support', <CustomerServiceOutlined />),
    getItem('Private Info', 'info', <InfoCircleOutlined />),
    getItem('Setting', 'setting', <SettingOutlined />),
];

const AdminSidebar = ({ currentPage, currentTitle, pageMenu, selectedMenuItem }) => {

    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem("user"));
    // console.log(currentUser);
    const [user, setUser] = useState({});
    useEffect(() => {
        const loginUser = JSON.parse(localStorage.getItem("user"));
        // console.log("login user: ", loginUser);
        const fetchUser = async () => {
            try {
                const fetchedUser = await getDocumentById("users", loginUser.user_id.trim());
                setUser(fetchedUser);
                // console.log("USER: ", fetchedUser);
            } catch (error) {
                console.log("Error fetch user")
            }
        }
        fetchUser();
    }, []);

    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    // console.log(currentUser);
    const onClick = (e) => {
        console.log('click ', e.keyPath[0]);
        if (e.keyPath[0] === 'user') navigate("/dashboard");
        if (e.keyPath[0] === 'order') navigate("/manage-order");
    };
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
                <Button block size="small" type={pageMenu && pageMenu === "home" ? "primary" : "text"} icon={<HomeOutlined />} onClick={() => {
                    navigate("/home")
                }} >
                    Homepage
                </Button>
                <Button block size="small" type={pageMenu && pageMenu === "table" ? "primary" : "text"} icon={<TableOutlined />} onClick={() => {
                    navigate("/table")
                }} >
                    Table view
                </Button>
                <Button block size="small" type={pageMenu && pageMenu === "calendar" ? "primary" : "text"} icon={<CalendarOutlined />} onClick={() => {
                    navigate("/calendar")
                }} >
                    Calendar view
                </Button>
                {user.accountType === "premium"
                    ?
                    <Button block size="small" type={pageMenu && pageMenu === "graph" ? "primary" : "text"} icon={<ShareAltOutlined />} onClick={() => {
                        navigate("/graph")
                    }} >
                        Graph view
                    </Button>
                    : <></>
                }
                <Popover
                    content={<NewItem />}
                    placement='rightTop'
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                >

                    <Button block size="small" type={pageMenu && pageMenu === "more" ? "primary" : "text"} icon={<EllipsisOutlined />}>
                        More
                    </Button>
                </Popover>
            </div>
            <Divider />
            {/* <SideMenu /> */}
            <Menu
                onClick={onClick}
                style={{ width: 199, }}
                defaultSelectedKeys={['user']}
                selectedKeys={[selectedMenuItem]}
                mode="inline"
                items={items}
            />
        </Sider >
    );
};
export default AdminSidebar;