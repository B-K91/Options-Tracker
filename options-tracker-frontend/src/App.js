import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OpenOptionsList from './components/OpenOptionsList';
import ClosedOptionsList from './components/ClosedOptionsList';
import EditOptionForm from './components/EditOptionForm';
import AddOptionForm from './components/AddOptionForm';
import OptionsCalculator from './components/Calculator';
import Performance from './components/Performance';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpenOptionsList />} />
        <Route path="/add" element={<AddOptionForm />} />
        <Route path="/edit/:id" element={<EditOptionForm />} />
        <Route path="/open" element={<OpenOptionsList />} />
        <Route path="/closed" element={<ClosedOptionsList />} />
        <Route path="/calculator" element={<OptionsCalculator />} />
        <Route path="/performance" element={<Performance />} />
      </Routes>
    </Router>
  );
};

export default App;

