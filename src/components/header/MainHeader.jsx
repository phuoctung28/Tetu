import {Breadcrumb, Button, Input} from 'antd';
import {PushpinOutlined, ShareAltOutlined} from '@ant-design/icons';
import React from 'react';
import './main-header.css';

const {Search} = Input;

const onSearch = (value) => {
    console.log(value);
};

const MainHeader = () => {
    const handleLogoClick = () => {
        window.location.href = '/home';
    };

    return (
        <div className='header-container'>
            <div className='header-left'>
                <a href="/home" className='btn-logo' onClick={handleLogoClick}>
                    <img src="logo.png" alt="logo" style={{width: 30, height: 30, objectFit: 'fill',}}/>
                </a>
                <Breadcrumb className='breadcrumb'
                            items={
                                [
                                    {
                                        title: "Home"
                                    },
                                    {
                                        title: <a href="">Application Center</a>,
                                    },
                                    {
                                        title: <a href="">Application List</a>,
                                    },
                                    {
                                        title: <a href="">Application List</a>,
                                    }
                                ]
                            }
                >
                </Breadcrumb>
            </div>
            <div>
                <Button className='btn-toolbar' shape="circle" icon={<PushpinOutlined style={{color: '#596A77'}}/>}/>
                <Button className='btn-toolbar' shape="circle" icon={<ShareAltOutlined style={{color: '#596A77'}}/>}/>
                <Search
                    placeholder="Search..."
                    onSearch={onSearch}
                    style={{width: 200}}
                    size='middle'
                />
            </div>
        </div>
    );
};

export default MainHeader;