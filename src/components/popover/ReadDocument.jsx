import React, { useRef } from 'react';
import { FileTwoTone, UploadOutlined, ReadOutlined } from '@ant-design/icons';
import { Layout, theme, Divider, Avatar, Typography, Col, Row, Popover } from 'antd';
import { Button, Form, Input, message, Space } from 'antd';
import "../../assets/styles/read_document.css";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

const ReadDocument = () => {

   const inputRef = useRef(null);
   const handleClick = () => {
      inputRef.current.click();
   };

   const handleFileChange = event => {
      const fileObj = event.target.files && event.target.files[0];
      if (!fileObj) return;

      console.log('fileObj is', fileObj);
      // 👇️ reset file input
      event.target.value = null;
      // 👇️ is now empty
      console.log(event.target.files);
      // 👇️ can still access file object here
      console.log(fileObj);
      console.log(fileObj.name);
   };
   const [form] = Form.useForm();
   const onFinish = () => {
      message.success('Submit success!');
   };
   const onFinishFailed = () => {
      message.error('Submit failed!');
   };
   const onFill = () => {
      form.setFieldsValue({
         url: 'https://taobao.com/',
      });
   };

   return (
      <div className='popover-read-doc'>
         <div className='read-local-file'>
            <input
               id="inp-document"
               style={{ display: 'none' }}
               ref={inputRef}
               type="file"
               onChange={handleFileChange}
            />
            <Button
               onClick={handleClick}
               className="btn-read-doc"
               icon={<UploadOutlined />} >
               Upload file
            </Button>
         </div>
         <div>
            <Space.Compact style={{ width: '100%', }}>
               <Input placeholder="Link to file..." />
               <Button type="primary">Open</Button>
            </Space.Compact>
         </div>
         <Divider plain>or</Divider>
         <Button
            onClick={handleClick}
            className="btn-read-doc"
            icon={<ReadOutlined />} >
            Read articles
         </Button>
      </div>
   )
}

export default ReadDocument;