import { Badge, Button, Calendar, Layout } from 'antd';
import React, { useState } from 'react';
import MainHeader from '../../components/header/MainHeader';
import './calendar_view.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const getListData = (value) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                {
                    type: 'warning',
                    title: 'This is warning event.',
                    url: '/',
                },
                {
                    type: 'success',
                    title: 'This is usual event.',
                    url: '/',
                },
            ];
            break;
        case 10:
            listData = [
                {
                    type: 'success',
                    title: 'This is usual event.',
                    url: '/',
                },
                {
                    type: 'error',
                    title: 'This is error event.',
                    url: '/',
                },
            ];
            break;
        case 15:
            listData = [
                {
                    type: 'success',
                    title: 'This is very long usual event...',
                    url: '/',
                },
                {
                    type: 'error',
                    title: 'This is error event 1.',
                    url: '/',
                },
            ];
            break;
        default:
    }
    return listData || [];
};
const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394;
    }
};
const CalendarView = () => {
    const monthCellRender = (value) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };
    const navigate = useNavigate();

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.title}>
                        <Button type="text" onClick={() => navigate(item.url)}>
                            <Badge status={item.type} text={item.title} />
                            {/* {item.content} */}
                        </Button>
                    </li>
                ))}
            </ul>
        );
    };
    const cellRender = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };
    return (
        <Layout hasSider>
            <Sidebar />
            <Layout className="site-layout" style={{ marginLeft: 200, }} >
                <MainHeader />
                <Content style={{ margin: '0', overflow: 'initial', }} >
                    <Calendar cellRender={cellRender} />
                </Content>
            </Layout>
        </Layout>
    );
};

export default CalendarView;