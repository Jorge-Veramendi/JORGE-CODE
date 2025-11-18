import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoginSuccess from "./pages/LoginSuccess";
import LoginError from './pages/LoginError';
import Inicio from './pages/Inicio';
import Series from './pages/Series';
import Peliculas from './pages/Peliculas';
import Detalles from './pages/Detalles';
import Recuperar from './pages/Recuperar';
import CorreoEnviado from "./pages/CorreoEnviado";
import Buscar from "./pages/Buscar";

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
        <Route path="/detalles/:id" element={<Detalles />} />
        <Route path="/recuperar" element={<Recuperar />} />
        <Route path="/correo-enviado" element={<CorreoEnviado />} />
        <Route path="/buscar" element={<Buscar />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
