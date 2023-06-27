import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PlayCircleOutlined, PlayCircleFilled, PlayCircleTwoTone, TableOutlined, DeleteOutlined, SortAscendingOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Layout, Modal, Space, message } from 'antd';
import MainHeader from '../../components/header/MainHeader';
import Sidebar from '../../components/sidebar/Sidebar';
import './article_page.css';
import { createDocument, getAllDocuments, getDocumentById, queryDocuments } from '../../services/firebase';

const { Content } = Layout;


const ArticlePage = () => {
    const [selectedText, setSelectText] = useState("");
    const userId = JSON.parse(localStorage.getItem("user")).user_id;
    const [article, setArticle] = useState({});
    const [dictData, setDictData] = useState([]);
    const navigate = useNavigate();
    const { articleId } = useParams();

    const loadArticleData = async () => {
        try {
            console.log("article id:", articleId);
            const fetchedArticle = await getDocumentById("articles", articleId);
            setArticle(fetchedArticle);
            document.title = "Article - " + fetchedArticle.title;
        } catch (error) {
            console.log("Error load article!", error);
        }
    }
    const loadDictData = async () => {
        try {
            // console.log("user:", userId);
            const fetchedDict = await queryDocuments("dictionary", "owner", "==", userId);
            setDictData(fetchedDict);
            // console.log("FETCH DICT: ", fetchedDict);
        } catch (error) {
            console.log("Error load dictionary!");
        }
    }
    useEffect(() => {
        loadArticleData();
        loadDictData();
    }, []);

    const handleMouseUp = () => {
        const currentSelectedText = window.getSelection().toString().trim().toLowerCase();
        setSelectText(currentSelectedText)
        // console.log(`Selected text: ${currentSelectedText}`);
    }

    const items = [{ label: 'Add to dictionary', key: '1', }];


    const onClick = async ({ key }) => {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`;

        try {
            const data = await fetch(url);
            const dataJ = await data.json();

            if (!dataJ) return;
            if (dataJ?.hasOwnProperty('title')) {
                message.warning(dataJ.title);
                return;
            }

            const audios = dataJ[0]?.phonetics?.filter(item => item?.audio && item?.audio?.length > 0);
            let audio = "";
            if (audios && audios.length > 0)
                audio = audios[0].audio;

            const persistData = {
                word: selectedText,
                audio: audio || "",
                phonetic: dataJ[0]?.phonetic || "",
                part_of_speech: dataJ[0]?.meanings[0]?.partOfSpeech || "",
                meaning: dataJ[0]?.meanings[0]?.definitions[0]?.definition || "",
                owner: userId,
            };

            // console.log("persist:", persistData);
            try {
                await createDocument("dictionary", persistData);
                message.success("Store vocab successfully!");
                loadDictData();
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log("Error get vocab info");
        }
    };

    const playAudio = (audioData) => {
        // console.log("Audio:", typeof audioData);
        if (!audioData || audioData.length === 0) {
            message.info("No audio found!");
            return;
        }
        let current_audio = new Audio(audioData);
        current_audio.play();
    }

    return (
        <Layout hasSider>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: 200, }} >
                <MainHeader showButton={true} />
                <Content className="article-section" style={{ margin: '0', overflow: 'initial', }} >
                    <div className="article-container">
                        <div className="article-wrapper">
                            <div className="article">
                                <h2 className="article-title">{article.title}</h2>
                                <div className="article-origin">
                                    <a href={article.url} rel="noreferrer" target='_blank'>Original article</a>
                                </div>
                                <Dropdown
                                    menu={{ items, onClick }}
                                    trigger={['contextMenu']}>
                                    <div className="article-content" onMouseUp={handleMouseUp}>
                                        {article.content}
                                    </div>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="dictionary-container">
                            <div className="dictionary-header">
                                <h2>Your dictionary</h2>
                                <div className="dictionary-toolbar">
                                    <Button type="text" icon={<TableOutlined />} onClick={() => navigate("/dictionary")} />
                                    <Button type="text" icon={<SearchOutlined />} />
                                    <Button type="text" icon={<SortAscendingOutlined />} />
                                    <Button type="text" icon={<DeleteOutlined />} />
                                </div>
                            </div>
                            <div className="dictionary-list">
                                {
                                    dictData.map((item, index) => {
                                        return (
                                            <div key={index} className="dictionary-list-item">
                                                <div className="item-head">
                                                    <div className="item-word">{item.word}</div>
                                                    <div className="item-info">
                                                        <p className="item-word-type">{item.part_of_speech}</p>
                                                        <p className="item-phone-tic">{item.phonetic}</p>
                                                    </div>
                                                </div>
                                                <Button
                                                    onClick={() => { playAudio(item.audio); }}
                                                    className="item-audio"
                                                    type="text"
                                                    shape="circle"
                                                    icon={<PlayCircleFilled />}></Button>
                                                <div className="dictionary-item-meaning">
                                                    {item.meaning}
                                                </div>
                                            </div>)
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout >
    );
};

export default ArticlePage;