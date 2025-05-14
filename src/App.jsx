import { useEffect, useState } from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer'; 
import Home from './components/Home';
import Header from './components/Header';

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hacer el pedido a la API de FakeStore
    fetch('https://fakestoreapi.com/products/')
      .then((res) => res.json())
      .then((data) => {
        // Filtrar productos por categoría "electronics"
        const productosFiltrados = data.filter((producto) => producto.category === 'electronics');
        setProductos(productosFiltrados); // Guardar los productos filtrados en el estado
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error de carga de API', err);
        setLoading(false);
      });
  }, []);


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home productos={productos} loading={loading} />} />
        <Route path="/Home" element={<Home productos={productos} loading={loading} />} />
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App
