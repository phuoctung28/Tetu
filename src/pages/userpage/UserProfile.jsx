import React, { useEffect, useState } from 'react'
import { Avatar, Button, Col, Descriptions, Divider, Layout, List, Progress, Row, Select, Switch } from 'antd';
import { CloudOutlined, LogoutOutlined, CloseOutlined, DeleteOutlined, ExportOutlined, EditOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import './user_profile.css'
import Sidebar from '../../components/sidebar/Sidebar';
import MainHeader from '../../components/header/MainHeader';
import { getDocumentById } from '../../services/firebase';

const { Content } = Layout;

const UserProfile = ({setIsDarkMode}) => {
    const [user, setUser] = useState({});
    const [usedStorage, setUsedStorage] = useState(14);
    const currentUser = JSON.parse(localStorage.getItem("user"));
    console.log("current user: ", currentUser);
    useEffect(() => {
        const loginUser = JSON.parse(localStorage.getItem("user"));
        console.log("login user: ", loginUser);
        const fetchUser = async () => {
            try {
                const fetchedUser = await getDocumentById("users", loginUser.user_id.trim());
                setUser(fetchedUser);
                console.log("USER: ", fetchedUser);
            } catch (error) {
                console.log("Error fetch user")
            }
        }

        fetchUser();
        document.title = `${currentUser.name}'s Profile`;
    }, []);


    const data = [
        { title: 'Ant Design Title 1', },
        { title: 'Ant Design Title 2', },
        { title: 'Ant Design Title 3', },
        { title: 'Ant Design Title 4', },
        { title: 'Ant Design Title 5', },
        { title: 'Ant Design Title 6', },
        { title: 'Ant Design Title 7', },
        { title: 'Ant Design Title 8', },
    ];
    return (
        <Layout hasSider>
            <Sidebar pageMenu={"more"} />
            <Layout className="site-layout" style={{ marginLeft: 200, }} >
                <MainHeader setIsDarkMode={setIsDarkMode}/>
                <Content className="profile-container">
                    <Row>
                        <Col span={7}>
                            <div className="profile-card profile-intro-card">
                                <div className="intro-card-cover">
                                </div>
                                <div className="profile-info">
                                    <Avatar
                                        className="intro-card-ava"
                                        shape="circle"
                                        style={{ verticalAlign: 'middle', marginRight: 10 }}
                                        size={70}
                                        gap={4}
                                        src={currentUser?.profilePic}>
                                        {currentUser?.profilePic ? '' : currentUser?.name.split(' ').at(-1).charAt(0)}
                                    </Avatar>
                                    <div className="profile-name">{user.name}</div>
                                    <div className="profile-role">Student</div>
                                </div>
                                <div className="intro-card-stat">
                                    <div className="intro-card-stat-item">
                                        <div>05</div>
                                        <div>Sessions</div>
                                    </div>
                                    <div className="intro-card-stat-item">
                                        <div>17</div>
                                        <div>Notes</div>
                                    </div>
                                    <div className="intro-card-stat-item">
                                        <div>13</div>
                                        <div>Files</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className="profile-card profile-storage-card">
                                <div className="storage-card-top">
                                    <div className="storage-icon-ctn">
                                        <CloudOutlined className="storage-icon" />
                                    </div>
                                    <div className="storage-msg">
                                        <div>Your storage</div>
                                        <div>Supervise you drive space in the <br />easiest way</div>
                                    </div>
                                </div>
                                <div className="storage-progress">
                                    <div className="storage-amount-number"> {usedStorage} / 50 GB </div>
                                    <Progress
                                        percent={usedStorage / 50 * 100}
                                        status="active"
                                        strokeColor={{
                                            '0%': '#00ccff',
                                            '100%': '#0084ff',
                                        }}
                                        showInfo={false} />
                                </div>
                            </div>
                        </Col>
                        <Col span={10}>
                            <div className="profile-card profile-setting">
                                <div className="profile-section-title">Settings</div>
                                <div className="profile-item">
                                    <div className="profile-item-title">
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="profile-item-content">
                                        Receive letters, news and updates via email
                                    </div>
                                </div>
                                <div className="profile-item">
                                    <div className="profile-item-title">
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="profile-item-content">
                                        Support Access
                                    </div>
                                </div>
                                <div className="profile-item">
                                    <div className="profile-item-title">
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="profile-item-content">
                                        Mobile notifications
                                    </div>
                                </div>
                                <div className="profile-item">
                                    <div className="profile-item-title">
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="profile-item-content">
                                        Open links in desktop app
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7}>
                            <div className="profile-card profile-wrapper profile-info-card">
                                <div className="profile-section-title">Personal</div>
                                <div className="profile-desc">
                                    Hi, I’m {currentUser.name}, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality). <Button type="text" icon={<EditOutlined />} />
                                </div>
                                <div className="profile-item">
                                    <div className="profile-item-title">Email</div>
                                    <div className="profile-item-content">{user.email} <Button type="text" icon={<EditOutlined />} /></div>
                                </div>
                                <div className="profile-item">
                                    <div className="profile-item-title">Password</div>
                                    <div className="profile-item-content">
                                        <Button type="default" icon={<LockOutlined />}>Change password</Button>
                                    </div>
                                </div>
                                <div className="profile-item">
                                    <div className="profile-item-title">Birthday</div>
                                    <div className="profile-item-content">
                                        31-01-2002
                                    </div>
                                </div>
                                <div className="profile-item">
                                    <div className="profile-item-title">Gender</div>
                                    <div className="profile-item-content">
                                        <Select
                                            defaultValue="na"
                                            style={{ width: 120, }}
                                            options={[
                                                { value: 'na', label: 'N/A', },
                                                { value: 'male', label: 'Male', },
                                                { value: 'female', label: 'Female', },
                                            ]}
                                        />
                                    </div>
                                </div>
                                <div className="profile-item">
                                    <div className="profile-item-title">Phone</div>
                                    <div className="profile-item-content">N/A <Button type="text" icon={<EditOutlined />} /></div>
                                </div>
                                <div className="profile-item">
                                    <div className="profile-item-title">Address</div>
                                    <div className="profile-item-content">N/A <Button type="text" icon={<EditOutlined />} /></div>
                                </div>
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className="profile-card profile-wrapper account-card">
                                <div className="profile-section-title">Account</div>
                                <div className="profile-item">
                                    <div className="profile-item-title">Current Plan</div>
                                    <div className="profile-item-content">
                                        {
                                            user?.accountType === "premium"
                                                ? <span style={{ color: "#EFBF0C", fontWeight: 700 }}>Premium</span>
                                                : <span style={{ color: "#577690", fontWeight: 700 }}>Basic</span>
                                        }
                                    </div>
                                </div>
                                <div className="profile-item">
                                    <div className="profile-item-title">
                                        Export
                                    </div>
                                    <div className="profile-item-content profile-item-ctn">
                                        <Button icon={<ExportOutlined />} >
                                            Export documents data
                                        </Button>
                                    </div>
                                </div>
                                <div className="profile-item logout-section">
                                    <div className="profile-item-title">Log out</div>
                                    <div className="profile-item-content profile-item-ctn ">
                                        <Button icon={<LogoutOutlined />}>This device</Button>
                                        <Button icon={<LogoutOutlined />}>All devices</Button>
                                    </div>
                                </div>
                                <div className="profile-item">
                                    <div className="profile-item-title">Danger</div>
                                    <div className="profile-item-content profile-item-ctn">
                                        <Button danger icon={<DeleteOutlined />}>Delete this account</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={10}>
                            <div className="profile-card notification-section notification-card">
                                <div className="profile-section-title">Notifications</div>
                                <div className="noti-list-wrapper">
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={data}
                                        renderItem={(item, index) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                                    title={<a href="https://ant.design">{item.title}</a>}
                                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout >
        </Layout >
    )
}

export default UserProfile;