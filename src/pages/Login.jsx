import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useAuth } from "../components/AuthContext";
import { useState } from "react";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    // Si login retorna true, autenticación exitosa
    if (await login(user, pass)) {
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Has iniciado sesión correctamente.',
        confirmButtonColor: '#3085d6'
      }).then(() => {
      // Redirige al perfil del usuario autenticado
        navigate(`/perfil/${user}`);
      });
    } else {
      setError("Usuario o contraseña inválidos");
    }
  };

  return (
    <div
      className="container"
      style={{
        background: '#f5f7fa',
        borderRadius: '12px',
        padding: '2rem',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Card 
        style={{ 
          width: 350, 
          padding: '2rem', 
          borderRadius: 16, 
          boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
          backgroundColor: '#E6A15E'
        }}>
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label><b>Usuario</b></Form.Label>
              <Form.Control 
                type="text" 
                required 
                value={user}
                onChange={e => setUser(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><b>Contraseña</b></Form.Label>
              <Form.Control 
                type="password" 
                required 
                value={pass}
                onChange={e => setPass(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Entrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}