import React, { useState } from 'react';
import './WhatsappConnections.css';

const WhatsappConnections = () => {
  const [connections, setConnections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConnection, setEditingConnection] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterClient, setFilterClient] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    clientName: '',
    whatsappNumber: '',
    status: 'active'
  });

  // Validação do número do WhatsApp
  const validateWhatsAppNumber = (number) => {
    const regex = /^\+\d{1,3}\d{2}\d{8,9}$/;
    return regex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateWhatsAppNumber(formData.whatsappNumber)) {
      alert('Formato inválido do número WhatsApp. Use: +DDI DDD NÚMERO');
      return;
    }

    if (editingConnection) {
      // Modo Edição
      setConnections(connections.map(conn => 
        conn.id === editingConnection.id 
          ? { 
              ...conn, 
              ...formData, 
              lastUpdated: new Date().toISOString() 
            }
          : conn
      ));
    } else {
      // Nova Conexão
      setConnections([
        ...connections,
        {
          id: Date.now(),
          ...formData,
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        }
      ]);
    }

    setIsModalOpen(false);
    setEditingConnection(null);
    setFormData({
      name: '',
      clientName: '',
      whatsappNumber: '',
      status: 'active'
    });
  };

  const handleEdit = (connection) => {
    setEditingConnection(connection);
    setFormData({
      name: connection.name,
      clientName: connection.clientName,
      whatsappNumber: connection.whatsappNumber,
      status: connection.status
    });
    setIsModalOpen(true);
  };

  const toggleStatus = (connectionId) => {
    setConnections(connections.map(conn =>
      conn.id === connectionId
        ? { 
            ...conn, 
            status: conn.status === 'active' ? 'inactive' : 'active',
            lastUpdated: new Date().toISOString()
          }
        : conn
    ));
  };

  const filteredConnections = connections.filter(conn => {
    const statusMatch = filterStatus === 'all' || conn.status === filterStatus;
    const clientMatch = filterClient === '' || 
      conn.clientName.toLowerCase().includes(filterClient.toLowerCase());
    return statusMatch && clientMatch;
  });

  return (
    <div className="whatsapp-connections">
      <div className="connections-header">
        <h1>Conexões WhatsApp</h1>
        <button 
          className="btn-primary" 
          onClick={() => setIsModalOpen(true)}
        >
          Nova Conexão
        </button>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label>Status:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Cliente:</label>
          <input
            type="text"
            value={filterClient}
            onChange={(e) => setFilterClient(e.target.value)}
            placeholder="Filtrar por cliente..."
          />
        </div>
      </div>

      <div className="connections-table">
        <table>
          <thead>
            <tr>
              <th>Nome da Conexão</th>
              <th>Cliente</th>
              <th>Número WhatsApp</th>
              <th>Status</th>
              <th>Última Atualização</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredConnections.map(connection => (
              <tr key={connection.id}>
                <td>{connection.name}</td>
                <td>{connection.clientName}</td>
                <td>{connection.whatsappNumber}</td>
                <td>
                  <span className={`status-badge ${connection.status}`}>
                    {connection.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td>
                  {new Date(connection.lastUpdated).toLocaleString()}
                </td>
                <td className="actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleEdit(connection)}
                  >
                    Editar
                  </button>
                  <button 
                    className={`btn-${connection.status === 'active' ? 'danger' : 'success'}`}
                    onClick={() => toggleStatus(connection.id)}
                  >
                    {connection.status === 'active' ? 'Inativar' : 'Ativar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingConnection ? 'Editar Conexão' : 'Nova Conexão'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome da Conexão:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Cliente:</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Número WhatsApp (DDI+DDD+Número):</label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})}
                  placeholder="+5511999999999"
                  required
                />
              </div>

              <div className="form-group">
                <label>Status:</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-primary">
                  {editingConnection ? 'Salvar' : 'Criar'}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingConnection(null);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsappConnections;
