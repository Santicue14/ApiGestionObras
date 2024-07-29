const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu configuración

const Estado = sequelize.define('Estado', {
  idestado: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  descripcion: {
    type: DataTypes.STRING(100), // Ajusta el tamaño si es necesario
    allowNull: true // O false si es obligatorio
  }
}, {
  tableName: 'Estado',
  timestamps: false // O true si estás usando campos createdAt y updatedAt
});

module.exports = Estado;
