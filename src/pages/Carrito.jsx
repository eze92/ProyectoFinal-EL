import React from 'react';
import { CartContext } from './CartContext';

function Carrito() {
  
  return (
    <div className="container" style={{ minHeight: '60vh', padding: '2rem' }}>
      {productos.length === 0 ? (
        <div className="text-center mt-5">
          <h4>No hay productos agregados al carrito.</h4>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Carrito vacío"
            style={{ width: 120, opacity: 0.5, marginTop: 20 }}
          />
        </div>
      ) : (
        // Aquí iría el listado de productos si hay alguno
        <div>Productos en el carrito...</div>
      )}
    </div>
  );
}

export default Carrito