import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import LandingPage from './pages/landingpage/LandingPage';
import Metadata from './components/collapse/Metadata';
import Notebook from './pages/notepage/Notebook';

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/metadata" element={<Metadata />} />
            <Route path="/note" element={<Notebook />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
