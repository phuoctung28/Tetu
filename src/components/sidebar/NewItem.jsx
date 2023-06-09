import { useNavigate } from "react-router-dom";
import { Button, Popconfirm, message, Tooltip } from 'antd';
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
            <Button className="new-item" type="text" icon={<UserOutlined />} onClick={() => { navigate("/user-profile") }} >
                Profile
            </Button>
            <Button className="new-item" type="text" icon={<CreditCardOutlined />} onClick={() => { navigate("/pricing") }}>
                Choose plan
            </Button>
            <Tooltip placement="right" title="This feature is in development" >
                <Button className="new-item" type="text" icon={<HistoryOutlined />} >
                    Transactions
                </Button>
            </Tooltip>

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