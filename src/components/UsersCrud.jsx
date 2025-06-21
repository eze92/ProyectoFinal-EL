import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";

const API_URL = "https://684d83f765ed0871391657f8.mockapi.io/api/v1/usuarios";

const UsersCrud = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [currentItem, setCurrentItem] = useState({
    name: "",
    username: "",
    password: ""
  });

  // Carga inicial
  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Error al obtener usuarios");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      alert("Error cargando datos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
  };

  // Crear usuario
  const handleCreate = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentItem),
      });
      if (!res.ok) throw new Error("Error al crear usuario");
      await fetchItems();
      handleCloseModal();
    } catch (error) {
      alert("Error creando usuario");
      console.error(error);
    }
  };

  // Actualizar usuario
  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}/${currentItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentItem),
      });
      if (!res.ok) throw new Error("Error al actualizar usuario");
      await fetchItems();
      handleCloseModal();
    } catch (error) {
      alert("Error actualizando usuario");
      console.error(error);
    }
  };

  // Eliminar usuario
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Error al eliminar usuario");
        await fetchItems();
      } catch (error) {
        alert("Error eliminando usuario");
        console.error(error);
      }
    }
  };

  //abre formulario modal 
  const openCreateModal = () => {
    setModalMode("create");
    setCurrentItem({ name: "", username: "", password: "" });
    setShowModal(true);
  };

  //edita formulario modal
  const openEditModal = (usuario) => {
    setModalMode("edit");
    setCurrentItem(usuario);
    setShowModal(true);
  };

  //cierra formulario modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <h1>Lista de Usuarios</h1>

      <Button variant="primary" onClick={openCreateModal} className="mb-3">
        Crear nuevo usuario
      </Button>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Username</th>
              <th>Contraseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No hay usuarios
                </td>
              </tr>
            )}
            {items.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.name}</td>
                <td>{usuario.username}</td>
                <td>{usuario.password}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => openEditModal(usuario)}
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(usuario.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalMode === "create" ? "Crear nuevo usuario" : "Editar usuario"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese nombre"
                name="name"
                value={currentItem.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese username"
                name="username"
                value={currentItem.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese contraseña"
                name="password"
                value={currentItem.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={modalMode === "create" ? handleCreate : handleUpdate}
            disabled={
              !currentItem.name ||
              !currentItem.username ||
              !currentItem.password
            }
          >
            {modalMode === "create" ? "Crear" : "Actualizar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UsersCrud;