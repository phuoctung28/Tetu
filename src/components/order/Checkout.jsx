import { useState } from "react";
import { Button, Divider, Input, Modal, Popconfirm, Space } from "antd";
import "../../assets/styles/checkout_form.css";
import qrPayment from "../../assets/images/qrpayment.jpg";
import moment from 'moment/moment';
import { createDocument } from "../../services/firebase";

const CheckoutForm = ({ name, email, userId }) => {
    // console.log("Checkout User", name, email, userId);
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleCheckout = () => {
        showModal();
    };

    const handlePhoneInput = (event) => {
        console.log("PHONE:", event.target.value)
        setPhone(event.target.value);
    }

    const handleAddressInput = (event) => {
        console.log("ADDRESS:", event.target.value)
        setAddress(event.target.value);
    }

    const handleFinishPayment = async () => {
        try {
            const newOrder = {
                userId: userId,
                name: name,
                email: email,
                phone: phone,
                address: address,
                status: "paid",
                createdDate: moment(new Date()).format("DD/MM/YYYY"),
                processDate: "",
            }
            await createDocument("orders", newOrder);
        } catch (error) {
            console.log("Error save order data:", error)
        }
    }
    return (
        <div className="checkout-container">
            <div className="checkout-left">
                <h3>Complete Order Information</h3>
                <div>
                    <div className="checkout-item-title">Name</div>
                    <div className="checkout-item-content">{name}</div>
                </div>
                <div>
                    <div className="checkout-item-title">Email</div>
                    <div className="checkout-item-content">{email}</div>
                </div>
                <div>
                    <div className="checkout-item-title">Phone</div>
                    <div className="checkout-item-content">
                        <Input
                            value={phone}
                            placeholder="+84..."
                            onChange={handlePhoneInput} />
                    </div>
                </div>
                <div>
                    <div className="checkout-item-title">Address</div>
                    <div className="checkout-item-content">
                        <Input
                            value={address}
                            onChange={handleAddressInput}
                            placeholder="Your address here..." />
                    </div>
                </div>
                {/* <Divider />
                <Button block >Save Info</Button> */}
            </div>
            <div className="checkout-right">
                <div className="checkout-right-title">Your cart</div>
                <div className="cart">
                    <div className="cart-item">
                        <div className="cart-item-info">
                            Tetu subscription <br />
                            <span>Premium Plan x 1</span>
                        </div>
                        <div className="cart-item-value">17.000đ</div>
                    </div>
                </div>
                <Divider />
                <div className="cart-total">
                    <div className="cart-total-title">Total</div>
                    <div className="cart-total-value">17.000đ</div>
                </div>
                <Popconfirm
                    placement="bottomRight"
                    title="Are you sure to buy this subscription plan?"
                    // description="Are you sure to buy this subscription plan?"
                    onConfirm={() => handleCheckout()}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button block type="primary">Checkout</Button>
                </Popconfirm>
            </div>
            <Modal
                // title="Scan this to finish payment"
                open={isModalOpen}
                onCancel={handleCancel}
                okText="I've finished payment!"
                onOk={() => setIsModalOpen(false)}
                width={900}
                footer={null}
            >
                <div className="qr-payment-container">
                    <img src={qrPayment} alt={"payment"} className='qrPayment' />
                    <div className="qr-payment-msg">
                        <h3>Scan this QR code to process payment via MOMO</h3>
                        Payment message
                        <br />
                        <pre>
                            [YOUR_EMAIL] - TETU PREMIUM
                        </pre>
                        <Space>
                            <Button onClick={handleFinishPayment} type="primary">I've finished payment</Button>
                            <Button>Cancel</Button>
                        </Space>
                    </div>
                </div>


            </Modal >
        </div >
    );
};
export default CheckoutForm;