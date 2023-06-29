import React, { useEffect, useState } from 'react'
import check from "../../assets/icons/check.svg";
import cross from "../../assets/icons/cross.svg";
import qrPayment from "../../assets/images/qrpayment.jpg";
import './pricing_page.css';
import { Modal, Switch, message } from "antd";
import { useNavigate } from 'react-router';
import CheckoutForm from '../../components/order/Checkout';
import { getDocumentById } from '../../services/firebase';

const PricingPlan = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const navigate = useNavigate();



    // useEffect(() => {
    //     setTimeout(() => {
    //         message.success("Update account type successfully! Now you are a premium user");
    //         navigate("/user-profile")
    //     }, 15000)
    // }, [isModalOpen])

    const fetchCurrentUser = async (user) => {
        try {
            const curUser = await getDocumentById("users", user.user_id);
            setCurrentUser(curUser);
        } catch (error) {
            console.log("Error fetching user:", error);
        }
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        fetchCurrentUser(user);
        document.title = 'Pricing Plan';
    }, []);
    return (
        <div>
            <div className="pricing-plan-container">
                <div className="pricing-plan-head">
                    <div className="pricing-plan-head-title">Support us in providing a better solution</div>
                    <div className="pricing-plan-head-desc">Choose a plan to tailor your needs</div>
                    <div className="pricing-plan-head-time"> Monthly <Switch /> Yearly</div>
                </div>
                <div className="pricing-content">
                    <div className="pricing-plan-basic">
                        <div className="plan-heading">
                            <p className="plan-title">Basic</p>
                            <p className="plan-desc">Perfect to get started</p>
                            <p className="price-text">0đ<span class="text-small"> / month</span></p>
                        </div>
                        <ul className="benefits">
                            <li className="options">
                                <img src={check} alt="check" />
                                <p>Read file</p>
                            </li>
                            <li className="options">
                                <img src={check} alt="check" />
                                <p>Take & manage note</p>
                            </li>
                            <li className="options">
                                <img src={check} alt="check" />
                                <p>Table view </p>
                            </li>
                            <li className="options basic">
                                <img src={cross} alt="cross" />
                                <p>Canvas note</p>
                            </li>
                            <li className="options basic">
                                <img src={cross} alt="cross" />
                                <p>Graph view</p>
                            </li>
                        </ul>
                        {
                            currentUser.accountType === "premium"
                                ? <div className="btn-select-plan premium">Downgrade to this plan</div>
                                : <div className="btn-select-plan">Current plan</div>
                        }
                    </div>
                    <div className="pricing-plan-premium">
                        <div className="plan-heading">
                            <p className="plan-title">Premium</p>
                            <p className="plan-desc">Best for professionals</p>
                            <p className="price-text">17.000đ<span class="text-small"> / month</span></p>
                        </div>
                        <ul className="benefits">
                            <li className="options">
                                <img src={check} alt="check" />
                                <p>Read file</p>
                            </li>
                            <li className="options">
                                <img src={check} alt="check" />
                                <p>Take & manage note</p>
                            </li>
                            <li className="options">
                                <img src={check} alt="check" />
                                <p>Table view </p>
                            </li>
                            <li className="options">
                                <img src={check} alt="check" />
                                <p>Canvas note</p>
                            </li>
                            <li className="options">
                                <img src={check} alt="check" />
                                <p>Graph view</p>
                            </li>
                        </ul>
                        {
                            currentUser.accountType === "premium"
                                ? <div className="btn-select-plan">Current plan</div>
                                : <div className="btn-select-plan premium" onClick={showModal}>Choose this plan</div>
                        }
                    </div>
                </div>
            </div>
            <Modal
                // title="Scan this to finish payment"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={800}
            >
                <CheckoutForm name={currentUser.name} email={currentUser.email} userId={currentUser.user_id} />
                {/* <img src={qrPayment} alt={"payment"} className='qrPayment' /> */}
            </Modal>
        </div>
    )

}

export default PricingPlan;