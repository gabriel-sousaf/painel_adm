import React, { useState } from 'react';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    licenseExpiration: true,
    newCustomers: true,
    systemUpdates: true,
    emailFrequency: 'daily'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar salvamento das configurações de notificação
    console.log('Configurações de notificação salvas:', notifications);
  };

  return (
    <div className="settings-section">
      <h2>Configurações de Notificações</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={notifications.emailNotifications}
              onChange={handleChange}
            />
            Receber notificações por e-mail
          </label>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="licenseExpiration"
              checked={notifications.licenseExpiration}
              onChange={handleChange}
            />
            Alertas de expiração de licença
          </label>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="newCustomers"
              checked={notifications.newCustomers}
              onChange={handleChange}
            />
            Novos clientes cadastrados
          </label>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="systemUpdates"
              checked={notifications.systemUpdates}
              onChange={handleChange}
            />
            Atualizações do sistema
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="emailFrequency">Frequência de e-mails</label>
          <select
            id="emailFrequency"
            name="emailFrequency"
            value={notifications.emailFrequency}
            onChange={handleChange}
          >
            <option value="immediately">Imediatamente</option>
            <option value="daily">Diariamente</option>
            <option value="weekly">Semanalmente</option>
            <option value="monthly">Mensalmente</option>
          </select>
        </div>

        <button type="submit" className="btn-primary">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default NotificationSettings;
