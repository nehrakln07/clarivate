import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ListingPage from './pages/ListingPage';
import Header from "./componets/Header";

import "./App.scss";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/list" element={<ListingPage/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;