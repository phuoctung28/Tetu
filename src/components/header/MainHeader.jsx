import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png';
import { Breadcrumb, Button, Input, Popconfirm, Tooltip } from 'antd';
import { PushpinOutlined, SplitCellsOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import '../../assets/styles/main_header.css';

const { Search } = Input;

const onSearch = (value) => {
    console.log(value);
};

const MainHeader = ({ showButton = false, dualNote, handleToggleDualNote, noteData }) => {
    const handleLogoClick = () => {
        window.location.href = '/home';
    };
    const [crumbItem, setCrumbItem] = useState([]);
    useEffect(() => {
        if (noteData) {
            const crumbs = [noteData.location, noteData.title].map(crumb => {
                return { title: <span>{crumb}</span> }
            });
            setCrumbItem(crumbs);
        }
    }, [noteData]);

    return (
        <div className='header-container'>
            <div className='header-left'>
                <a href="/home" className='btn-logo' onClick={handleLogoClick}>
                    <img src={logo} alt="logo tetu" />
                </a>
                {noteData && <Breadcrumb
                    className='breadcrumb'
                    items={crumbItem} />
                }
            </div>
            <div>
                <Tooltip title="Pin note">
                    <Button className='btn-toolbar' shape="circle"
                        icon={<PushpinOutlined style={{ color: '#596A77' }} />} />
                </Tooltip>
                <Tooltip title="Save">
                    <Button className='btn-toolbar' shape="circle"
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
                <Search
                    placeholder="Search..."
                    onSearch={onSearch}
                    style={{ width: 200, }}
                    size='middle'
                />
            </div>
        </div>
    );
};

export default MainHeader;