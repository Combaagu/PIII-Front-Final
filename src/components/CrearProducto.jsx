import React, { useState } from 'react';
import { Input, Button, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { agregarProducto } from '../api.js';  
import '../styles/CrearProducto.css'; 

const AddProduct = () => {
  const [newProductData, setNewProductData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProductData({
      ...newProductData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      await agregarProducto(newProductData);
      message.success('Producto creado con éxito');
      navigate('/productos');  
    } catch (error) {
      message.error('Error al crear el producto');
    }
  };

  const handleRedirect = () => {
    navigate('/productos'); 
  };

  return (
    <div className="add-product-container">
      <h2>Agregar Nuevo Producto</h2>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input
          name="nombre"
          placeholder="Nombre del Producto"
          value={newProductData.nombre}
          onChange={handleChange}
          className="product-input"
        />
        <Input
          name="descripcion"
          placeholder="Descripción del Producto"
          value={newProductData.descripcion}
          onChange={handleChange}
          className="product-input"
        />
        <Input
          name="precio"
          type="number"
          placeholder="Precio del Producto"
          value={newProductData.precio}
          onChange={handleChange}
          className="product-input"
        />
        <Input
          name="categoria"
          placeholder="Categoría del Producto"
          value={newProductData.categoria}
          onChange={handleChange}
          className="product-input"
        />
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Button type="primary" onClick={handleSubmit} className="submit-btn">
            Agregar Producto
          </Button>
          <Button onClick={handleRedirect} className="redirect-btn">
            Ver Productos
          </Button>
        </Space>
      </Space>
    </div>
  );
};

export default AddProduct;
