import { Badge, Button, Calendar, Divider, Layout } from 'antd';
import React, { useState, useEffect } from 'react';
import MainHeader from '../../components/header/MainHeader';
import './calendar_view.css';
import Sidebar from '../../components/sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { getAllDocument, queryDocuments } from '../../services/firebase';
import moment from 'moment';

const { Content } = Layout;
// const getListData = (value) => {
//     let listData;
//     switch (value.date()) {
//         case 8:
//             listData = [
//                 {
//                     type: 'warning',
//                     title: 'This is warning event.',
//                     url: '/',
//                 },
//                 {
//                     type: 'success',
//                     title: 'This is usual event.',
//                     url: '/',
//                 },
//             ];
//             break;
//         case 10:
//             listData = [
//                 {
//                     type: 'success',
//                     title: 'This is usual event.',
//                     url: '/',
//                 },
//                 {
//                     type: 'error',
//                     title: 'This is error event.',
//                     url: '/',
//                 },
//             ];
//             break;
//         case 15:
//             listData = [
//                 {
//                     type: 'success',
//                     title: 'This is very long usual event...',
//                     url: '/',
//                 },
//                 {
//                     type: 'error',
//                     title: 'This is error event 1.',
//                     url: '/',
//                 },
//             ];
//             break;
//         default:
//     }
//     return listData || [];
// };
const getMonthData = (value) => {
    if (value.month() === 8) {
        return 1394;
    }
};
const CalendarView = () => {
    const [fetchedData, setFetchedData] = useState();
    const userId = JSON.parse(localStorage.getItem("user")).user_id;
    useEffect(() => {
        const fetchNoteData = async () => {
            try {
                const fetchedNote = await queryDocuments('notes', 'owner', '==', userId);
                // console.log("fetch note:", fetchedNote);
                setFetchedData(fetchedNote);
            } catch (err) {
                console.error(err);
            }
        };
        fetchNoteData();
    }, [])

    const transformData = (data) => {
        const listData = [];
        if (data) {
            data.forEach(e => {
                if (e.meta_data) {
                    const { meta_data, title } = e;
                    const datetime = meta_data.datetime;
                    const formattedDate = moment(datetime).format("DD/MM/YYYY");
                    listData.push({
                        id: e.id,
                        title: title,
                        dateTime: formattedDate,
                    })
                }
            })
        }
        return listData;
    }
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
        // const listData = getListData(value);
        const firebaseData = transformData(fetchedData);
        const filteredData = firebaseData.filter((item) =>
            moment(moment(item.dateTime).format('L'))
                .isSame(moment(value.$d).format('L'))
        );
        // console.log("Calendar note: ", filteredData);
        return (
            <ul className="events">
                {filteredData.map((item) => (
                    <li key={item.title}>
                        <Button type="text" onClick={() => navigate(`/note/${item.id}`, { state: { name: item.title } }, { replace: true })}>
                            <Badge color="blue" text={item.title} />
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
                <Content className="calendar-container">
                    <div className="calendar-view-title">
                        <h2>Calendar view mode</h2>
                        <p>View your notes and documents arranged by date, month, or year</p>
                    </div>
                    <Calendar className="calendar-component" cellRender={cellRender} />
                </Content>
            </Layout>
        </Layout>
    );
};

export default CalendarView;