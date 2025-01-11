import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Licenca = sequelize.define('Licenca', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  chave: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('mensal', 'anual', 'vitalicia'),
    allowNull: false
  },
  dataInicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dataExpiracao: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.ENUM('ativa', 'expirada', 'cancelada'),
    defaultValue: 'ativa'
  },
  clienteId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Clientes',
      key: 'id'
    }
  }
});

export default Licenca;
