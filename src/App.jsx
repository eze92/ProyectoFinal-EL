import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer'; 
import Home from './components/Home';
import Header from './components/Header';
import Ofertas from './components/Ofertas';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import RutaProtegida from './components/RutaProtegida';
import Administracion from './pages/Administracion';
import Carrito from './pages/Carrito';
import ComoJugar from './pages/ComoJugar';
import { CartProvider } from './components/CardContex';
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="d-flex flex-column min-vh-100">
          <Router>
            <Header />
            <div className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Ofertas" element={<Ofertas />} /> 
                <Route path="/login" element={<Login />} />
                <Route path="/perfil/:id" element={
                  <RutaProtegida><Perfil /></RutaProtegida>
                } />
                <Route path="/admin" element={
                  <RutaProtegida><Administracion /></RutaProtegida>
                } />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/comojugar" element={<ComoJugar />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;