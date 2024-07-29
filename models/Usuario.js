const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu configuración

const Usuario = sequelize.define('Usuario', {
  idUsuarios: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: true // O false si es obligatorio
  },
  email: {
    type: DataTypes.STRING(45),
    allowNull: true // O false si es obligatorio
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: true // O false si es obligatorio
  },
  rol: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
}, {
  tableName: 'usuarios',
  timestamps: false // O true si estás usando campos createdAt y updatedAt
});

module.exports = Usuario;
