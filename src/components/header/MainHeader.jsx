import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png';
import { Breadcrumb, Button, Popconfirm, Tooltip } from 'antd';
import { PushpinOutlined, SplitCellsOutlined, SaveOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import '../../assets/styles/main_header.css';
import { useNavigate } from 'react-router-dom';
import SearchComponent from "../Seach/Search";

const MainHeader = ({ showButton = false, dualNote, handleToggleDualNote, noteData, saveNoteContent }) => {
    const navigate = useNavigate();
    const [isSearchOpened, setIsSearchOpened] = useState(false);
    // const [crumbItem, setCrumbItem] = useState([]);
    // useEffect(() => {
    //     if (noteData) {
    //         const crumbs = [noteData.location, noteData.title].map(crumb => {
    //             return { title: <span>{crumb}</span> }
    //         });
    //         setCrumbItem(crumbs);
    //     }
    // }, [noteData]);
    const handleLogoClick = () => {
        navigate("/home")
    };
    const handleOpenSearch = () => {
        setIsSearchOpened(!isSearchOpened);
    };
    return (
        <div className='header-container'>
            <div className='header-left'>
                <a href="/home" className='btn-logo' onClick={handleLogoClick}>
                    <img src={logo} alt="logo tetu" />
                </a>
                {/* {noteData && <Breadcrumb
                    className='breadcrumb'
                    items={crumbItem} />
                } */}
            </div>
            <div>
                <Tooltip title="Pin note">
                    <Button className='btn-toolbar' shape="circle"
                        icon={<PushpinOutlined style={{ color: '#596A77' }} />} />
                </Tooltip>
                <Tooltip title="Save">
                    <Button
                        className='btn-toolbar'
                        shape="circle"
                        onClick={saveNoteContent}
                        icon={<SaveOutlined style={{ color: '#596A77' }} />} />
                </Tooltip>

                <Popconfirm
                    title="Confirm Delete"
                    description="Are you sure to delete this note?"
                    // onConfirm={signOut}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    {/* <Tooltip title="Delete note"> */}
                    <Button className='btn-toolbar' shape="circle" icon={<DeleteOutlined style={{ color: '#596A77' }} />} />
                    {/* </Tooltip> */}
                </Popconfirm>
                {
                    showButton && <Button
                        type={dualNote ? "primary" : "default"}
                        className='btn-toolbar'
                        icon={<SplitCellsOutlined size="large" style={{ color: dualNote ? '#fff' : '#596A77' }} />}
                        onClick={handleToggleDualNote}
                    >
                        Dual Note
                    </Button>
                }
                <Tooltip title="Search">
                    <Button className='btn-toolbar' shape="circle"
                        onClick={() => setIsSearchOpened(!isSearchOpened)}
                        icon={<SearchOutlined style={{ color: '#596A77' }} />} />
                </Tooltip>
                <SearchComponent isOpened={isSearchOpened} handleOpenSearch={handleOpenSearch} />
            </div>
        </div>
    );
};

export default MainHeader;