import { ProfileOutlined, FolderOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
let getItem = (label, key, icon, children) => ({ key, icon, children, label });

const items = [
   getItem('Navigation One', '1', <ProfileOutlined />), // icon for note file
   getItem('Navigation Two', '2', <FolderOutlined />), // icon for session (directory)
   getItem('Navigation Two', 'sub1', <FolderOutlined />, [ // nested directory
      getItem('Option 3', '3'),
      getItem('Option 4', '4'),
      getItem('Submenu', 'sub1-2', <FolderOutlined />, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
   ]),
   getItem('Navigation Three', 'sub2', <FolderOutlined />, [
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
   ]),
   getItem('Navigation Four', 'sub3', <FolderOutlined />, [ // nested directory
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
      getItem('Submenu', 'sub3-4', <FolderOutlined />, [
         getItem('Option 13', '13'),
         getItem('Option 14', '14')]),
   ]),
];

const SideMenu = () => {
   // const [mode, setMode] = useState('inline');
   // const [theme, setTheme] = useState('light');
   // const changeMode = (value) => {
   //   setMode(value ? 'vertical' : 'inline');
   // };
   // const changeTheme = (value) => {
   //   setTheme(value ? 'dark' : 'light');
   // };
   return (
      <>
         {/* <Switch onChange={changeMode} /> Change Mode */}
         {/* <Divider type="vertical" /> */}
         {/* <Switch onChange={changeTheme} /> Change Style */}

         <Menu
            style={{
               width: 200,
            }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode={'inline'}
            theme={'light'}
            items={items}
         />
      </>
   );
};
export default SideMenu;