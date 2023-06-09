import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Divider, message, List, Typography } from 'antd';
import { auth, provider, database, getAllDocuments } from "../../services/firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import google from '../../assets/icons/google.png';
import apple from '../../assets/icons/apple.svg';
import logo from '../../assets/images/logo.png';
import '../../assets/styles/login_form.css';

const ArticleList = () => {
    const navigate = useNavigate();
    const [articleList, setArticleList] = useState([]);

    const fetchArticleList = async () => {
        try {
            const fetchedArticleList = await getAllDocuments("articles");
            const articles = [];
            fetchedArticleList.forEach((item) => {
                articles.push({
                    title: item.title,
                    id: item.id
                });
            })
            console.log("fetch article:", fetchedArticleList);
            setArticleList(articles);
        } catch (error) {
            console.log("Error fetching article list:", error)
        }
    }

    useEffect(() => {
        fetchArticleList();
    }, []);
    return (
        <div className="modal-login">
            <div className="modal-container">
                <List
                    dataSource={articleList}
                    renderItem={(item, index) => (
                        <List.Item key={index}>
                            {/* <Typography.Text mark>{index}</Typography.Text> */}
                            <Button type="text" onClick={() => navigate(`/article/${item.id}`)}>
                                {item.title}
                            </Button>
                        </List.Item>
                    )}
                />
            </div>
        </div >
    );
};
export default ArticleList;