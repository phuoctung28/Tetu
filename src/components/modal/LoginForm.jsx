import React from 'react';
import logo from '../../assets/images/logo.png';
import { Button, Form, Input, Divider } from 'antd';
import google from '../../assets/icons/google.png';
import apple from '../../assets/icons/apple.svg';
import './login_form.css'
const layout = {
   labelCol: {
      span: 8,
   },
   wrapperCol: {
      span: 24,
   },
};

const onFinish = (values) => {
   console.log(values);
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
   required: '${label} is required!',
   types: {
      email: 'Not a valid email!',
      number: '${label} is not a valid number!',
   },
   number: {
      range: '${label} must be between ${min} and ${max}',
   },
};

const LoginForm = () => {
   return (
      <div className="modal-login">
         <div className="modal-container">
            <div className='form-header'>
               <img src={logo} alt='logo' className='logo_img' style={{ width: 60, height: 60 }} />
               <h1 className='form-header-msg'>Welcome to TETU!</h1>
            </div>
            <Form
               {...layout}
               name="nest-messages"
               onFinish={onFinish}
               style={{ maxWidth: 600, }}
               validateMessages={validateMessages}
            >
               <Form.Item
                  name={['user', 'email']}
                  label="Email"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, type: 'email', },]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  label="Password"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
               >
                  <Input.Password />
                  <a className="login-form-forgot" href="/">
                     Forgot password
                  </a>
               </Form.Item>
               <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0, }} sss>
                  <Button type="primary" htmlType="submit" size="large" className="login-form-button">
                     Go!
                  </Button>
               </Form.Item>
            </Form>
            <Divider plain>or sign in with</Divider>
            <div className="btn-social">
               <button
                  className="btn-google bg-white flex justify-center items-center border-solid border-2 rounded-lg py-3 mt-3 w-60 md:w-70 hover:bg-gray-200"
               >
                  <img src={google} alt="" style={{ width: 20, height: 20 }} />
                  <div className="btn-title">
                     Google
                  </div>
               </button>
               <button
                  className="btn-apple bg-white flex justify-center items-center border-solid border-2 rounded-lg py-3 mt-3 w-60 md:w-70 hover:bg-gray-200"
               >
                  <img src={apple} alt="" style={{ width: 'fit-content', height: 20 }} />
                  <div className="btn-title">
                     Apple
                  </div>
               </button>
            </div>
         </div>
      </div >
   );
};
export default LoginForm;