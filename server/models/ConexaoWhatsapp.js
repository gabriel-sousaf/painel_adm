import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const ConexaoWhatsapp = sequelize.define('ConexaoWhatsapp', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^\+\d{1,3}\d{2}\d{8,9}$/
    }
  },
  status: {
    type: DataTypes.ENUM('ativo', 'inativo'),
    defaultValue: 'ativo'
  },
  clienteId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Clientes',
      key: 'id'
    }
  }
});

export default ConexaoWhatsapp;
