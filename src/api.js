
import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL;

export const obtenerProductos = async (page = 1, perPage = 4) => {
  try {
    const response = await axios.get(`${API_URL}/productos`, {
      headers: { page, perPage },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos', error);
    throw error;
  }
};

export const eliminarProducto = async (productoId) => {
  try {
    const response = await axios.delete(`${API_URL}/producto/${productoId}`);
    return response.data; 
  } catch (error) {
    console.error('Error al eliminar producto', error);
    throw error;
  }
};


export const actualizarProducto = async (productoId, datosProducto) => {
  try {
    const response = await axios.put(`${API_URL}/producto/${productoId}`, datosProducto);
    return response.data; 
  } catch (error) {
    console.error('Error al actualizar producto', error);
    throw error;
  }
};

export const agregarProducto = async (datosProducto) => {
  try {
    const response = await axios.post(`${API_URL}/producto`, datosProducto);
    return response.data; 
  } catch (error) {
    console.error('Error al agregar producto', error);
    throw error;
  }
};
