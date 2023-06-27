import { Collapse, DatePicker, Space, Input, Tag, Tooltip, Select, theme } from 'antd';
import { CalendarTwoTone, TagsTwoTone, SwitcherTwoTone, NumberOutlined, PlusOutlined } from '@ant-design/icons';
import "../../assets/styles/metadata.css";
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { updateDocumentProperty } from '../../services/firebase';
import moment from 'moment';

const { Panel } = Collapse;


const statusOptions = [
    { value: 'To-do', },
    { value: 'In progress', },
    { value: 'Done', },
    { value: 'Closed', },
];


const options = [
    { value: "Self-study", label: "Self-study" },
    { value: "In-class note", label: "In-class note" },
    { value: "Revision", label: "Revision" },
    { value: "Assignment", label: "Assignment" },
    { value: "Project", label: "Project" },
    { value: "Presentation", label: "Presentation" }
];

const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={value}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
                marginRight: 3,
            }}
        >
            {label}
        </Tag>
    );
};

const Metadata = ({ noteData }) => {
    const { token } = theme.useToken();

    const panelStyle = {
        border: 'none',
        fontWeight: 600,
    };
    const tagInputStyle = {
        width: 78,
        verticalAlign: 'top',
    };
    const tagPlusStyle = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY', 'YYYY-MM-DD'];

    const [tags, setTags] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);

    // console.log("NOTE DATA:", noteData);
    useEffect(() => {
        setTags(noteData.meta_data?.tags || []);
    }, [noteData?.meta_data?.tags]);

    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);

    useEffect(() => {
        editInputRef.current?.focus();
    }, [inputValue]);

    const handleClose = async (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        // console.log(newTags);
        try {
            await updateDocumentProperty("notes", noteData.noteId, "meta_data", { ...noteData.meta_data, tags: newTags });
        }
        catch (error) {
            console.error('Error updating tags:', error);
        }
        setTags(newTags);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = async () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        // console.log("TAGS: ", [...tags, inputValue]);
        try {
            await updateDocumentProperty("notes", noteData.noteId, "meta_data", { ...noteData.meta_data, tags: [...tags, inputValue] });
        }
        catch (error) {
            console.error('Error updating tags:', error);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const handleEditInputChange = (e) => {
        setEditInputValue(e.target.value);
    };

    const handleEditInputConfirm = async () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        // console.log("EDIT TAGS: ", newTags);
        try {
            await updateDocumentProperty("notes", noteData.noteId, "meta_data", { ...noteData.meta_data, tags: newTags });
        }
        catch (error) {
            console.error('Error updating tags:', error);
        }
        setEditInputIndex(-1);
        setInputValue('');
    };

    const handleDatePicker = async (date, dateString) => {
        console.log("datepicker:", date);
        console.log("datestring: ", dateString);
        try {
            await updateDocumentProperty("notes", noteData.noteId, "meta_data", { ...noteData.meta_data, datetime: dateString });
        }
        catch (error) {
            console.error('Error updating date:', error);
        }
    }

    const handleSelectStatus = async (value) => {
        console.log("select status: ", value);
        try {
            await updateDocumentProperty("notes", noteData.noteId, "meta_data", { ...noteData.meta_data, status: [value] });
        }
        catch (error) {
            console.error('Error updating status:', error);
        }
    }

    const handleSelectType = async (value) => {
        console.log("select type: ", value);
        try {
            await updateDocumentProperty("notes", noteData.noteId, "meta_data", { ...noteData.meta_data, type: [value] });
        }
        catch (error) {
            console.error('Error updating type:', error);
        }
    }

    return (
        <div key={noteData.noteId} className="container-metadata">
            <Collapse defaultActiveKey={['1']} ghost bordered={true}>
                <Panel header="Metadata" key="1" style={panelStyle}>
                    <Space className="metadata-list" direction='vertical' size={10}>
                        <div className="metadata-item">
                            <div className="item-title">
                                <CalendarTwoTone /> Date
                            </div>
                            <div className="item-detail">
                                <DatePicker
                                    size="small"
                                    defaultValue={
                                        (noteData?.meta_data?.datetime && noteData?.meta_data?.datetime.length > 0)
                                            ? dayjs(noteData?.meta_data?.datetime, dateFormatList[0])
                                            : dayjs(new Date(), dateFormatList[0])
                                    }
                                    onChange={handleDatePicker}
                                    format={dateFormatList} />
                            </div>
                        </div>
                        <div className="metadata-item">
                            <div className="item-title">
                                <NumberOutlined style={{ color: "#1677ff" }} /> Status
                            </div>
                            <div className="item-detail">
                                <Select
                                    // mode="multiple"
                                    showArrow
                                    tagRender={tagRender}
                                    defaultValue={noteData.meta_data?.status}
                                    style={{ width: '150px', }}
                                    size="small"
                                    options={statusOptions}
                                    onChange={handleSelectStatus}
                                />
                            </div>
                        </div>
                        <div className="metadata-item">
                            <div className="item-title">
                                <TagsTwoTone /> Tag
                            </div>
                            <div className="item-detail">
                                <Space size={[0, 8]} wrap>
                                    <Space size={[0, 8]} wrap>
                                        {tags.map((tag, index) => {
                                            if (editInputIndex === index) {
                                                return (
                                                    <Input
                                                        ref={editInputRef}
                                                        key={tag}
                                                        size="small"
                                                        style={tagInputStyle}
                                                        value={editInputValue}
                                                        onChange={handleEditInputChange}
                                                        onBlur={handleEditInputConfirm}
                                                        onPressEnter={handleEditInputConfirm}
                                                    />
                                                );
                                            }
                                            const isLongTag = tag.length > 20;
                                            const tagElem = (
                                                <Tag
                                                    key={tag}
                                                    // closable={index !== 0}
                                                    closable={true}
                                                    style={{
                                                        userSelect: 'none',
                                                    }}
                                                    onClose={() => handleClose(tag)}
                                                >
                                                    <span
                                                        onDoubleClick={(e) => {
                                                            if (index !== 0) {
                                                                setEditInputIndex(index);
                                                                setEditInputValue(tag);
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                                    </span>
                                                </Tag>
                                            );
                                            return isLongTag ? (
                                                <Tooltip title={tag} key={tag}>
                                                    {tagElem}
                                                </Tooltip>
                                            ) : (
                                                tagElem
                                            );
                                        })}
                                    </Space>

                                    {inputVisible ? (
                                        <Input
                                            ref={inputRef}
                                            type="text"
                                            size="small"
                                            style={tagInputStyle}
                                            value={inputValue}
                                            onChange={handleInputChange}
                                            onBlur={handleInputConfirm}
                                            onPressEnter={handleInputConfirm}
                                        />
                                    ) : (
                                        <Tag style={tagPlusStyle} onClick={showInput}>
                                            <PlusOutlined /> New Tag
                                        </Tag>
                                    )}
                                </Space>
                            </div>
                        </div>
                        <div className="metadata-item">
                            <div className="item-title">
                                <SwitcherTwoTone /> Type
                            </div>
                            <div className="item-detail">
                                <Select
                                    // mode="tags"
                                    size="small"
                                    placeholder="Select or Create"
                                    // defaultValue={["Self-study"]}
                                    defaultValue={noteData.meta_data?.type}
                                    style={{ width: '150px', }}
                                    options={options}
                                    onChange={handleSelectType}
                                />
                            </div>
                        </div>
                    </Space>
                </Panel>
                <Panel header="Outline" key="2" style={panelStyle}>
                    <span>This feature is in development...</span>
                </Panel>
            </Collapse>
        </div>
    );
};
export default Metadata;