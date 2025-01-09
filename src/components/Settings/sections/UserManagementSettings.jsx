import React, { useState } from 'react';

const UserManagementSettings = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin', email: 'admin@exemplo.com', role: 'admin', status: 'active' }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active'
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    setUsers(prev => [...prev, { ...newUser, id: Date.now() }]);
    setNewUser({ name: '', email: '', role: 'user', status: 'active' });
  };

  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  return (
    <div className="settings-section">
      <h2>Gerenciamento de Usuários</h2>
      
      {/* Formulário de Novo Usuário */}
      <form onSubmit={handleAddUser} className="user-form">
        <div className="form-group">
          <label htmlFor="userName">Nome do Usuário</label>
          <input
            type="text"
            id="userName"
            value={newUser.name}
            onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="userEmail">E-mail</label>
          <input
            type="email"
            id="userEmail"
            value={newUser.email}
            onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="userRole">Função</label>
          <select
            id="userRole"
            value={newUser.role}
            onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
          >
            <option value="admin">Administrador</option>
            <option value="manager">Gerente</option>
            <option value="user">Usuário</option>
          </select>
        </div>

        <button type="submit" className="btn-primary">
          Adicionar Usuário
        </button>
      </form>

      {/* Lista de Usuários */}
      <div className="users-list">
        <h3>Usuários Cadastrados</h3>
        <div className="users-table">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Função</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role === 'admin' ? 'Administrador' : 
                      user.role === 'manager' ? 'Gerente' : 'Usuário'}</td>
                  <td>
                    <span className={`status-badge ${user.status}`}>
                      {user.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-danger"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementSettings;
