import { useNavigate } from "react-router-dom";
import { Button, Popconfirm, Tooltip, message } from 'antd';
import '../../assets/styles/sidebar.css';
import { CreditCardOutlined, UserOutlined, HistoryOutlined, LogoutOutlined } from '@ant-design/icons';
import { auth } from "../../services/firebase";

const NewItem = () => {
    const navigate = useNavigate();
    const signOut = () => {
        auth.signOut().then(() => {
            localStorage.removeItem("user");
            navigate("/");
            message.success("Logout success!")
        }).catch((error) => {
            throw new Error("Error signing out")
        }
        )
    };
    return (
        <div className='new-item-container'>
            <Button className="new-item" type="text" icon={<UserOutlined />} >
                Profile
            </Button>
            <Button className="new-item" type="text" icon={<CreditCardOutlined />} onClick={() => { navigate("/pricing") }}>
                Choose plan
            </Button>
            <Button className="new-item" type="text" icon={<HistoryOutlined />} >
                Transactions
            </Button>
            <Popconfirm
                title="Confirm log out?"
                onConfirm={signOut}
                // onCancel={cancel}
                placement="right"
                okText="Yes"
                cancelText="No">
                <Button className="new-item" type="text" icon={<LogoutOutlined />}>
                    Sign out
                </Button>
            </Popconfirm>

        </div >
    );
};
export default NewItem;