import "../../assets/styles/table.css";
import { Button, Space, Table, Tag, Badge, message } from 'antd';
import { useEffect, useState } from 'react';
import { queryDocuments } from "../../services/firebase";

const partOfSpeechMapping = {
    noun: 'blue',
    verb: 'green',
    adjective: 'purple',
    preposition: 'yellow',
    adverb: 'orange',
    pronoun: 'magenta',
}

const playAudio = (audioData) => {
    if (audioData && audioData.length > 0) {
        let current_audio = new Audio(audioData);
        current_audio.play();
    } else {
        message.warning("No audio found!");
    }
}

const columns = [
    {
        title: 'Word',
        dataIndex: 'word',
        key: 'word',
        render: (text) => <span>{text}</span>,
    },
    {
        title: 'Part of speech',
        key: 'part_of_speech',
        dataIndex: 'part_of_speech',
        align: 'center',
        render: (_, { part_of_speech }) => (
            <Tag
                color={partOfSpeechMapping[part_of_speech]}
                key={part_of_speech}
            >
                {part_of_speech.toUpperCase()}
            </Tag>

        ),
        filters: [
            {
                text: 'Noun',
                value: 'noun',
            },
            {
                text: 'Verb',
                value: 'verb',
            },
            {
                text: 'Adjective',
                value: 'adjective',
            }
        ],
        onFilter: (value, record) => record.part_of_speech.indexOf(value) === 0,
    },
    {
        title: 'Phonetic',
        dataIndex: 'phonetic',
        key: 'phonetic',
    },
    {
        title: 'Meaning',
        dataIndex: 'meaning',
        key: 'meaning',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Button
                    size="small"
                    onClick={() => { playAudio(record.audio) }}>
                    Say it!
                </Button>
            </Space >
        ),
    },
];


const DictionaryTable = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [wordList, setWordList] = useState([]);

    const loadDictionary = async () => {
        const userId = JSON.parse(localStorage.getItem("user")).user_id;
        try {
            const fetchedWords = await queryDocuments('dictionary', 'owner', '==', userId);
            setWordList(fetchedWords);
        } catch (error) {
            console.error('Error fetching words:', error);
        }
    };
    useEffect(() => {
        loadDictionary();
    }, []);

    const onSelectChange = (newSelectedRowKeys) => {
        //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={wordList} />
        </div>
    );
};
export default DictionaryTable;

