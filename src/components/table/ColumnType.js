import { Badge, Tag } from "antd";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import { FileType } from "../../enums/FileType";
import { getDocumentById } from "../../services/firebase";


const CustomRender = ({ text, record }) => {
    const navigate = useNavigate();
    const key = record.key;
    const type = record.type;
    const onNavigateFile = async () => {
        if (type === FileType.Note) {
            navigate(`../note/${key}`, { state: { name: text }, replace: true });
        } else if (type === FileType.Pdf) {
            const file = await getDocumentById('files', key);
            const url = file?.url;
            navigate(`/file`, { state: { fileUrl: url }, replace: true });
        }
    };

    return <span style={{ color: "#1F99FF", cursor: "pointer" }} onClick={onNavigateFile}>{text}</span>;
};

export const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        width: '25%',
        key: 'title',
        render: (text, record) => <CustomRender text={text} record={record} />,
    },
    {
        title: 'Type',
        key: 'type',
        width: '10%',
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
                {String(type).toUpperCase()}
            </Tag>

        ),
        filters: [
            {
                text: 'NOTE',
                value: 'note',
            },
            {
                text: 'PDF',
                value: 'pdf',
            }
        ],
        onFilter: (value, record) => record.type.indexOf(value) === 0,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        width: '10%',
        key: 'status',
        render: (_, record) => (
            <Badge
                color={
                    record.status.localeCompare('To-do') === 0
                        ? 'yellow'
                        : (record.status.localeCompare('In progress') === 0
                            ? 'blue'
                            : (record.status.localeCompare('Done') === 0
                                ? 'green'
                                : 'gray'
                            )
                        )
                }
                text={record.status}
            />
        ),
        filters: [
            { text: 'To-do', value: 'To-do', },
            { text: 'In progress', value: 'In progress', },
            { text: 'Done', value: 'Done', }
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
        title: 'Note Type',
        dataIndex: 'noteType',
        width: '15%',
        key: 'noteType',
        render: (_, record) => (
            <Tag
                color={'purple'}
                key={record.noteType}
            >
                {String(record.noteType).toUpperCase()}
            </Tag>
        ),
        filters: [
            { text: 'Revision', value: 'Revision', },
            { text: 'In-class note', value: 'In-class note', },
            { text: 'Self-study', value: 'Self-study', }
        ],
        onFilter: (value, record) => record.noteType.indexOf(value) === 0,
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        width: '10%',
        sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {/* {tags && tags.length > 0 ? (
                    tags.map((tag) => (
                        <Tag key={tag}>{tag.toUpperCase()}</Tag>
                    ))
                ) : (
                    <span>No Tags</span>
                )} */}
                {tags.map((tag) => (
                    <Tag key={tag}>{tag.toUpperCase()}</Tag>
                ))}
            </>
        ),
    },
];
