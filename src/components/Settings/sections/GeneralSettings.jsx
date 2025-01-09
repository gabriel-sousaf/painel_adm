import React, { useState } from 'react';

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    appName: 'SaaS Manager',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    dateFormat: 'DD/MM/YYYY'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar salvamento das configurações
    console.log('Configurações salvas:', settings);
  };

  return (
    <div className="settings-section">
      <h2>Configurações Gerais</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="appName">Nome do Aplicativo</label>
          <input
            type="text"
            id="appName"
            name="appName"
            value={settings.appName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="language">Idioma</label>
          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleChange}
          >
            <option value="pt-BR">Português (Brasil)</option>
            <option value="en-US">English (US)</option>
            <option value="es">Español</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="timezone">Fuso Horário</label>
          <select
            id="timezone"
            name="timezone"
            value={settings.timezone}
            onChange={handleChange}
          >
            <option value="America/Sao_Paulo">Brasília (GMT-3)</option>
            <option value="America/New_York">New York (GMT-4)</option>
            <option value="UTC">UTC</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dateFormat">Formato de Data</label>
          <select
            id="dateFormat"
            name="dateFormat"
            value={settings.dateFormat}
            onChange={handleChange}
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>

        <button type="submit" className="btn-primary">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default GeneralSettings;
