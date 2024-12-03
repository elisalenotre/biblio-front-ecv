import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from '../src/pages/AuthPage';
import EmprunteurPage from '../src/pages/EmprunteurPage';
import BibliothecairePage from '../src/pages/BibliothecairePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/emprunteur" element={<EmprunteurPage />} />
        <Route path="/bibliothecaire" element={<BibliothecairePage />} />
      </Routes>
    </Router>
  );
};

export default App;

