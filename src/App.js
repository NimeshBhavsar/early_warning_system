import mslogo from './resources/MS_Logo.png';
import thdlogo from './resources/THD_Logo.png';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/Homepage";
import AnalysisPage from "./pages/Analysispage";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="app-container">
          {/* Header */}
          <header className="header">
            <img id='thdlogo' src={thdlogo} alt="THD Logo" />


            <h1>Early Warning System</h1>
            <img id='mslogo' src={mslogo} alt="MS Logo" />

          </header>

          {/* Sidebar and content */}
          <div className="main-container">
            {/* Sidebar */}
            <nav className="sidebar">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/analysis">Analysis</Link>
                </li>
              </ul>
            </nav>

            {/* Content area */}
            <div className="content">
              <Routes>
                <Route exact path="/" component={HomePage} />
                <Route path="/analysis" component={AnalysisPage} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
