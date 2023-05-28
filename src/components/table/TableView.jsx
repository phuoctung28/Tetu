import "../../assets/styles/table.css";
import { Button, Space, Table, Tag, Badge } from 'antd';
import { useState } from 'react';
import moment from 'moment';

const columns = [
   {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a href="/table">{text}</a>,
   },
   {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      align: 'center',
      render: (_, { type }) => (
         <Tag
            color={
               type === 'Note'
                  ? 'blue'
                  : (type === 'File'
                     ? 'green'
                     : 'purple')
            }
            key={type}
         >
            {type.toUpperCase()}
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
         },
         {
            text: 'Canvas',
            value: 'Canvas',
         }
      ],
      onFilter: (value, record) => record.type.indexOf(value) === 0,
   },
   {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
         // <Space size="middle">
         //    <a href="/table">Invite {record.name}</a>
         // </Space>
         <Badge
            color={
               record.status === 'To-do'
                  ? 'yellow'
                  : (record.status === 'In progress'
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
            {tags.map((tag) => {
               return (
                  <Tag key={tag}>
                     {tag.toUpperCase()}
                  </Tag>
               );
            })}
         </>
      ),
   },

   {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
         <Space size="middle">
            <a href="/table">Delete</a>
         </Space>
      ),
   },
];
const data = [
   {
      key: '1',
      title: 'Intro to ML with TF',
      status: 'To-do',
      date: moment('05/31/2023').format('L'),
      tags: ['study', 'AI/ML'],
      type: 'Note',
   },
   {
      key: '2',
      title: 'PyTorch Introduction',
      status: 'In progress',
      date: moment('05/01/2023').format('L'),
      tags: ['CV'],
      type: 'File',
   },
   {
      key: '3',
      title: 'Transfer Learning',
      status: 'Done',
      date: moment('04/30/2023').format('L'),
      tags: ['study', 'AI/ML'],
      type: 'Canvas',
   },
];
const TableView = () => {
   const [selectedRowKeys, setSelectedRowKeys] = useState([]);
   const [loading, setLoading] = useState(false);
   const start = () => {
      setLoading(true);
      // ajax request after empty completing
      setTimeout(() => {
         setSelectedRowKeys([]);
         setLoading(false);
      }, 1000);
   };
   const onSelectChange = (newSelectedRowKeys) => {
      console.log('selectedRowKeys changed: ', newSelectedRowKeys);
      setSelectedRowKeys(newSelectedRowKeys);
   };
   const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
   };
   const hasSelected = selectedRowKeys.length > 0;
   return (
      <div>
         <div
            style={{
               marginBottom: 16,
            }}
         >
            <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
               Reload
            </Button>
            <span
               style={{
                  marginLeft: 8,
               }}
            >
               {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
         </div>
         <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      </div>
   );
};
export default TableView;

