import React, { useEffect, useState } from 'react'
import { Avatar, Button, Col, Descriptions, Divider, Layout, Row } from 'antd';
import { LogoutOutlined, CloseOutlined, DeleteOutlined, ExportOutlined, EditOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import './user_profile.css'
import Sidebar from '../../components/sidebar/Sidebar';
import MainHeader from '../../components/header/MainHeader';
import { getDocumentById } from '../../services/firebase';

const { Content } = Layout;

const UserProfile = () => {
    const [user, setUser] = useState({});
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
    }, []);

    return (
        <Layout hasSider>
            <Sidebar pageMenu={"more"} />
            <Layout className="site-layout" style={{ marginLeft: 200, }} >
                <MainHeader />
                <Content className="profile-container">
                    <div className="profile-wrapper">
                        <h2>Your profile</h2>
                        <Divider />

                        <div className="profile-header">
                            <div className="profile-name">
                                <div className="fullname-title">Name</div>
                                <div className="fullname">{user.name}</div>
                            </div>
                            <Avatar
                                shape="circle"
                                style={{ verticalAlign: 'middle', marginRight: 10 }}
                                size={70}
                                gap={4}
                                src={currentUser?.profilePic}>
                                {currentUser?.profilePic ? '' : currentUser?.name.split(' ').at(-1).charAt(0)}
                            </Avatar>
                        </div>
                        <Divider />
                        <div className="profile-section-title">Personal</div>
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
                            <div className="profile-item-title">Phone</div>
                            <div className="profile-item-content">N/A <Button type="text" icon={<EditOutlined />} /></div>
                        </div>
                        <div className="profile-item">
                            <div className="profile-item-title">Address</div>
                            <div className="profile-item-content">N/A <Button type="text" icon={<EditOutlined />} /></div>
                        </div>
                        <Divider />
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
                                Export documents data
                                <Button type="text" icon={<ExportOutlined />} />
                            </div>
                        </div>
                        <div className="profile-item">
                            <div className="profile-item-title">Log out</div>
                            <div className="profile-item-content profile-item-ctn">
                                <Button icon={<LogoutOutlined />}>Log out</Button>
                                <Button icon={<LogoutOutlined />}>Log out from all devices</Button>
                            </div>
                        </div>
                        <div className="profile-item">
                            <div className="profile-item-title">Delete account</div>
                            <div className="profile-item-content profile-item-ctn">
                                <Button danger icon={<DeleteOutlined />}>Delete this account</Button>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout >
    )
}

export default UserProfile;