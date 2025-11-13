import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoginSuccess from "./pages/LoginSuccess";
import LoginError from './pages/LoginError';
import Inicio from './pages/Inicio';
import Series from './pages/Series';
import Peliculas from './pages/Peliculas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/login-error" element={<LoginError />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/series" element={<Series />} />
        <Route path="/peliculas" element={<Peliculas />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
