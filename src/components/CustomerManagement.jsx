import React, { useState, useEffect } from 'react';
import { clientService } from '../services/clientService';

function CustomerManagement() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    razaoSocial: '',
    cnpj: '',
    email: '',
    telefone: '',
    endereco: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.getAll();
      setClients(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar clientes: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await clientService.update(editingId, formData);
      } else {
        await clientService.create(formData);
      }
      
      loadClients();
      resetForm();
    } catch (err) {
      setError('Erro ao salvar cliente: ' + err.message);
    }
  };

  const handleEdit = (client) => {
    setFormData({
      razaoSocial: client.razaoSocial,
      cnpj: client.cnpj,
      email: client.email,
      telefone: client.telefone,
      endereco: client.endereco
    });
    setIsEditing(true);
    setEditingId(client.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este cliente?')) {
      try {
        await clientService.delete(id);
        loadClients();
      } catch (err) {
        setError('Erro ao excluir cliente: ' + err.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      razaoSocial: '',
      cnpj: '',
      email: '',
      telefone: '',
      endereco: ''
    });
    setIsEditing(false);
    setEditingId(null);
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="customer-management">
      <h1>Cadastro de Clientes</h1>
      
      <form onSubmit={handleSubmit} className="client-form">
        <div className="form-group">
          <label>Razão Social:</label>
          <input
            type="text"
            value={formData.razaoSocial}
            onChange={(e) => setFormData({...formData, razaoSocial: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>CNPJ:</label>
          <input
            type="text"
            value={formData.cnpj}
            onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
            required
            disabled={isEditing}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Telefone:</label>
          <input
            type="tel"
            value={formData.telefone}
            onChange={(e) => setFormData({...formData, telefone: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Endereço:</label>
          <textarea
            value={formData.endereco}
            onChange={(e) => setFormData({...formData, endereco: e.target.value})}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {isEditing ? 'Atualizar' : 'Cadastrar'}
          </button>
          {isEditing && (
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="clients-list">
        <h2>Clientes Cadastrados</h2>
        <table>
          <thead>
            <tr>
              <th>Razão Social</th>
              <th>CNPJ</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td>{client.razaoSocial}</td>
                <td>{client.cnpj}</td>
                <td>{client.email}</td>
                <td>{client.telefone}</td>
                <td>
                  <button 
                    className="btn-secondary"
                    onClick={() => handleEdit(client)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={() => handleDelete(client.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerManagement;
