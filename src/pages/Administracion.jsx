import { Container } from 'react-bootstrap';
import UsersCrud from "../components/UsersCrud";

export default function Administracion() {
  return (
    <Container className="mt-4">
      <h2>Panel de Administración</h2>
      <p>Acceso exclusivo para usuarios autenticados.</p>
      <UsersCrud />
    </Container>
  );
}
