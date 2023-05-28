import { Breadcrumb, Button, Input } from 'antd';
import '../../assets/styles/main_header.css';
import { PushpinOutlined } from '@ant-design/icons';

const { Search } = Input;
const onSearch = (value) => console.log(value);

const MainHeader = () => {
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