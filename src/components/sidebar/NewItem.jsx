import { Button } from 'antd';
import '../../assets/styles/sidebar.css';
import { FileAddOutlined, FolderAddOutlined, AppstoreAddOutlined } from '@ant-design/icons';


const NewItem = () => {
   return (
      <div className='new-item-container'>
         <Button className="new-item" type="text" icon={<FileAddOutlined />}>
            New note
         </Button>
         <Button className="new-item" type="text" icon={<FolderAddOutlined />}>
            New folder
         </Button>
         <Button className="new-item" type="text" icon={<AppstoreAddOutlined />}>
            New canvas
         </Button>
      </div >
   );
};
export default NewItem;