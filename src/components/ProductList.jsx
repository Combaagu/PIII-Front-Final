import React, { useEffect, useState } from 'react';
import { List, Typography, Button, Space, Pagination, Modal, Input, message } from 'antd';
import { EditOutlined, DeleteOutlined, LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { obtenerProductos, eliminarProducto, actualizarProducto } from '../api';  
import { useAuth0 } from '@auth0/auth0-react'; 
import { useNavigate } from 'react-router-dom';
import '../styles/ProductList.css'; 

const { Title, Text } = Typography;

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [totalProductos, setTotalProductos] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductData, setNewProductData] = useState({});
  
  const { logout } = useAuth0();
  const navigate = useNavigate();  

  const pageSize = 4;

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await obtenerProductos(paginaActual, pageSize);
        setProductos(data.productos);
        setTotalProductos(data.totalProductos);
        setTotalPaginas(Math.ceil(data.totalProductos / pageSize));
      } catch (error) {
        message.error('Error al cargar productos');
      }
    };

    fetchProductos();
  }, [paginaActual, pageSize]);

  const handleEdit = (producto) => {
    setEditingProduct(producto);
    setNewProductData({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        categoria: producto.categoria,
    });
    setIsEditing(true);
  };

  const handleDelete = async (productoId) => {
    Modal.confirm({
      title: '¿Estás seguro?',
      content: '¡Este producto será eliminado permanentemente!',
      onOk: async () => {
        try {
          await eliminarProducto(productoId);
          message.success('Producto eliminado con éxito');
          setProductos(productos.filter((producto) => producto._id !== productoId));
        } catch (error) {
          message.error('Hubo un error al eliminar el producto');
        }
      },
    });
  };

  const handleSaveEdit = async () => {
    try {
      const updatedProduct = await actualizarProducto(editingProduct._id, newProductData);
      setProductos(productos.map(producto => 
        producto._id === updatedProduct._id ? updatedProduct : producto
      ));
      setIsEditing(false);
      message.success('Producto actualizado con éxito');
    } catch (error) {
      message.error('Error al actualizar el producto');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <div>
          <Title level={2}>Listado de Productos</Title>
          <Text type="secondary">Administra y edita tus productos fácilmente</Text>
        </div>
        
        <Space>
          <Button
            onClick={() => navigate('/productos/crear')} 
            className="add-product-btn"  
            icon={<PlusOutlined />}
          >
            Agregar
          </Button>

          <Button
            onClick={() => logout({ returnTo: window.location.origin })}
            icon={<LogoutOutlined />}
            className='ant-btn-logout'
          >
            Salir
          </Button>
        </Space>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={productos}
        renderItem={(producto) => (
          <List.Item>
            <List.Item.Meta
              title={<Typography.Title level={4}>{producto.nombre}</Typography.Title>}
              description={
                <>
                  <Text type="secondary">Categoría: {producto.categoria}</Text><br />
                  <Text type="success" strong>Precio: ${producto.precio}</Text>
                </>
              }
            />
            <Space>
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEdit(producto)}
                className="edit-btn"
              >
                Editar
              </Button>

              <Button
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(producto._id)}
                className="delete-btn"
              >
                Eliminar
              </Button>
            </Space>
          </List.Item>
        )}
      />

      <Pagination
        current={paginaActual}
        total={totalProductos}
        pageSize={pageSize}
        onChange={(page) => setPaginaActual(page)}
        className="pagination"
      />

      <Modal
        title="Editar Producto"
        open={isEditing}
        onOk={handleSaveEdit}
        onCancel={handleCancelEdit}
        className="modal-edit"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            placeholder="Nombre"
            value={newProductData.nombre}
            onChange={(e) => setNewProductData({ ...newProductData, nombre: e.target.value })}
          />
          <Input
            placeholder="Descripción"
            value={newProductData.descripcion}
            onChange={(e) => setNewProductData({ ...newProductData, descripcion: e.target.value })}
          />
          <Input
            placeholder="Precio"
            type="number"
            value={newProductData.precio}
            onChange={(e) => setNewProductData({ ...newProductData, precio: e.target.value })}
          />
          <Input
            placeholder="Categoría"
            value={newProductData.categoria}
            onChange={(e) => setNewProductData({ ...newProductData, categoria: e.target.value })}
          />
        </Space>
      </Modal>
    </div>
  );
};

export default ProductList;
