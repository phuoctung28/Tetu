import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LandingPage from './pages/landingpage/LandingPage';
import NotePage from './pages/notepage/NotePage';
import FilePage from './pages/file/FilePage';
import ListView from './pages/listview/ListView';
import ReadDocument from './components/popover/ReadDocument';

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/note" element={<NotePage />} />
            <Route path="/file" element={<FilePage />} />
            <Route path="/table" element={<ListView />} />
            <Route path="/read-doc" element={<ReadDocument />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
