import mslogo from './resources/MS_Logo.png';
import thdlogo from './resources/THD_Logo.png';
import Homelogo from './resources/Home_logo.png';
import Analysislogo from './resources/Analysis_logo.png';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Analysispage from "./pages/Analysispage";
import GenderPieChart from './components/GenderPieChart';
import CategoricalAnalysis from './components/CategoricalAnalysis';
import Analysispage1 from './pages/Analysispage copy';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="app-container">
          {/* Header */}
          <header className="header">
            {/* <img id='thdlogo' src={thdlogo} alt="THD Logo" /> */}


            <h1>Early Warning System</h1>
            <img id='mslogo' src={mslogo} alt="MS Logo" />

          </header>

          {/* Sidebar and content */}
          <div className="main-container">
            {/* Sidebar */}
            <nav className="sidebar">

              <Link to="/">
                <img id='Homelogo' src={Homelogo} alt="Home Logo" />
              </Link>

              <Link to="/temp1">
                <img id='Analysislogo' src={Analysislogo} alt="Analysis Logo" />
              </Link>
            </nav>

            {/* Content area */}
            <div className="content">

              <Routes>
                <Route exact path="/" element={<Homepage></Homepage>} />
                <Route path="/analysis" element={<Analysispage />} />
                <Route path="/temp1" element={<Analysispage1 />} />
                <Route path="/temp2" element={<CategoricalAnalysis />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;