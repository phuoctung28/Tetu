import { Collapse, DatePicker, Space, Input, Tag, Tooltip, Select, theme } from 'antd';
import { CalendarOutlined, TagsOutlined, SwitcherOutlined, NumberOutlined, PlusOutlined } from '@ant-design/icons';
import "../../assets/styles/metadata.css";
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const statusOptions = [
    { value: 'To-do', },
    { value: 'In progress', },
    { value: 'Done', },
    { value: 'Canceled', },
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

const Metadata = () => {
    const onChange = (key) => {
        // console.log(key);
    };
    const panelStyle = {
        border: 'none',
        fontWeight: 600,
    };
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

    const { token } = theme.useToken();
    const [tags, setTags] = useState(['Tag 1',]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const inputRef = useRef(null);
    const editInputRef = useRef(null);
    useEffect(() => {
        if (inputVisible) {
            inputRef.current?.focus();
        }
    }, [inputVisible]);
    useEffect(() => {
        editInputRef.current?.focus();
    }, [inputValue]);
    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        // console.log(newTags);
        setTags(newTags);
    };
    const showInput = () => {
        setInputVisible(true);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };
    const handleEditInputChange = (e) => {
        setEditInputValue(e.target.value);
    };
    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setTags(newTags);
        setEditInputIndex(-1);
        setInputValue('');
    };
    const tagInputStyle = {
        width: 78,
        verticalAlign: 'top',
    };
    const tagPlusStyle = {
        background: token.colorBgContainer,
        borderStyle: 'dashed',
    };
    const options = [
        { value: "In-class note", label: "In-class note" },
        { value: "Revision", label: "Revision" },
        { value: "Assignment", label: "Assignment" },
        { value: "Project", label: "Project" },
        { value: "Presentation", label: "Presentation" }
    ];
    return (
        <div className="container-metadata">
            <Collapse defaultActiveKey={['']} onChange={onChange} ghost bordered={true}>
                <Panel header="Metadata" key="1" style={panelStyle}>
                    {/* <p className="metadata-item">{text}</p> */}
                    <Space className="metadata-list" direction='vertical' size={10}>
                        <div className="metadata-item">
                            <div className="item-title">
                                <CalendarOutlined /> Date
                            </div>
                            <div className="item-detail">
                                <DatePicker size="small" defaultValue={dayjs('01/01/2015', dateFormatList[0])}
                                    format={dateFormatList} />
                            </div>
                        </div>
                        <div className="metadata-item">
                            <div className="item-title">
                                <NumberOutlined /> Status
                            </div>
                            <div className="item-detail">
                                <Select
                                    // mode="multiple"
                                    showArrow
                                    tagRender={tagRender}
                                    defaultValue={['To-do']}
                                    style={{
                                        width: '150px',
                                    }}
                                    size="small"
                                    options={statusOptions}
                                />
                            </div>
                        </div>
                        <div className="metadata-item">
                            <div className="item-title">
                                <TagsOutlined /> Tag
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
                                <SwitcherOutlined /> Type
                            </div>
                            <div className="item-detail">
                                <Select
                                    // mode="tags"
                                    size="small"
                                    placeholder="Select or Create"
                                    defaultValue={["In-class note"]}
                                    style={{
                                        width: '150px',
                                    }}
                                    options={options}
                                />
                            </div>
                        </div>
                    </Space>
                </Panel>
                <Panel header="Outline" key="2" style={panelStyle}>
                    <p>{text}</p>
                </Panel>
            </Collapse>
        </div>
    );
};
export default Metadata;