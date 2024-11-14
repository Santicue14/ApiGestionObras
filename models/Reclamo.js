// models/Reclamo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const TipoReclamos = require('./TipoReclamos'); // Verifica que la ruta sea correcta

const Reclamo = sequelize.define('Reclamo', {
  idreclamo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  dni: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  celular: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  domicilio: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  entre_calles: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  idTipoReclamo: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  id_estado: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
},
 {
  tableName: 'Reclamo',
  timestamps: false
});

Reclamo.associate = (models) => {
  Reclamo.belongsTo(models.TipoReclamos, { foreignKey: 'idTipoReclamo', as: 'tipoReclamo' });
};
module.exports = Reclamo;
