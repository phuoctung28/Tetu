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

function App() {
   return (
      <PayPalScriptProvider options={{ "client-id": "AYoTMzxCm2u7ot7z8kCWQGMgUlf79LmiJIrLY2zBpIemVUhBZh3nhF4llvBr5bIAk4jNgey06AAae5ex" }}>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<LandingPage />} />
               <Route path="/home" element={<Home />} />
               <Route path="/note" element={<NotePage />} />
               <Route path="/note/:pageId" element={<Notebook />} />
               <Route path="/file" element={<FilePage />} />
               <Route path="/test" element={<DraggableEditor />} />
               <Route path="/pricing" element={<PricingPage />} />
               <Route path="/table" element={<ListView />} />
               <Route path="/graph" element={<GraphView />} />
            </Routes >
         </BrowserRouter >
      </PayPalScriptProvider >
   );
}

export default App;
