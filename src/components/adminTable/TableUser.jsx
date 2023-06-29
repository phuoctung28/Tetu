import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Popconfirm, Space, Table, Tag, message } from 'antd';
import { getAllDocuments, updateDocument, updateDocumentProperty } from '../../services/firebase';
// import { columns } from './tableUserColumn';
import '../../assets/styles/table_user.css';
import moment from 'moment/moment';
import { FileType } from '../../enums/FileType';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const CustomRender = ({ text, record }) => {
    return <span style={{ color: "#1F99FF", cursor: "pointer" }} >{text}</span>;
};
const TableUser = () => {
    const userId = JSON.parse(localStorage.getItem("user")).user_id;
    const [users, setUsers] = useState([]);
    const [table, setTable] = useState([]);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90, }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90, }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const loadUsers = async () => {
        try {
            const fetchedUserList = await getAllDocuments('users');
            console.log("USER LIST:", fetchedUserList)
            setUsers(fetchedUserList);
        } catch (error) {
            console.error('Error fetching folders and notes:', error);
        }
    };

    const handleChangePlan = async (record) => {
        // console.log("UPDATE USER:", record);
        const newPlan = record.accountType === "premium" ? "basic" : "premium";
        try {
            await updateDocumentProperty("users", record.userId, "accountType", newPlan);
            await updateDocumentProperty("users", record.userId, "lastUpdate", moment(new Date()).format("DD/MM/YYYY"));
            await updateDocumentProperty("users", record.userId, "expiredDate", moment(new Date()).add(1, 'M').format("DD/MM/YYYY"));
            const newUsers =
                users.map((item) =>
                    item.userId !== record.userId
                        ? item
                        : { ...item, accountType: newPlan }
                );
            // setUsers(newUsers);
            loadUsers();
            message.success("Update plan successfully!");
        } catch (error) {
            console.log("Error update account type: ", error);
        }
    }

    const mapToModel = () => {
        const usersModel = users.map((user) => ({
            userId: user.user_id,
            name: user.name,
            email: user.email,
            accountType: user.accountType,
            status: user.status,
            lastUpdate: moment(user.lastUpdate, 'DD/MM/YYYY').format('DD/MM/YYYY'),
            expiredDate: moment(user.expiredDate, 'DD/MM/YYYY').format('DD/MM/YYYY'),
        }));
        setTable([...usersModel]);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        mapToModel();
    }, [users]);

    const columns = [
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
            ...getColumnSearchProps('name'),
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
            render: (_, record) => (
                <span>{record.accountType.toLowerCase() === "premium"
                    ? record.expiredDate
                    : "_"}
                </span>
            ),
            // sorter: (a, b) => moment(a.expiredDate).unix() - moment(b.expiredDate).unix(),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Popconfirm
                        placement="bottomRight"
                        title="Confirm change account type"
                        description={`Are you sure to change account type to ${record.accountType === "premium" ? "basic" : "premium"}?`}
                        onConfirm={() => handleChangePlan(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>
                            Change Plan
                        </Button >
                    </Popconfirm >
                    <Popconfirm
                        placement="bottomRight"
                        title="Confirm change account status"
                        description={`Are you sure to change account type to ${record.status === "active" ? "inactive" : "active"}?`}
                        // onConfirm={() => handleChangePlan(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>
                            Change Status
                        </Button >
                    </Popconfirm >
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Table
                pagination={{
                    position: ["topRight"],
                }}
                columns={columns}
                dataSource={table} />
        </div>
    );
};

export default TableUser;
