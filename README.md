#### Frontend - Listado de Productos

### Tecnologías Utilizadas

- **HTML**: Estructura de la página.
- **CSS**: Estilo y diseño visual.
- **JavaScript**: Lógica para la interacción con la API y manipulación del DOM.

## Instrucciones de Configuración y Ejecución

1. **Clonar el repositorio del frontend:**
    - Descargar/Clonar repositorio

2. **Instalar Dependencias**
    - npm Install

3. **Configurar la conexión con la API y AUTH0:**

   - Asegúrate de que la variable en el archivo .env
        - REACT_APP_API_URL=
        - REACT_APP_AUTH0_DOMAIN=
        - REACT_APP_AUTH0_CLIENT_ID=

4. **Ejecutar el frontend:**
    - npm start

5. **Abrir en el navegador:**
   - Accede automaticamente `http://localhost:PORT`


## Funcionalidades

- Visualización de un listado de productos.
- Consumo del endpoint `GET /productos` de la API backend.
- Crear productos `POST /producto`
- Editar los producto almacenados
- Eliminar los productos almacenados
- Salir de la AppWeb