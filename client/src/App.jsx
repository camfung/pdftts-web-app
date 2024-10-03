import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AppBarComponent from './components/AppBar';
import "./App.css"

function App() {
  return (

    <div >
      < AppBarComponent />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
