import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import "./landing_page.css";
import RegisterForm from '../../components/modal/RegisterForm';
import LoginForm from '../../components/modal/LoginForm';
import Footer from "../../components/landingpage/Footer";
import AboutCard from '../../components/landingpage/AboutCard';
import AOS from "aos";
import "aos/dist/aos.css";
import logo from '../../assets/images/logo_name.png';
import hero from '../../assets/images/hero.png';
import android from '../../assets/images/playstore.png';
import apple from '../../assets/images/applestore.png';
import features from "../../components/landingpage/featureData";
import mobile from '../../assets/images/mobile.png';

const CallToAction = ({ setOpenModal2 }) => {
    return (<div className="cta-container">
        <h1 className="cta-title">
            It's time to sharpen your workflows! 🚀
        </h1>
        <Button type="primary" className="cta-button" onClick={() => {
            setOpenModal2(true)
        }}>
            GET STARTED
        </Button>
    </div>);
}
const LandingPage = () => {
    const [openModal, setOpenModal] = useState(false);
    const [openModal2, setOpenModal2] = useState(false);
    const [openModal3, setOpenModal3] = useState(false);
    const [top, setTop] = useState(true);
    useEffect(() => {
        AOS.init();
        AOS.refresh();
        const scrollHandler = () => {
            window.pageYOffset > 10 ? setTop(false) : setTop(true);
        };
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [top]);

    return (
        <div className='landing-page-container'>
            <div className={`landing-header ${(!top) && `scroll`}`}>
                <div className="landing-header-wrapper">
                    <button className='logo-btn'>
                        <img src={logo} alt="logo" className='img-logo' />
                    </button>
                    <div className='nav-tab'>
                        <a href="#home" className='nav-item active'>Home</a>
                        <a href="#feature" className='nav-item'>Feature</a>
                        <a href="#contact" className='nav-item'>Contact</a>
                        <a href="/" className='nav-item'>About Us</a>
                    </div>
                    <div>
                        <button onClick={() => setOpenModal(true)} className='btn-sign-in'>SIGN IN</button>
                        <button onClick={() => setOpenModal2(true)} className='btn-sign-up'>SIGN UP</button>
                    </div>
                </div>
            </div>
            <div id="home" className='hero-head'>
                <h1 id='tagline'>✨ <span id='highlighted'>Knowledge</span> at your <br /><span
                    id='underlined'>fingertips.</span></h1>
                <p className='desc'>🎉 Learning and document reading solution</p>
                <div className='btn-cta'>
                    <button onClick={() => setOpenModal3(true)}>
                        <img src={android} alt="android" />
                    </button>
                    <button onClick={() => setOpenModal3(true)}>
                        <img src={apple} alt="apple" />
                    </button>
                </div>
            </div>
            <div className='hero-image'>
                <img src={hero} alt='hero' className='hero-img' />
            </div>
            <div className="content-wrapper" data-aos="fade-up">
                <div className="content-container">
                    <section className="about-area">
                        <div className="about-head">
                            <div className="about-slogan">
                                Reach goals that matter
                            </div>
                            <div className="about-title">One product, unlimited solutions</div>
                            <p className="about-desc">As a comprehensive learning tool that caters to individuals of all
                                ages & backgrounds, <span>Tetu</span> aims to transform the learning experience for its
                                users.</p>
                        </div>
                        <div id="feature">
                            {features.map((item, index) => {
                                return <AboutCard
                                    key={index}
                                    featureTitle={item.title}
                                    featureDesc={item.description}
                                    imgUrl={item.img}
                                    imgPosition={index % 2 === 0 ? "left" : ""}
                                />

                            })}
                        </div>
                    </section>
                </div>
            </div>
            <CallToAction setOpenModal2={setOpenModal2} />
            <div id="contact">
                <Footer />
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
            <Modal
                title=""
                centered
                width={1200}
                open={openModal3}
                onOk={() => setOpenModal3(false)}
                onCancel={() => setOpenModal3(false)}
                footer={null}
            >
                <div className="mobile-intro-container">
                    <img src={mobile} alt="modile-intro" />
                    <h3>TETU mobile app version is still in the development phase</h3>
                    <h2>Keep following to get latest announcement about the realse date!</h2>
                </div>
            </Modal>

        </div>);
};

export default LandingPage;