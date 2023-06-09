import "../../assets/styles/table.css";
import { Button, Space, Table, Tag, Badge } from 'antd';
import { useState } from 'react';
import moment from 'moment';

const columns = [
   
];

const DictionaryTable = () => {
    return (
        <div>
            <Table columns={columns} />
        </div>
    );
};
export default DictionaryTable;

