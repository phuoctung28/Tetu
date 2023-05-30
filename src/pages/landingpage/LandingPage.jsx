import React, { useState } from 'react';
import LoginForm from '../../components/modal/LoginForm';
import logo from '../../assets/images/logo_name.png';
import hero from '../../assets/images/hero.png';
import android from '../../assets/images/playstore.png';
import apple from '../../assets/images/applestore.png';
import { Modal } from 'antd';
import RegisterForm from '../../components/modal/RegisterForm';
import "./landing_page.css";

const LandingPage = () => {
   const [openModal, setOpenModal] = useState(false);
   const [openModal2, setOpenModal2] = useState(false);

   return (
      <div className='container'>
         <div className='landing-header'>
            <button className='logo-btn'>
               <img src={logo} alt="logo" className='img-logo' />
            </button>
            <div className='nav-tab'>
               <a href="/" className='nav-item active'>Home</a>
               <a href="/" className='nav-item'>Feature</a>
               <a href="/" className='nav-item'>Contact</a>
               <a href="/" className='nav-item'>About Us</a>
            </div>
            <div>
               <button onClick={() => setOpenModal(true)} className='btn-sign-in'>SIGN IN</button>
               <button onClick={() => setOpenModal2(true)} className='btn-sign-up'>SIGN UP</button>
            </div>
         </div>
         <div className='hero-head'>
            <h1 id='tagline'>✨ <span id='highlighted'>Knowledge</span> at your <br /><span id='underlined'>fingertips.</span></h1>
            <p className='desc'>🎉 Learning and document reading solution</p>
            {/* <button className='btn-get-started'>Get started</button> */}
            <div className='btn-cta'>
               <a href="/">
                  <img src={android} alt="android" />
               </a>
               <a href="/">
                  <img src={apple} alt="apple  " />
               </a>
            </div>
         </div>
         <div className='hero-image'>
            <img src={hero} alt='hero' className='hero-img' />
         </div>
         <Modal
            title=""
            centered
            open={openModal}
            onOk={() => setOpenModal(false)}
            onCancel={() => setOpenModal(false)}
            footer={null}
         >
            <LoginForm />
         </Modal>
         <Modal
            title=""
            centered
            open={openModal2}
            onOk={() => setOpenModal2(false)}
            onCancel={() => setOpenModal2(false)}
            footer={null}
         >
            <RegisterForm />
         </Modal>
      </div>
   );
};

export default LandingPage;