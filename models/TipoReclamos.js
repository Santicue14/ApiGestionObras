// models/TipoReclamos.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Reclamo = require('./Reclamo'); // Ajusta la ruta si es necesario

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
  timestamps: false
});

// Configura la relación con Reclamo
TipoReclamos.hasMany(Reclamo, { foreignKey: 'idTipoReclamo', as: 'reclamos' });
Reclamo.belongsTo(TipoReclamos, { foreignKey: 'idTipoReclamo', as: 'tipoReclamo' });

module.exports = TipoReclamos;
