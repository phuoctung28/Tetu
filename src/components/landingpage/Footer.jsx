import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import "../../assets/styles/footer.css";
import { Button, Input, Space } from "antd";
import { ArrowRightOutlined, InstagramOutlined, FacebookOutlined } from '@ant-design/icons';

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                {/* Top area: Blocks */}
                <div className="top-area ">
                    {/* 1st block */}
                    <div className="footer-top-1st-block">
                        <div className="logo-wrapper">
                            {/* Logo */}
                            <Link to="/">
                                <img className="logo" src={logo} alt="BindUP logo" />
                            </Link>
                        </div>
                        <div className="info-wrapper">
                            <Link to="/" className="info-text">
                                Terms
                            </Link>
                            {" "}·{" "}
                            <Link to="/" className="info-text" >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>

                    {/* 2nd block */}
                    <div className="footer-top-2nd-block lg:col-span-2">
                        <p className="col-title">Products</p>
                        <ul className="col-item-wrapper">
                            <li className="col-item">Web Studio</li>
                            <li className="col-item">DynamicBox</li>
                            <li className="col-item">Forms</li>
                        </ul>
                    </div>

                    {/* 3rd block */}
                    <div className="footer-top-3rd-block lg:col-span-2">
                        <p className="col-title">Resources</p>
                        <ul className="col-item-wrapper">
                            <li className="col-item">Documentation</li>
                            <li className="col-item">Tutorials</li>
                            <li className="col-item">Blog</li>
                        </ul>
                    </div>

                    {/* 4th block */}
                    <div className="footer-top-4th-block lg:col-span-2">
                        <p className="col-title">Company</p>
                        <ul className="col-item-wrapper">
                            <li className="col-item">Home</li>
                            <li className="col-item">About us</li>
                            <li className="col-item">Company values</li>
                            <li className="col-item">Pricing</li>
                            <li className="col-item">Privacy Policy</li>
                        </ul>
                    </div>

                    {/* 5th block */}
                    <div className="footer-top-5th-block">
                        <p className="col-title">Subscribe</p>
                        <p className="col-desc">Get the latest news and articles to your inbox every month.</p>
                        <Space.Compact style={{ width: '100%', }} >
                            <Input defaultValue="Your email" />
                            <Button type="primary" icon={<ArrowRightOutlined />} />
                        </Space.Compact>

                    </div>
                </div>

                {/* Bottom area */}
                <div className="bottom-area">
                    {/* Social links */}
                    <ul className="social-link">
                        <li>
                            <Link to="https://www.facebook.com/tetu.v1" target="_blank">
                                <Button shape="circle" icon={<FacebookOutlined />} />
                            </Link>
                        </li>
                        <li>
                            <Link to="https://www.instagram.com/tetu_app/" target="_blank">
                                <Button shape="circle" icon={<InstagramOutlined />} />
                            </Link>
                        </li>
                    </ul>

                    {/* Copyrights note */}
                    <div className="copyright-note">
                        Made by <a href="https://www.facebook.com/tetu.v1" target="_blank" className="company-name">DolphinGroup</a>. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;