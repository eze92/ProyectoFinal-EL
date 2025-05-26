import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('auth', 'true');
    Swal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      text: 'Has iniciado sesión correctamente.',
      confirmButtonColor: '#3085d6'
    }).then(() => {
      navigate('/perfil/usuario123');
    });
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
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)' ,
        backgroundColor: '#E6A15E'}}>

        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label><b>Usuario</b></Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><b>Contraseña</b></Form.Label>
              <Form.Control type="password" required />
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