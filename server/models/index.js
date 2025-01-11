import User from './User.js';
import Cliente from './Cliente.js';
import Licenca from './Licenca.js';
import ConexaoWhatsapp from './ConexaoWhatsapp.js';

// Relacionamentos
Cliente.hasMany(Licenca);
Licenca.belongsTo(Cliente);

Cliente.hasMany(ConexaoWhatsapp);
ConexaoWhatsapp.belongsTo(Cliente);

export {
  User,
  Cliente,
  Licenca,
  ConexaoWhatsapp
};
