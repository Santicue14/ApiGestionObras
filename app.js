require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const sequelize = require('./config/database');
const UsuariosRoutes = require('./routes/UserRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const TipoReclamoRoutes = require('./routes/TipoReclamoRoutes')
const ReclamoRoutes = require('./routes/ReclamoRoutes')
const authenticateToken = require('./middlewares/authenticateToken');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // Especifica el origen permitido
    credentials: true // Permitir el envío de cookies y encabezados de autenticación
  }));

app.use('/api/auth',AuthRoutes)
app.use('/api/usuarios',authenticateToken,UsuariosRoutes)
app.use('/api/reclamos',authenticateToken,ReclamoRoutes)
app.use('/api/tiporeclamos',authenticateToken,TipoReclamoRoutes)

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch(err => {
    console.error('Error al sincronizar modelos:', err);
  });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
