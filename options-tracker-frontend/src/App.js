import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import OpenOptionsList from './components/OpenOptionsList';
import ClosedOptionsList from './components/ClosedOptionsList';
import EditOptionForm from './components/EditOptionForm';
import AddOptionForm from './components/AddOptionForm';
//import OptionsCalculator from './components/OptionsCalculator';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddOptionForm />} />
        <Route path="/edit/:id" element={<EditOptionForm />} />
        <Route path="/open" element={<OpenOptionsList />} />
        <Route path="/closed" element={<ClosedOptionsList />} />
      </Routes>
    </Router>
  );
};

export default App;

