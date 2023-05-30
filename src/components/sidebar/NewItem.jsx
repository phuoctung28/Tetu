import { useNavigate } from "react-router-dom";
import { Button } from 'antd';
import '../../assets/styles/sidebar.css';
import { CreditCardOutlined, UserOutlined, HistoryOutlined } from '@ant-design/icons';

const NewItem = () => {
   const navigate = useNavigate();
   return (
      <div className='new-item-container'>
         <Button className="new-item" type="text" icon={<UserOutlined />} >
            Profile
         </Button>
         <Button className="new-item" type="text" icon={<CreditCardOutlined /> } onClick={() => { navigate("/pricing") }}>
            Choose plan
         </Button>
         <Button className="new-item" type="text" icon={<HistoryOutlined />} >
            Transactions
         </Button>
      </div >
   );
};
export default NewItem;