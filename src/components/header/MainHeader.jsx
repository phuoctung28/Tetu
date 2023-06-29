import React, { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.png';
import { Breadcrumb, Button, Popconfirm, Popover, Tooltip } from 'antd';
import { BellOutlined, BgColorsOutlined, UnorderedListOutlined, PushpinOutlined, SplitCellsOutlined, SaveOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import '../../assets/styles/main_header.css';
import { useNavigate } from 'react-router-dom';
import SearchComponent from "../Seach/Search";

const MainHeader = ({ showButton = false, dualNote, handleToggleDualNote, noteData, saveNoteContent, savingMsg, setIsDarkMode }) => {
    const navigate = useNavigate();
    const [isSearchOpened, setIsSearchOpened] = useState(false);
    const [theme, setTheme] = useState("dark");

    // const [crumbItem, setCrumbItem] = useState([]);
    // useEffect(() => {
    //     if (noteData) {
    //         const crumbs = [noteData.location, noteData.title].map(crumb => {
    //             return { title: <span>{crumb}</span> }
    //         });
    //         setCrumbItem(crumbs);
    //     }
    // }, [noteData]);

    const handleLogoClick = () => {
        navigate("/home")
    };
    const handleOpenSearch = () => {
        setIsSearchOpened(!isSearchOpened);
    };

    const switchTheme = (currentTheme) => {
        setTheme(currentTheme);
        localStorage.setItem("theme", currentTheme);
        // console.log("handle:", typeof previousValue);
        setIsDarkMode(currentTheme === "dark");
        document.querySelector("body").setAttribute('data-theme', currentTheme);
    };

    const ThemeColor = () => {
        return (
            <div>
                <div className="theme-color">
                    <Button style={{ backgroundColor: "#ffffff" }} onClick={() => switchTheme("light")} />
                    <Button style={{ backgroundColor: "#1F99FF" }} onClick={() => switchTheme("light")} />
                    <Button style={{ backgroundColor: "#191A1B" }} onClick={() => switchTheme("dark")} />
                </div>
                <p>(<em>Ctrl + Q</em> to toggle light/dark mode)</p>
            </div>
        )
    }

    // useEffect(() => {
    //     document.querySelector("body").setAttribute('data-theme', theme);
    // }, []);
    useEffect(() => {

        const localTheme = localStorage.getItem("theme");
        if (!localTheme) {
            localStorage.setItem("theme", "light");
        }
        switchTheme(localTheme);

        const keyDown = (event) => {
            if (event.ctrlKey && event.key === "q") {
                event.preventDefault();
                switchTheme(theme === "light" ? "dark" : "light");
            }
        };
        document.addEventListener("keydown", keyDown);
        return () => {
            document.removeEventListener("keydown", keyDown);
        };
    });
    return (
        <div className='header-container'>
            <div className='header-left'>
                <a href="/home" className='btn-logo' onClick={handleLogoClick}>
                    <img src={logo} alt="logo tetu" />
                </a>
                {/* {noteData && <Breadcrumb
                    className='breadcrumb'
                    items={crumbItem} />
                } */}
            </div>
            <div className='header-right'>
                {savingMsg && <div className='saving-msg'>
                    Saving...
                </div>}
                <Tooltip title="Pin note is in development">
                    <Button className='btn-toolbar' shape="circle"
                        icon={<PushpinOutlined style={{ color: '#596A77' }} />} />
                </Tooltip>
                <Tooltip title="Outline">
                    <Button
                        className='btn-toolbar btn-outline'
                        shape="circle"
                        // onClick={saveNoteContent}
                        icon={<UnorderedListOutlined style={{ color: '#596A77' }} />} />
                </Tooltip>
                <Popover placement="bottom" title="Choose theme" content={ThemeColor} trigger="click">
                    <Button
                        className='btn-toolbar btn-theme'
                        shape="circle"
                        // onClick={saveNoteContent}
                        icon={<BgColorsOutlined style={{ color: '#596A77' }} />} />
                </Popover>
                <Tooltip title="Save">
                    <Button
                        className='btn-toolbar'
                        shape="circle"
                        onClick={saveNoteContent}
                        icon={<SaveOutlined style={{ color: '#596A77' }} />} />
                </Tooltip>
                <Tooltip title="Notifications">
                    <Button
                        className='btn-toolbar'
                        shape="circle"
                        // onClick={saveNoteContent}
                        icon={<BellOutlined style={{ color: '#596A77' }} />} />
                </Tooltip>

                {/* <Popconfirm
                    title="Confirm Delete"
                    description="Are you sure to delete this note?"
                    // onConfirm={signOut}
                    // onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button className='btn-toolbar' shape="circle" icon={<DeleteOutlined style={{ color: '#596A77' }} />} />
                </Popconfirm> */}
                {
                    showButton &&
                    <Tooltip title="Ctrl + D">
                        <Button
                            type={dualNote ? "primary" : "default"}
                            className='btn-toolbar'
                            icon={<SplitCellsOutlined size="large" style={{ color: dualNote ? '#fff' : '#596A77' }} />}
                            onClick={handleToggleDualNote}
                        >
                            Dual Note
                        </Button>
                    </Tooltip>
                }
                <Tooltip title="Search">
                    <Button className='btn-toolbar' shape="circle"
                        onClick={() => setIsSearchOpened(!isSearchOpened)}
                        icon={<SearchOutlined style={{ color: '#596A77' }} />} />
                </Tooltip>
                <SearchComponent isOpened={isSearchOpened} handleOpenSearch={handleOpenSearch} />
            </div>
        </div>
    );
};

export default MainHeader;