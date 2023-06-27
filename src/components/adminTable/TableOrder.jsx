import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Popconfirm, Space, Statistic, Table, Tag, message } from 'antd';
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
const TableOrder = () => {
    const userId = JSON.parse(localStorage.getItem("user")).user_id;
    const [orders, setOrders] = useState([]);
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

    const loadOrders = async () => {
        try {
            const fetchedOrderList = await getAllDocuments('orders');
            console.log("ORDER LIST:", fetchedOrderList)
            setOrders(fetchedOrderList);
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
                orders.map((item) =>
                    item.userId !== record.userId
                        ? item
                        : { ...item, accountType: newPlan }
                );
            // setOrders(newUsers);
            loadOrders();
            message.success("Update plan successfully!");
        } catch (error) {
            console.log("Error update account type: ", error);
        }
    }

    const mapToModel = () => {
        const ordersModel = orders.map((order) => ({
            id: order.id,
            // userId: order.userId,
            name: order.name,
            email: order.email,
            phone: order.phone,
            address: order.address,
            status: order.status,
            value: order.value,
            createdDate: moment(order.createdDate, 'DD/MM/YYYY').format('DD/MM/YYYY'),
            processDate: moment(order.processDate, 'DD/MM/YYYY').format('DD/MM/YYYY'),
        }));
        setTable([...ordersModel]);
    };

    useEffect(() => {
        loadOrders();
    }, []);

    useEffect(() => {
        mapToModel();
    }, [orders]);

    const columns = [
        {
            title: 'ORDER ID',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => <span>{record.id}</span>,
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
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (_, record) => (<span>{record.phone}</span>),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <Tag
                    color={record.status === 'paid' ? 'success' : 'default'}
                    key={record.status}
                >
                    {String(record.status).toUpperCase()}
                </Tag>
            ),
            filters: [
                {
                    text: 'Paid',
                    value: 'paid',
                },
                {
                    text: 'Done',
                    value: 'done',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
            title: 'Value (đ)',
            dataIndex: 'value',
            key: 'value',
            render: (_, record) => (
                <span>{record.value}</span>
                // <Statistic
                //     size="small"
                //     value={record.value}
                //     suffix="đ"
                // />
            ),
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            sorter: (a, b) => moment(a.createdDate).unix() - moment(b.createdDate).unix(),
        },
        {
            title: 'Process Date',
            dataIndex: 'processDate',
            key: 'processDate',
            sorter: (a, b) => moment(a.processDate).unix() - moment(b.processDate).unix(),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    placement="bottomRight"
                    title="Confirm update order"
                    description="Are you sure to update order status?"
                    // onConfirm={() => handleChangePlan(record)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button>
                        Update Status
                    </Button >
                </Popconfirm >
            ),
        },
    ];
    return (
        <>
            <Table
                pagination={{
                    position: ["topRight"],
                }}
                columns={columns}
                dataSource={table} />
        </>
    );
};

export default TableOrder;
