import {Avatar, Divider, Input, Layout, theme, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import SideMenu from '../../components/sidebar/SideMenu';
import MainHeader from '../../components/header/MainHeader';
import './notebook.css';
import Metadata from '../../components/collapse/Metadata';
import TetuEditor from "../../components/Editor/Editor";
import {useLocation, useParams} from "react-router-dom";

const {Content} = Layout;

const Notebook = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [pageData, setPageData] = useState();
    const [title, setTitle] = useState("Untitled");
    const { pageId } = useParams();
    // useEffect(() => {
    //     return () => {
    //         fetch(`$firebase get/${pageId}`, {})
    //             .then((res) => res.json())
    //             .then((response) => {
    //                 setPageData(response);
    //                 setIsLoading(false)
    //                 // setTitle(response)
    //             })
    //             .catch((error) => console.log(error))
    //     };
    // }, [pageId]);

    const handleKeyUp = (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            event.target.blur();
        }
    }
    return (
        <Layout hasSider>
            <SideMenu />
            <Layout className="site-layout" style={{marginLeft: 200}}>
                <MainHeader/>
                <Content className="notebook-container">
                    <Input
                        className="note-title"
                        onPressEnter={handleKeyUp}
                        placeholder="Untitled"
                        bordered={false}
                        value={pageId}
                    />
                    <Metadata/>
                    <TetuEditor/>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Notebook;