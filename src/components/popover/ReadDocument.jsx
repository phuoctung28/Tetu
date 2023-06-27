import React, { useRef, useState } from 'react';
import { UploadOutlined, ReadOutlined } from '@ant-design/icons';
import { Divider, Modal, Tooltip } from 'antd';
import { Button, Input, Space } from 'antd';
import "../../assets/styles/read_document.css";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import ArticleList from '../modal/ArticleList';
import {
    createDocument,
    createRef,
    queryDocuments,
    queryDocumentsMultipleConditions,
    updateExistedDocumentArray,
    uploadFile
} from "../../services/firebase";
import moment from "moment";

const ReadDocument = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

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
        }, 5000);
    };

    const handleFileChange = async (event) => {
        try {
            enterLoading(0);
            const file = event.target.files && event.target.files[0];
            if (!file) return;
            const fileUrl = await uploadFile(file);
            const fileRef = await createDocument("files", {
                name: file.name,
                size: file.size,
                type: file.type,
                url: fileUrl,
                owner: user.user_id,
            });
            const fileId = fileRef.id;

            const fields = ["owner", "folder_name"];
            const operators = ["==", "=="];
            const values = [user.user_id, "Attachments"];

            const folders = await queryDocumentsMultipleConditions("folders", fields, operators, values);

            if (!folders || folders[0] == null) {
                await createDocument("folders", {
                    folder_name: "Attachments",
                    owner: user.user_id,
                    notes: [],
                    files: [fileId],
                })
            } else {
                const folderId = folders[0].id;
                const folderRef = createRef("folders", folderId);
                await updateExistedDocumentArray(folderRef, "files", fileId);
            }
            navigate(`/file/${fileId}`, { state: { fileUrl: fileUrl }, replace: true });

        } catch (e) {
            console.log(e)
        }

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
            {/* <Divider plain>or</Divider>
            <Button
                onClick={() => setOpenModal(true)}
                className="btn-read-doc"
                icon={<ReadOutlined />} >
                Read articles
            </Button>
             */}
        </div>
    )
}

export default ReadDocument;