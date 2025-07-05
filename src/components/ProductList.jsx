import React, { useEffect, useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
// import Swal from 'sweetalert2'; // Comentado: ya no se usa el aviso
import { CartContext } from './CardContex';

/**
 * Componente que muestra una lista de cartas con paginación y permite agregar al carrito.
 * Props:
 * - sortType: 'cheap' | 'expensive'
 * - typeFilter: string (tipo de carta)
 * - currentPage: número de página actual
 * - itemsPerPage: cantidad de cartas por página
 * - onTotalChange: callback para informar el total de cartas filtradas (nuevo)
 */
const ProductList = ({ sortType, typeFilter, currentPage = 1, itemsPerPage = 20, onTotalChange }) => {
  const [cartas, setCartas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useContext(CartContext);

  // Nuevo: Estado para llevar la cantidad agregada de cada carta
  const [cantidades, setCantidades] = useState({});

  // Trae las cartas desde la API cada vez que cambia el filtro de tipo
  useEffect(() => {
    let url = 'https://api.pokemontcg.io/v2/cards?pageSize=120';
    if (typeFilter) {
      url += `&q=types:${typeFilter}`;
    }
    setLoading(true);
    fetch(url, {
      headers: {
        'X-Api-Key': import.meta.env.VITE_POKEMON_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Si data.data no existe, pon un array vacío
        const cartasTransformadas = (data.data || []).map((card) => ({
          id: card.id,
          title: card.name,
          image: card.images?.small,
          price:
            card.tcgplayer?.prices?.normal?.market ||
            card.cardmarket?.prices?.averageSellPrice ||
            'N/A',
        }));
        setCartas(cartasTransformadas);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setCartas([]); // Asegura que cartas sea un array
        setLoading(false);
      });
  }, [typeFilter]);

  // Ordenar según sortType y filtra las cartas según el tipo de orden
  let cartasOrdenadas = [...cartas].filter(c => c.price !== 'N/A');
  if (sortType === 'cheap') {
    cartasOrdenadas = cartasOrdenadas.filter(c => Number(c.price) <= 5);
    cartasOrdenadas = cartasOrdenadas.slice(0, 50); // 50 más baratas
  } else if (sortType === 'expensive') {
    cartasOrdenadas.sort((a, b) => b.price - a.price);
    cartasOrdenadas = cartasOrdenadas.slice(0, 100); // 100 más caras
  }

  // Paginación: calcula qué cartas mostrar en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const cartasPaginadas = cartasOrdenadas.slice(startIndex, endIndex);

  // Avisar a Home cuántas cartas hay tras el filtro y orden
  useEffect(() => {
    if (onTotalChange) {
      onTotalChange(cartasOrdenadas.length);
    }
  }, [cartasOrdenadas.length, onTotalChange]);

  // Cambiado: ahora suma la cantidad agregada y NO muestra aviso
  const handleAgregarAlCarrito = (carta) => {
    agregarAlCarrito(carta); // agrega al carrito usando el contexto
    setCantidades((prev) => ({
      ...prev,
      [carta.id]: (prev[carta.id] || 0) + 1,
    }));
    // Swal.fire({
    //   title: '¡Agregado!',
    //   text: `La carta ${carta.title} fue agregada al carrito.`,
    //   icon: 'success',
    //   timer: 2000,
    //   showConfirmButton: false,
    //   toast: window.innerWidth >= 600, // Solo toast en desktop
    //   position: window.innerWidth < 600 ? 'center' : 'top-end', // Centrado en mobile
    //   width: window.innerWidth < 600 ? '90vw' : undefined // Más ancho en mobile
    // });
  };

  // después de todos los hooks, puedes retornar según loading o cartas
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Row>
      {cartasPaginadas.length > 0 ? (
        cartasPaginadas.map((carta) => (
          <Col md={3} key={carta.id} className="mb-4">
            <ProductCard
              producto={carta}
              onAgregarAlCarrito={handleAgregarAlCarrito}
              cantidadAgregada={cantidades[carta.id] || 0} // Pasa la cantidad a la card
            />
            {/* Antes se podía mostrar aquí la cantidad:
            <div className="text-center">
              Agregados: {cantidades[carta.id] || 0}
            </div>
            */}
          </Col>
        ))
      ) : (
        <div className="col-12 text-center">
          <p>No se encontraron cartas para este filtro.</p>
        </div>
      )}
    </Row>
  );
};

export default ProductList;