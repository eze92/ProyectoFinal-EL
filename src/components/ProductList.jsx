import React, { useEffect, useState ,useContext} from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import Swal from 'sweetalert2';
import { CartContext } from './CardContex';

/**
 * Componente que muestra una lista de cartas con paginación y permite agregar al carrito.
 * Props:
 * - sortType: 'cheap' | 'expensive'
 * - typeFilter: string (tipo de carta)
 * - currentPage: número de página actual
 * - itemsPerPage: cantidad de cartas por página
 */
const ProductList = ({ sortType, typeFilter, currentPage = 1, itemsPerPage = 20 }) => {
  const [cartas, setCartas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useContext(CartContext);

  // Trae las cartas desde la API cada vez que cambia el filtro de tipo
  useEffect(() => {
    let url = 'https://api.pokemontcg.io/v2/cards?pageSize=120';
    if (typeFilter) {
      url += `&q=types:${typeFilter}`;
    }
    fetch(url, {
      headers: {
        'X-Api-Key': 'a46093c9-caec-4f2f-b2cc-15d55e6776d2',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Transforma los datos de la API al formato que usamos
        const cartasTransformadas = data.data.map((card) => ({
          id: card.id,
          title: card.name,
          image: card.images.small,
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
        setLoading(false);
      });
  }, [typeFilter]);

    // Muestra un aviso y agrega la carta al carrito
  const handleAgregarAlCarrito = (carta) => {
    agregarAlCarrito(carta); // agrega al carrito usando el contexto
    Swal.fire({
    title: '¡Agregado!',
    text: `La carta ${carta.title} fue agregada al carrito.`,
    icon: 'success',
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
    width: '90%' // Hace que el toast sea más angosto en móvil
  });
};

  if (loading) {
    return <div>Loading...</div>;
  }

  // Ordenar según sortType  y filtra las cartas según el tipo de orden
  let cartasOrdenadas = [...cartas].filter(c => c.price !== 'N/A');
  if (sortType === 'cheap') {
    // Solo cartas con precio <= 1 (oferta)
    cartasOrdenadas = cartasOrdenadas.filter(c => Number(c.price) <= 5);
    //cartasOrdenadas.sort((a, b) => a.price - b.price);
    cartasOrdenadas = cartasOrdenadas.slice(0, 50); // 30 más baratas
  } else if (sortType === 'expensive') {
    cartasOrdenadas.sort((a, b) => b.price - a.price);
    cartasOrdenadas = cartasOrdenadas.slice(0, 100); // 100 más caras
  }

   // Paginación: calcula qué cartas mostrar en la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const cartasPaginadas = cartasOrdenadas.slice(startIndex, endIndex);

  return (
    <Row>
      {cartasPaginadas.map((carta) => (
        <Col md={3} key={carta.id} className="mb-4">
          <ProductCard producto={carta} onAgregarAlCarrito={handleAgregarAlCarrito} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;