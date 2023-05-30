import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LandingPage from './pages/landingpage/LandingPage';
import Metadata from './components/collapse/Metadata';
import Notebook from './pages/notepage/Notebook';
import FilePage from './pages/file/FilePage';
import DraggableContainer from "./components/Drag/DraggableContainer";
import Editor from "./components/Editor/Editor";
import DraggableEditor from "./components/Editor/Editor";

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/metadata" element={<Metadata />} />
            <Route path="/note/:pageId" element={<Notebook />} />
            <Route path="/file" element={<FilePage />} />
            <Route path="/test" element={<DraggableEditor />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
