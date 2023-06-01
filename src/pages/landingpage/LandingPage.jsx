import React, { useState,useEffect  } from 'react';
import LoginForm from '../../components/modal/LoginForm';
import logo from '../../assets/images/logo_name.png';
import hero from '../../assets/images/hero.png';
import android from '../../assets/images/playstore.png';
import apple from '../../assets/images/applestore.png';
import { Modal } from 'antd';
import RegisterForm from '../../components/modal/RegisterForm';
import "./landing_page.css";
import FeatureCards from '../../components/features/FeatureCards';
import group5 from '../../assets/images/Group5.svg'
import group7 from '../../assets/images/Group7.svg'
import group12 from '../../assets/images/Group12.svg'
import AboutCard from '../../components/features/AboutCard';
import about3 from '../../assets/images/about3.svg'
import CaseStudyCard from '../../components/features/CaseStudyCard';
import group95 from '../../assets/images/Group95.svg'
import group108 from '../../assets/images/Group108.svg'
import group115 from '../../assets/images/Group115.svg'
import group126 from '../../assets/images/Group126.svg'
import about2 from '../../assets/images/about2.svg'
import about1 from '../../assets/images/about1.svg'
import AOS from "aos";
import "aos/dist/aos.css";

const LandingPage = () => {
   const [openModal, setOpenModal] = useState(false);
   const [openModal2, setOpenModal2] = useState(false);
   useEffect(() => {
      AOS.init();
      AOS.refresh();
    }, []);

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
         <div className="content-wrapper" data-aos="fade-up">
            <div className="content-container">
               <section className="feature-overview">
                  <div className="content-header">
                     <h2>How does it work</h2>
                     <h6 className="section-subtitle">One theme that serves as an easy-to-use operational toolkit<br/>that meets customer's needs.</h6>
                  </div>
                  <div className="feature-list">
                     <FeatureCards position="start" imageUrl={group5}></FeatureCards>
                     <FeatureCards position="center" imageUrl={group7}></FeatureCards>
                     <FeatureCards position="end" imageUrl={group12}></FeatureCards>
                  </div>
               </section>
               <section className="about-area">
                  <AboutCard imgUrl={about3} imgPosition="left"></AboutCard>
                  <AboutCard imgUrl={about2}></AboutCard>
                  <AboutCard imgUrl={about1} imgPosition="left"></AboutCard>
               </section>
               <section className="case-studies">
                  <div className="case-study-container">
                     <div className="case-study-headline text-center">
                        <h2>Our case studies</h2>
                        <h6 className="case-study-subtitle text-muted">Lorem ipsum dolor sit amet, tincidunt vestibulum.</h6>
                     </div>
                     

                     <CaseStudyCard imageUrl={group95}></CaseStudyCard>
                     <CaseStudyCard imageUrl={group108}></CaseStudyCard>
                     <CaseStudyCard imageUrl={group115}></CaseStudyCard>
                     <CaseStudyCard imageUrl={group126}></CaseStudyCard>
                     
                  </div>
               </section>
            </div>
            <section></section >
         </div>
      </div>
   );
};

export default LandingPage;