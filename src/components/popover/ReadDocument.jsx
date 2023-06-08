import React, { useRef, useState } from 'react';
import { UploadOutlined, ReadOutlined } from '@ant-design/icons';
import { Divider, Tooltip } from 'antd';
import { Button, Input, Space } from 'antd';
import "../../assets/styles/read_document.css";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

const ReadDocument = () => {
    const navigate = useNavigate();
    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 2000);
    };

    const handleFileChange = async (event) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) return;

        event.target.value = null;
        const storageRef = ref(getStorage(), `/files/${fileObj.name}`);
        const uploadTask = uploadBytesResumable(storageRef, fileObj);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                // console.log("Upload progress: ", progress);
                enterLoading(0);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    console.log("File url: ", url);
                    navigate(`/file`, { state: { fileUrl: url }, replace: true });
                });
            }
        );
    };

    const inputRef = useRef(null);
    const handleClick = () => {
        inputRef.current.click();
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
                    type="primary"
                    onClick={handleClick}
                    className="btn-read-doc"
                    icon={<UploadOutlined />}
                    loading={loadings[0]}
                >
                    Upload file
                </Button>
            </div>
            <div>
                <Space.Compact style={{ width: '100%', }}>
                    <Input placeholder="Link to file..." />
                    <Tooltip title="In development">
                        <Button disabled type="primary">Open</Button>
                    </Tooltip>
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