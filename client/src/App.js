import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';


// Styled components
import {StyledContainer} from './components/Styles';

function App() {
  return (
    <BrowserRouter>
      <StyledContainer>
        <Routes>
          <Route path="/" element={<Register/>} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login/>} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Register/>} />
        </Routes>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
        <Routes>
          <Route path="/editor" element={<Editor/>} />
        </Routes>
      </StyledContainer>
    </BrowserRouter>
  );
}

export default App