import { useEffect, useState } from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer'; 
import Home from './components/Home';
import Header from './components/Header';
import Ofertas from './components/Ofertas';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Perfil from './pages/Perfil';

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hacer el pedido a la API de Pokémon TCG
    fetch('https://api.pokemontcg.io/v2/cards', {
      headers: {
        'X-Api-Key': 'a46093c9-caec-4f2f-b2cc-15d55e6776d2', // Clave de autenticación
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Transformar los datos para que sean compatibles con el componente Home
        const productosTransformados = data.data.map((card) => ({
          id: card.id,
          title: card.name,
          image: card.images.large, // URL de la imagen grande
          // Intenta obtener el precio de TCGPlayer o Cardmarket, si existe
          price:
          card.tcgplayer?.prices?.normal?.market ||
          card.cardmarket?.prices?.averageSellPrice ||
          'N/A',
        }));
        setProductos(productosTransformados); // Guardar los productos transformados en el estado
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
        <Route path="/Ofertas" element={<Ofertas productos={productos} loading={loading} />} /> 
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
    
  );
}

export default App
