import React, { useState } from 'react';

const IntegrationSettings = () => {
  const [integrations, setIntegrations] = useState({
    apiKey: '',
    webhookUrl: '',
    enableWebhooks: false,
    notifyEvents: {
      newLicense: true,
      licenseExpiration: true,
      newCustomer: true
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('notifyEvents.')) {
      const eventName = name.split('.')[1];
      setIntegrations(prev => ({
        ...prev,
        notifyEvents: {
          ...prev.notifyEvents,
          [eventName]: checked
        }
      }));
    } else {
      setIntegrations(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar salvamento das configurações de integração
    console.log('Configurações de integração salvas:', integrations);
  };

  const generateNewApiKey = () => {
    // TODO: Implementar geração de nova API key
    const newApiKey = Math.random().toString(36).substring(2) + 
                     Math.random().toString(36).substring(2);
    setIntegrations(prev => ({
      ...prev,
      apiKey: newApiKey
    }));
  };

  return (
    <div className="settings-section">
      <h2>Integrações</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="apiKey">Chave da API</label>
          <div className="api-key-container">
            <input
              type="text"
              id="apiKey"
              name="apiKey"
              value={integrations.apiKey}
              readOnly
            />
            <button
              type="button"
              className="btn-secondary"
              onClick={generateNewApiKey}
            >
              Gerar Nova Chave
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="enableWebhooks"
              checked={integrations.enableWebhooks}
              onChange={handleChange}
            />
            Habilitar Webhooks
          </label>
        </div>

        {integrations.enableWebhooks && (
          <>
            <div className="form-group">
              <label htmlFor="webhookUrl">URL do Webhook</label>
              <input
                type="url"
                id="webhookUrl"
                name="webhookUrl"
                value={integrations.webhookUrl}
                onChange={handleChange}
                placeholder="https://"
              />
            </div>

            <div className="form-group">
              <label>Eventos para Notificação</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="notifyEvents.newLicense"
                    checked={integrations.notifyEvents.newLicense}
                    onChange={handleChange}
                  />
                  Nova Licença
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="notifyEvents.licenseExpiration"
                    checked={integrations.notifyEvents.licenseExpiration}
                    onChange={handleChange}
                  />
                  Expiração de Licença
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="notifyEvents.newCustomer"
                    checked={integrations.notifyEvents.newCustomer}
                    onChange={handleChange}
                  />
                  Novo Cliente
                </label>
              </div>
            </div>
          </>
        )}

        <button type="submit" className="btn-primary">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default IntegrationSettings;
