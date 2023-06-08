import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PlayCircleOutlined, PlayCircleFilled, PlayCircleTwoTone, TableOutlined, DeleteOutlined, SortAscendingOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Layout, Modal, Space, message } from 'antd';
import MainHeader from '../../components/header/MainHeader';
import Sidebar from '../../components/sidebar/Sidebar';
import './article_page.css';
import { createDocument, getAllDocuments, queryDocuments } from '../../services/firebase';

const { Content } = Layout;


const ArticlePage = () => {
    const [dualNote, setDualNote] = useState(false);
    const [selectedText, setSelectText] = useState("");
    const userId = JSON.parse(localStorage.getItem("user")).user_id;
    const [dictData, setDictData] = useState([]);
    useEffect(() => {
        const loadDictData = async () => {
            try {
                const fetchedDict = await queryDocuments("dictionary", "owner", "==", userId);
                setDictData(fetchedDict);
                // console.log("FETCH DICT: ", fetchedDict);
            } catch (error) {
                console.log("Error load dictionary!");
            }
        }
        loadDictData();
    }, []);

    const handleToggleDualNote = () => {
        setDualNote(!dualNote);
    }

    const handleMouseUp = () => {
        const currentSelectedText = window.getSelection().toString().trim();
        setSelectText(currentSelectedText)
        // console.log(`Selected text: ${currentSelectedText}`);
    }

    const items = [
        {
            label: 'Add to dictionary',
            key: '1',
        },
    ];


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
                audio: audio,
                phonetic: dataJ[0]?.phonetic,
                part_of_speech: dataJ[0]?.meanings[0]?.partOfSpeech,
                meaning: dataJ[0]?.meanings[0]?.definitions[0]?.definition,
                owner: userId,
            };

            // console.log("persist:", persistData);
            try {
                await createDocument("dictionary", persistData);
                message.success("Store vocab successfully!");
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log("Error get vocab info");
        }
    };

    const playAudio = (audioData) => {
        let current_audio = new Audio(audioData);
        current_audio.play();
    }

    return (
        <Layout hasSider>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: 200, }} >
                <MainHeader showButton={true} dualNote={dualNote} handleToggleDualNote={handleToggleDualNote} />
                <Content className="article-section" style={{ margin: '0', overflow: 'initial', }} >
                    <div className="article-container">
                        <div className="article-wrapper">
                            <div className="article">
                                <h2 className="article-title">VIETMAP: The path to a leading digital maps brand</h2>
                                <div className="article-origin">
                                    <a href="https://tuoitrenews.vn/news/business/20230525/vietmap-the-path-to-a-leading-digital-maps-brand/73337.html">Original article</a>
                                </div>
                                <Dropdown
                                    menu={{ items, onClick }}
                                    trigger={['contextMenu']}>

                                    <div className="article-content" onMouseUp={handleMouseUp}>
                                        Vietmap Application Joint Stock Company (VIETMAP JSC) has dedicated significant resources, personnel, and cutting-edge technology to gathering comprehensive and real-time traffic data across all 63 provinces and cities of Vietnam. Significant investment for intricate traffic data   Vietmap experts dedicate their investments toward researching and implementing advanced technologies like Internet of Things (IoT), Artificial Intelligence (AI), Big Data, and various others to enhance their capabilities of traffic data collection and processing. Furthermore, the company utilizes various specialized facilities to collect data, ensuring more comprehensive, precise, and consecutive information.  The brand consistently endeavors to utilize advanced technology and stay up to date with the latest trends, resulting in the acquisition of highly accurate and reliable traffic information. In addition, the company places a strong emphasis on investing in a team of exceptionally skilled professionals specializing in Maps API. These experts promptly respond to changes in information and data within Vietnam’s traffic system to meet the diverse needs of their customers and challenges in the market.  According to their introduction, the two finest pieces of navigation software, Vietmap S2 and Vietmap Live, have been highly praised by Vietnamese drivers.   Vietmap S2 is the offline navigation software exclusively designed for Android car display, offering accurate and remarkably stable traffic alert data that is updated every three months. And Vietmap Live is a hybrid navigation application developed to use on mobile and synchronize with Apple CarPlay and Android Auto. Vietmap Live’s traffic data is updated weekly and it automatically accesses the latest information when users connect to 4G or the Internet, without any intervention.   Both pieces of navigation software claim to be the most demanding applications that excel in terms of comprehensive warning data systems, precise navigation algorithms, and personalized features supporting user driving behavior, according to a company representative. These applications also offer various and beneficial features for a safe and sound journey.  The optimal navigation software is one that is continuously updated with real-time data collected in the most efficient and effective method. However, achieving 100-percent compatibility between real-world data and map data remains an impossible goal for any mapping company worldwide. The organization vows to deliver real-time and accurate data from real data collection, ensuring precision and responsiveness in addressing dynamic traffic conditions.
                                    </div>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="dictionary-container">
                            <div className="dictionary-header">
                                <h2>Your dictionary</h2>
                                <div className="dictionary-toolbar">
                                    <Button type="text" icon={<TableOutlined />} />
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