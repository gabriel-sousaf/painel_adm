import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Cliente = sequelize.define('Cliente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  razaoSocial: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cnpj: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      is: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/
    }
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    }
  },
  telefone: {
    type: DataTypes.STRING
  },
  endereco: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('ativo', 'inativo'),
    defaultValue: 'ativo'
  }
});

export default Cliente;
