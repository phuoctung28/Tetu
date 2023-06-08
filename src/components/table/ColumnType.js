import {Badge, Space, Tag} from "antd";
import moment from "moment/moment";
import {useNavigate} from "react-router-dom";
import {FileType} from "../../enums/FileType";
import {getDocumentById} from "../../services/firebase";


const CustomRender = ({ text, record }) => {
    const navigate = useNavigate();
    const key = record.key;
    const type = record.type;
    const onNavigateFile = async () => {
        if (type === FileType.Note) {
            navigate(`../note/${key}`, { replace: true });
        } else if (type === FileType.Pdf) {
            const file = await getDocumentById('files', key);
            const url = file?.url;
            navigate(`/file`, { state: { fileUrl: url }, replace: true });
        }
    };

    return <span style={{color: "blue", cursor: "pointer"}} onClick={onNavigateFile}>{text}</span>;
};

export const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (text, record) => <CustomRender
            text={text} record={record} />,
    },
    {
        title: 'Type',
        key: 'type',
        dataIndex: 'type',
        align: 'center',
        render: (_, { type }) => (
            <Tag
                color={
                    type === FileType.Note
                        ? 'blue'
                        : (type === FileType.Pdf
                            ? 'green'
                            : 'purple')
                }
                key={type}
            >
                {type}
            </Tag>

        ),
        filters: [
            {
                text: 'Note',
                value: 'Note',
            },
            {
                text: 'File',
                value: 'File',
            }
        ],
        onFilter: (value, record) => record.type.indexOf(value) === 0,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_, record) => (
            <Badge
                color={
                    record.status.localeCompare('To-do')
                        ? 'yellow'
                        : (record.status.localeCompare('In progress')
                                ? 'blue'
                                : 'green'
                        )
                }
                text={record.status}
            />
        ),
        filters: [
            {
                text: 'To-do',
                value: 'To-do',
            },
            {
                text: 'In progress',
                value: 'In progress',
            },
            {
                text: 'Done',
                value: 'Done',
            }
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags && tags.length > 0 ? (
                    tags.map((tag) => (
                        <Tag key={tag}>{tag.toUpperCase()}</Tag>
                    ))
                ) : (
                    <span>No Tags</span>
                )}
            </>
        ),
    },
];
