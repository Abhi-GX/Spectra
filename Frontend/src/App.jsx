import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './components/Homepage'; // Import SearchPage
import OptionsPage from './components/options';
import { NetraIDProvider } from '../netraidcontext';

const App = () => {
  return (
    <NetraIDProvider>
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage/>} /> 
        <Route path="/options" element={<OptionsPage/>} />
      </Routes>
      </Router>
      </NetraIDProvider>
  );
};

export default App;
