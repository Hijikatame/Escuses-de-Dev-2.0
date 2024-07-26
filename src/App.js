import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';
import ExcusePage from './components/ExcusePage';
import AddExcusePage from './components/AddExcusePage';
import LostPage from './components/LostPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/excuses/:http_code" element={<ExcusePage />} />
        <Route path="/add" element={<AddExcusePage />} />
        <Route path="/lost/:http_code" element={<LostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
