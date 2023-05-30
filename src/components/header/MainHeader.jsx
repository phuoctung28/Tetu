import React from 'react';
import logo from '../../assets/images/logo.png';
import { Breadcrumb, Button, Input, Popconfirm, Tooltip } from 'antd';
import { PushpinOutlined, SplitCellsOutlined, RestOutlined } from '@ant-design/icons';
import '../../assets/styles/main_header.css';

const { Search } = Input;

const onSearch = (value) => {
   console.log(value);
};

const MainHeader = ({ showButton = false, dualNote, handleToggleDualNote }) => {
   const handleLogoClick = () => {
      window.location.href = '/home';
   };
   return (
      <div className='header-container'>
         <div className='header-left'>
            <a href="/home" className='btn-logo' onClick={handleLogoClick}>
               <img src={logo} alt="logo tetu" />
            </a>
            <Breadcrumb
               className='breadcrumb'
               items={[
                  { title: <a href="/home">Home</a>, },
                  { title: <a href="/home">Application Center</a>, },
                  { title: 'An Application', },
               ]} />
         </div>
         <div>
            <Tooltip title="Pin note">
               <Button className='btn-toolbar' shape="circle" icon={<PushpinOutlined style={{ color: '#596A77' }} />} />
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
               <Button className='btn-toolbar' shape="circle" icon={<RestOutlined style={{ color: '#596A77' }} />} />
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
      </div >
   );
};

export default MainHeader;