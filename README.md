# Pet App Backend

API REST para la aplicación Pet App, un sistema de registro y gestión de mascotas con sistema de autenticación y roles.

[![Abrir en Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/38671791/2sAY55bdbd)

## 🚀 Características

- Autenticación y autorización de usuarios con JWT
- Sistema de roles (Admin/Usuario)
- Registro y gestión de mascotas
- Sistema de mascotas perdidas
- API RESTful

## 🛠️ Tecnologías Utilizadas

- Node.js
- Express.js
- MySQL
- JWT para autenticación
- bcrypt para encriptación

## 📋 Prerrequisitos

- Node.js v14 o superior
- MySQL v8.0 o superior
## 🔧 Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/Smith-Develop/backend_pet_app.git
backend_pet_app
```

2. Instalar dependencias
```bash
npm install
```

3. Configurar variables de entorno
Crear un archivo `.env` en la raíz del proyecto:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=pet_app
JWT_SECRET=tu_secret_key_super_segura
PORT=5000
```

4. Configurar la base de datos
```sql
CREATE DATABASE pet_app;
USE pet_app;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE pets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  species VARCHAR(255) NOT NULL,
  breed VARCHAR(255) NOT NULL,
  description TEXT,
  photo VARCHAR(255),
  lost BOOLEAN DEFAULT false,
  UserId INT,
  FOREIGN KEY (UserId) REFERENCES users(id)
);
```

5. Iniciar el servidor
```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

## 📚 Estructura del Proyecto

```
/pet-app
  /src
    /config
      db.js              # Configuración de la base de datos
    /controllers
      userController.js  # Controlador de usuarios
      petController.js   # Controlador de mascotas
    /middlewares
      auth.js           # Middleware de autenticación
    /routes
      userRoutes.js     # Rutas de usuarios
      petRoutes.js      # Rutas de mascotas
    server.js           # Punto de entrada de la aplicación
  .env                  # Variables de entorno
  package.json
```

## 🔑 Endpoints API

### Auth Routes
- `POST /api/users/register` - Registrar nuevo usuario
```json
{
    "name": "Test User",
    "email": "test@test.com",
    "password": "password123"
}
```

- `POST /api/users/login` - Iniciar sesión
```json
{
    "email": "test@test.com",
    "password": "password123"
}
```

### Protected User Routes
- `GET /api/users/profile` - Obtener perfil de usuario
- `PUT /api/users/profile` - Actualizar perfil
```json
{
    "name": "Updated Name",
    "email": "updated@test.com"
}
```

### Admin Routes
- `GET /api/users` - Obtener todos los usuarios
- `DELETE /api/users/:id` - Eliminar usuario

### Pet Routes
- `POST /api/pets` - Crear nueva mascota
```json
{
    "name": "Firulais",
    "species": "Dog",
    "breed": "Mixed",
    "description": "Friendly dog with brown spots"
}
```

- `GET /api/pets` - Obtener mascotas del usuario
- `PUT /api/pets/:id` - Actualizar mascota
```json
{
    "name": "Updated Name",
    "species": "Dog",
    "breed": "Mixed",
    "description": "Updated description",
    "lost": true
}
```
- `DELETE /api/pets/:id` - Eliminar mascota

## 📦 Scripts Disponibles

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

## 📝 Notas de Desarrollo

- Asegúrate de tener MySQL corriendo antes de iniciar el servidor
- Para pruebas locales, puedes usar Postman o curl
- Los tokens JWT expiran en 24 horas
- Las contraseñas se hashean usando bcrypt antes de almacenarse

## ⚠️ Errores Comunes

1. Error de conexión a la base de datos
   - Verifica que MySQL esté corriendo
   - Comprueba las credenciales en el archivo .env

2. Error en la creación de tokens
   - Asegúrate de tener configurado JWT_SECRET en el .env

## 📚 Referencias y Documentación

- [Express.js Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT.io](https://jwt.io/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)


## ✒️ Autor

* **Smith Grisales** - *Desarrollador web Full-Stack* - [Smith-Develop](https://github.com/Smith-Develop)

---
⌨️ con ❤️ por [Smith Grisales](https://github.com/Smith-Develop) 😊
