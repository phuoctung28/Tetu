import React, { useEffect, useState } from 'react';
import { PlayCircleOutlined, PlayCircleFilled, PlayCircleTwoTone, TableOutlined, DeleteOutlined, SortAscendingOutlined, SearchOutlined, TagsOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Layout, Modal, Space, message } from 'antd';
import MainHeader from '../../components/header/MainHeader';
import Sidebar from '../../components/sidebar/Sidebar';
import './dictionary_list.css';
import { createDocument, getAllDocuments, queryDocuments } from '../../services/firebase';
import DictionaryTable from '../../components/dictionary/DictionaryTable';

const { Content } = Layout;

const DictionaryList = () => {
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
        document.title = "Dictionary";
    }, []);

    const handleToggleDualNote = () => {
        setDualNote(!dualNote);
    }

    const handleMouseUp = () => {
        const currentSelectedText = window.getSelection().toString().trim();
        setSelectText(currentSelectedText)
        // console.log(`Selected text: ${currentSelectedText}`);
    }

    const items = [{ label: 'Add to dictionary', key: '1' }];

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
                <Content className="dictionary-list-container">
                    <div className="dictionary-list-header">
                        <div className="dictionary-list-title">
                            <h2>Personal dictionary</h2>
                            <p>Create your own learning session or flashcard with these vocabularies</p>
                        </div>
                        <div className="dictionary-list-btn">
                            <Button
                                onClick={() => message.info("This feature is in development")}
                                type="primary"
                                icon={<TagsOutlined />}>
                                Create Flashcard
                            </Button>
                        </div>
                    </div>
                    <div className="dictionary-component" >
                        <DictionaryTable />
                    </div>
                </Content>
            </Layout>
        </Layout >
    );
};

export default DictionaryList;