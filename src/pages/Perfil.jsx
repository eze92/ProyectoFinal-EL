import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Table } from 'react-bootstrap';

export default function Perfil() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    if (user === 'admin') {
      navigate('/admin');
    } else {
      //cargar historial de compras del localStorage para el usuario actual
      const data = JSON.parse(localStorage.getItem(`historial_${user}`)) || [];
      setHistorial(data);
    }
  }, [user, navigate]);

  if (user === 'admin') return null;

  return (
    <Container className="mt-4">
      <h2>Perfil de {user}</h2>
      <h4>Historial de compras</h4>
      {/* mostrar historial de compras si existe */}
      {historial.length === 0 ? (
        <p>No hay compras registradas.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((compra, idx) => (
              <tr key={idx}>
                <td>{compra.fecha}</td>
                <td>
                  <ul>
                    {compra.productos.map((p, i) => (
                      <li key={i}>{p.title} x{p.cantidad}</li>
                    ))}
                  </ul>
                </td>
                <td>${compra.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}