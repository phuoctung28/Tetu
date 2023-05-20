import React, { useState } from 'react';
import logo from '../../assets/images/logo_name.png';
import hero from '../../assets/images/hero.png';
import "./landing_page.css";

const LandingPage = () => {
  return (
    <div className='container'>
      <div className='landing-header'>
        <button className='logo-btn'>
          <img src={logo} alt="logo" className='img_logo' />
        </button>
        <div className='nav-tab'>
          <p className='nav-item active'>Home</p>
          <p className='nav-item'>Feature</p>
          <p className='nav-item'>Contact</p>
          <p className='nav-item'>About Us</p>
        </div>
        <div>
          <button className='btn-sign-in'>SIGN IN</button>
          <button className='btn-sign-up'>SIGN UP</button>
        </div>
      </div>
      <div className='hero-head'>
        <h1 id='tagline'>✨ <span id='highlighted'>Knowledge</span> at your <br /><span id='underlined'>fingertips.</span></h1>
        <p className='desc'>🎉 Learning and document reading solution</p>
        <button className='btn-get-started'>Get started</button>
      </div>
      <div className='hero-image'>
        <img src={hero} alt='hero' className='hero_img' />
      </div>
    </div>
  );
};
export default LandingPage;