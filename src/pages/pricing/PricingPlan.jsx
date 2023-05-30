import React, { useState } from 'react'
import check from "../../assets/icons/check.svg";
import cross from "../../assets/icons/cross.svg";
import './pricing_page.css';
import { Modal } from "antd";
import PaypalCheckoutBtn from '../../components/PaypalCheckoutBtn';

const PricingPlan = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const showModal = () => {
      setIsModalOpen(true);
   };
   const handleCancel = () => {
      setIsModalOpen(false);
   };
   return (
      <div className="pricing-plan-container">
         <div className="pricing-content">
            <div className="pricing-plan-basic">
               <div className="plan-heading">
                  <p className="plan-title">Basic</p>
                  <p className="price-text">0VNĐ<span class="text-small">/ month</span></p>
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
               <div className="btn-select-plan">
                  Current plan
               </div>
            </div>
            <div className="pricing-plan-premium">
               <div className="plan-heading">
                  <p className="plan-title">Premium</p>
                  <p className="price-text">17.000VNĐ<span class="text-small">/ month</span></p>
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
               <div className="btn-select-plan premium" onClick={showModal}>
                  Choose this plan
               </div>
            </div>
         </div>
         <Modal
            title="Choose payment method"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
         >
            <PaypalCheckoutBtn ></PaypalCheckoutBtn>
         </Modal>
      </div>
   )
}

export default PricingPlan;