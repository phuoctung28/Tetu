import { Badge, Tag } from "antd";
import moment from "moment/moment";


const CustomRender = ({ text, record }) => {
    return <span style={{ color: "#1F99FF", cursor: "pointer" }} >{text}</span>;
};

export const columns = [
    {
        title: 'ID',
        dataIndex: 'userId',
        key: 'userId',
        render: (text, record) => <CustomRender text={text} record={record} />,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <span>{record.name}</span>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (_, record) => (<span>{record.email}</span>),
    },
    {
        title: 'Account Type',
        dataIndex: 'accountType',
        key: 'accountType',
        render: (_, record) => (
            <Tag
                color={record.accountType === 'premium' ? 'gold' : 'default'}
                key={record.accountType}
            >
                {String(record.accountType).toUpperCase()}
            </Tag>
        ),
        filters: [
            {
                text: 'Basic',
                value: 'basic',
            },
            {
                text: 'Premium',
                value: 'premium',
            },
        ],
        onFilter: (value, record) => record.accountType.indexOf(value) === 0,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (_, record) => (
            <Tag
                color={record.status === 'active' ? 'success' : 'default'}
                key={record.status}
            >
                {String(record.status).toUpperCase()}
            </Tag>
        ),
        filters: [
            {
                text: 'Active',
                value: 'active',
            },
            {
                text: 'Inactive',
                value: 'inactive',
            },
        ],
        onFilter: (value, record) => record.status.indexOf(value) === 0,
    },
    {
        title: 'Last Update',
        dataIndex: 'lastUpdate',
        key: 'lastUpdate',
        sorter: (a, b) => moment(a.lastUpdate).unix() - moment(b.lastUpdate).unix(),
    },
    {
        title: 'Expired Date',
        dataIndex: 'expiredDate',
        key: 'expiredDate',
        sorter: (a, b) => moment(a.expiredDate).unix() - moment(b.expiredDate).unix(),
    },

];
