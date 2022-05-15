
import ReactDOM from 'react-dom';
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaInicial from './routes/paginainicial';
import PaginaLogin from './routes/login'
import PaginaSignup from './routes/signup';
import { UserContext } from './UserContext';

function App() {

  const [token, setToken] = useState();

  return (
    <UserContext.Provider value={{token, setToken}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/signup" element={<PaginaSignup />} />
        </Routes>
    </BrowserRouter>
  </UserContext.Provider>
  );
}

export default App;
