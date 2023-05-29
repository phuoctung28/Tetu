import { Breadcrumb, Button, Input } from 'antd';
import '../../assets/styles/main_header.css';
import { PushpinOutlined, SplitCellsOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Search } = Input;
const onSearch = (value) => console.log(value);

const MainHeader = ({ dualNote, handleToggleDualNote }) => {
   // const [dualNote, setDualNote] = useState(false);

   // const handleToggleDualNote = () => {
   //    setDualNote(!dualNote);
   // }

   return (
      <div className='header-container'>
         <div className='header-left'>
            <a href="/home" className='btn-logo' >
               <img src="logo.png" alt="logo" />
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
            <Button className='btn-toolbar' shape="circle" icon={<PushpinOutlined style={{ color: '#596A77' }} />} />
            <Button
               type={dualNote ? "primary" : "default"}
               className='btn-toolbar'
               icon={<SplitCellsOutlined size="large" style={{ color: dualNote ? '#fff' : '#596A77' }} />}
               onClick={handleToggleDualNote}
            >
               Dual Note
            </Button>
            {/* <PushpinOutlined className='icon' /> */}
            <Search
               placeholder="Search..."
               onSearch={onSearch}
               style={{
                  width: 200,
               }}
               size='middle'
            />
         </div>
      </div >
   );
};
export default MainHeader;