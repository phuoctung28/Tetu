import { Layout, Typography, Col, Row, Popover, message, Modal } from 'antd';
import { FileTwoTone, FolderAddTwoTone, FileTextTwoTone, StarTwoTone, AppstoreTwoTone, CalendarTwoTone, WalletTwoTone, SecurityScanTwoTone, ReadOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import MainHeader from '../../components/header/MainHeader';
import './home.css';
import ReadDocument from '../../components/popover/ReadDocument';
import Sidebar from '../../components/sidebar/Sidebar';
import ArticleList from '../../components/modal/ArticleList';
import canvas from '../../assets/images/canvas.gif';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text } = Typography;

const navItems = [
    // { title: 'Read Document', key: '1', icon: <FileTwoTone className='nav-icon' />, navLink: '' },
    { title: 'New Session', key: '2', icon: <FolderAddTwoTone className='nav-icon' />, navLink: '' },
    // { title: 'New Notebook', key: '3', icon: <BookTwoTone className='nav-icon' />, navLink: '/note' },
    // { title: 'New Canvas', key: '4', icon: <AppstoreTwoTone className='nav-icon' />, navLink: '' },
    { title: 'Graph View', key: '5', icon: <StarTwoTone className='nav-icon' />, navLink: '/graph' },
    { title: 'Calendar View', key: '6', icon: <CalendarTwoTone className='nav-icon' />, navLink: '/calendar' },

    { title: 'Citation Box', key: '7', icon: <WalletTwoTone className='nav-icon' />, navLink: '' },
    { title: 'Revision', key: '8', icon: <SecurityScanTwoTone className='nav-icon' />, navLink: '' },
];

const Home = ({ setIsDarkMode }) => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Home Page';
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const handleUploadFile = () => { };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const devMsg = (msgTitle) => message.info(msgTitle + " is in development!");

    const handleClickNavButton = (item) => {
        if (item.navLink.length === 0) {
            devMsg(item.title);
        }
        navigate(item.navLink);
    }

    return (
        <Layout hasSider>
            <Sidebar pageMenu="home" />

            <Layout className="site-layout" style={{ marginLeft: 200, }} >
                <MainHeader setIsDarkMode={setIsDarkMode} />
                <Content style={{ margin: '0', overflow: 'initial', }} >
                    <div className="home-container" >
                        <div style={{ marginBottom: 60 }}>
                            <Title className="section-title" level={4}>Quick Tools</Title>
                            <br />
                            <div>
                                <Row gutter={[30, 30]}>
                                    <Col className="gutter-row" span={6}>
                                        <Popover
                                            content={<ReadDocument />}
                                            trigger="click"
                                            open={open}
                                            placement="bottom"
                                            onOpenChange={handleOpenChange}
                                        >
                                            <button onClick={handleUploadFile} className='nav-btn' >
                                                <FileTwoTone className='nav-icon' />
                                                <Text className="nav-text" style={{ fontSize: '20px' }} strong>Read Document</Text>
                                            </button>
                                        </Popover>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <button onClick={() => setOpenModal(true)} className='nav-btn' >
                                            <FileTextTwoTone className='nav-icon' />
                                            <Text className="nav-text" style={{ fontSize: '20px' }} strong>Read Articles</Text>
                                        </button>
                                    </Col>
                                    <Col className="gutter-row" span={6}>
                                        <button onClick={showModal} className='nav-btn' >
                                            <AppstoreTwoTone className='nav-icon' />
                                            <Text className="nav-text" style={{ fontSize: '20px' }} strong>New Canvas</Text>
                                        </button>
                                    </Col>
                                    {navItems.map((item, index) => (
                                        <Col key={index} className="gutter-row" span={6}>
                                            <button onClick={() => handleClickNavButton(item)} className='nav-btn' >
                                                {item.icon}
                                                <Text className="nav-text" style={{ fontSize: '20px' }} strong>{item.title}</Text>
                                            </button>
                                        </Col>
                                    ))}

                                </Row>
                            </div>
                        </div>
                        <div style={{ marginBottom: 30 }}>
                            <Title className="section-title" level={4}>Recent Files</Title>
                            <br />
                            <div
                                style={{ width: '100%', height: 'fit-content', display: 'flex', flexDirection: 'column' }}
                            >
                                <img src={require("../../assets/images/empty_file.png")} className='empty-file-img' alt="empty file" />
                                <button className='quick-btn'>
                                    Open File (Ctrl + O)
                                </button>
                                <button className='quick-btn'>
                                    New Note (Ctrl + N)
                                </button>
                            </div>
                        </div>
                    </div>
                    <Modal
                        title="Choose an article"
                        centered
                        open={openModal}
                        onOk={() => setOpenModal(false)}
                        onCancel={() => setOpenModal(false)}
                        footer={null}
                        width={"fit-content"}
                        style={{ zIndex: 1000 }}
                    >
                        <ArticleList />
                    </Modal>
                    <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={700} footer={null}>
                        <div className="canvas-modal">
                            <h2>Canvas board is in development</h2>
                            <img className="canvas-img" src={canvas} alt="loading..." />
                            <p>Stay tuned!</p>
                        </div>
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Home;