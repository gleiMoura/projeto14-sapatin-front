
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaInicial from './routes/paginainicial';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
