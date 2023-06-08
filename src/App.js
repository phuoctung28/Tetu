import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LandingPage from './pages/landingpage/LandingPage';
import NotePage from './pages/notepage/NotePage';
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

function App() {
    return (
        <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/note/:pageId" element={<Notebook />} />
                    <Route path="/test2" element={<TeTuMenu />} />
                    <Route path="/file" element={<FilePage />} />
                    <Route path="/test" element={<DraggableEditor />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/table" element={<ListView />} />
                    <Route path="/graph" element={<GraphView />} />
                    <Route path="/calendar" element={<CalendarView />} />
                    <Route path="/article" element={<ArticlePage />} />
                </Routes >
            </BrowserRouter >
        </PayPalScriptProvider >
    );
}

export default App;
