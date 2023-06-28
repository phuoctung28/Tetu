import './App.css';
import { ConfigProvider, theme } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LandingPage from './pages/landingpage/LandingPage';
import FilePage from './pages/filepage/FilePage';
import PricingPage from './pages/pricing/PricingPage';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import DraggableEditor from "./components/Editor/Editor";
import ListView from './pages/listview/ListView';
import GraphView from './pages/graphview/GraphView';
import Notebook from './pages/notepage/Notebook';
import TeTuMenu from "./components/menu/Menu";
import CalendarView from './pages/calendarview/CalendarView';
import ArticlePage from './pages/article/ArticlePage';
import DictionaryList from './pages/dictionary/DictionaryList';
import UserProfile from './pages/userpage/UserProfile';
import Dashboard from './pages/admin/Dashboard';
import CheckoutForm from './components/order/Checkout';
import ManageOrder from './pages/admin/ManageOrder';
import { useEffect, useState } from 'react';

function App() {
    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleChangeTheme = () => {
        console.log("THEME:", isDarkMode);
        setIsDarkMode((previousValue) => !previousValue);
    };
    
    return (
        <ConfigProvider
            theme={{
                algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                token: {
                    "colorPrimary": "#1f7eff",
                    // "colorBgContainer": "#242627",
                }
            }}>
            <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/home" element={<Home setIsDarkMode={setIsDarkMode} />} />
                        <Route path="/note/:noteId" element={<Notebook setIsDarkMode={setIsDarkMode} />} />
                        <Route path="/file" element={<FilePage setIsDarkMode={setIsDarkMode} />} />
                        <Route path="/file/:fileId" element={<FilePage setIsDarkMode={setIsDarkMode} />} />
                        <Route path="/pricing" element={<PricingPage setIsDarkMode={setIsDarkMode} />} />
                        <Route path="/table" element={<ListView setIsDarkMode={setIsDarkMode} />} />
                        <Route path="/graph" element={<GraphView setIsDarkMode={setIsDarkMode} />} />
                        <Route path="/graph/:folderId" element={<GraphView setIsDarkMode={setIsDarkMode} />} />
                        <Route path="/calendar" element={<CalendarView setIsDarkMode={setIsDarkMode} />} />
                        <Route path="/article" element={<ArticlePage setIsDarkMode={setIsDarkMode} />} />
                        <Route path="/article/:articleId" element={<ArticlePage setIsDarkMode={setIsDarkMode} />} />
                        <Route path="/dictionary" element={<DictionaryList setIsDarkMode={setIsDarkMode} />} />
                        <Route path="/user-profile" element={<UserProfile setIsDarkMode={setIsDarkMode} />} />
                        <Route path="/checkout" element={<CheckoutForm />} />
                        <Route path="/dashboard" element={<Dashboard setIsDarkMode={setIsDarkMode} />} />
                        <Route path="/manage-order" element={<ManageOrder setIsDarkMode={setIsDarkMode} />} />
                    </Routes >
                </BrowserRouter >
            </PayPalScriptProvider >
        </ConfigProvider>
    );
}

export default App;
