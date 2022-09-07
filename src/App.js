
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaInicial from './routes/paginainicial/index';
import SpecificCategory from './routes/paginas/category';
import ProductsBag from './routes/paginas/bag';
import LogIn from './routes/paginas/login';
import Register from './routes/paginas/register';
import EndShop from './routes/paginas/endShopp';
import ProfileContent from "./routes/paginas/profile"
import dataContext from './context/dataContext.js';
import {useState} from "react";

function App() {
  const [data, setData] = useState({});
  return (
    <dataContext.Provider value={{ data, setData }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn setData={setData} />} />
          <Route path="/category/:idCategory" element={<SpecificCategory />} />
          <Route path="/bag" element={<ProductsBag />} />
          <Route path="/endShopp" element={<EndShop />} />
          <Route path="/profile" element={<ProfileContent />}></Route>
        </Routes>
      </BrowserRouter>
    </dataContext.Provider>
  );
}

export default App;
