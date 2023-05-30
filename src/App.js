import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LandingPage from './pages/landingpage/LandingPage';
import Metadata from './components/collapse/Metadata';
import Notebook from './pages/notepage/Notebook';
import FilePage from './pages/file/FilePage';
import PricingPage from './pages/pricing/PricingPage';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import DraggableContainer from "./components/Drag/DraggableContainer";
import Editor from "./components/Editor/Editor";
import DraggableEditor from "./components/Editor/Editor";

function App() {
   return (
     <PayPalScriptProvider options={{"client-id" :"AYoTMzxCm2u7ot7z8kCWQGMgUlf79LmiJIrLY2zBpIemVUhBZh3nhF4llvBr5bIAk4jNgey06AAae5ex"}}>
       <BrowserRouter>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/metadata" element={<Metadata />} />
            <Route path="/note" element={<Notebook />} />
            <Route path="/file" element={<FilePage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/metadata" element={<Metadata />} />
            <Route path="/note/:pageId" element={<Notebook />} />
            <Route path="/file" element={<FilePage />} />
            <Route path="/test" element={<DraggableEditor />} />
            <Route path="/pricing" element={<PricingPage />} />
         </Routes>
       </BrowserRouter>
     </PayPalScriptProvider>
   );
}

export default App;
