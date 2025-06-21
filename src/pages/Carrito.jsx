import React, { useContext } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { CartContext } from '../components/CardContex';
// importar useAuth para obtener el usuario actual
import { useAuth } from '../components/AuthContext';

const Carrito = () => {
  const { carrito, setCarrito } = useContext(CartContext);
  // obtener usuario actual
  const { user } = useAuth();

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(producto => producto.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);

  if (carrito.length === 0) {
    return (
      <Container className="mt-4 text-center" style={{ minHeight: '70vh' }}>
        <h4>No hay productos agregados al carrito.</h4>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Carrito vacío"
          style={{ width: 120, opacity: 0.5, marginTop: 20 }}
        />
      </Container>
    );
  }

  //confirmacion
  const handleConfirmar = () => {
    Swal.fire({
      title: '¿Confirmar compra?',
      text: '¿Deseas confirmar los productos del carrito?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
      width: '90%' // Hace que el toast sea más angosto en móvil
    }).then((result) => {
      if (result.isConfirmed) {
        // guardar historial de compras en localStorage por usuario
        const historial = JSON.parse(localStorage.getItem(`historial_${user}`)) || [];
        const nuevaCompra = {
          fecha: new Date().toLocaleString(),
          productos: carrito,
          total
        };
        historial.push(nuevaCompra);
        localStorage.setItem(`historial_${user}`, JSON.stringify(historial));
        // Fin de historial

        vaciarCarrito();
        Swal.fire('¡Compra confirmada!', 'Gracias por tu compra.', 'success');
      }
    });
  };

  return (
    <Container className="mt-4">
      <h3>Carrito de compras</h3>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio unitario</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.cantidad}</td>
              <td>${(item.price * item.cantidad).toFixed(2)}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h5 className="text-end">Total a pagar: ${total.toFixed(2)}</h5>
      <div className="text-end mt-3">
        <Button variant="success" onClick={handleConfirmar}>
          Confirmar productos
        </Button>
      </div>
    </Container>
  );
};

export default Carrito;