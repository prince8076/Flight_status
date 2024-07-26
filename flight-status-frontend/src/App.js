import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FlightList from './components/FlightList';
import FlightForm from './components/FlightForm';
import FlightUpdateForm from './components/FlightUpdateForm';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item"><a href="/" className="nav-link">Home</a></li>
            <li className="nav-item"><a href="/add-flight" className="nav-link">Add Flight</a></li>
            <li className="nav-item"><a href="/update-flight" className="nav-link">Update Flight</a></li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<FlightList />} />
            <Route path="/add-flight" element={<FlightForm />} />
            <Route path="/update-flight" element={<FlightUpdateForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
