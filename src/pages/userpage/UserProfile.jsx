import React, { useEffect, useState } from 'react'
import { Avatar, Descriptions, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './user_profile.css'
import Sidebar from '../../components/sidebar/Sidebar';
import MainHeader from '../../components/header/MainHeader';
import { getDocumentById } from '../../services/firebase';

const { Content } = Layout;

const UserProfile = () => {
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

    return (
        <Layout hasSider>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: 200, }} >
                <MainHeader />
                <Content className="profile-container">
                    <div className="profile-wrapper">
                        <Avatar
                            shape="circle"
                            style={{ verticalAlign: 'middle', marginRight: 10 }}
                            size={70}
                            gap={4}
                            src={user?.profilePic}>
                            {/* {user?.profilePic ? '' : user.name.split(' ').at(-1).charAt(0)} */}
                        </Avatar>
                        <Descriptions title="User Info">
                            <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
                            <Descriptions.Item label=""></Descriptions.Item>
                            <Descriptions.Item label=""></Descriptions.Item>
                            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                            <Descriptions.Item label=""></Descriptions.Item>
                            <Descriptions.Item label=""></Descriptions.Item>
                            <Descriptions.Item label="Account Type">
                                {
                                    user?.accountType === "premium"
                                        ? <span style={{ color: "#EFBF0C", fontWeight: 700 }}>Premium</span>
                                        : <span style={{ color: "#577690", fontWeight: 700 }}>Basic</span>
                                }
                            </Descriptions.Item>

                        </Descriptions>
                    </div>
                </Content>
            </Layout>
        </Layout >
    )
}

export default UserProfile;