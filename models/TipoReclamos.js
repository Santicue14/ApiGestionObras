// models/TipoReclamos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu configuración

const TipoReclamos = sequelize.define('TipoReclamos', {
  idTipoReclamos: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  Fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'TipoReclamos',
  timestamps: false,
});

module.exports = TipoReclamos;
