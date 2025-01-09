import React, { useState } from 'react';
import './styles/settings.css';
import GeneralSettings from './sections/GeneralSettings';
import CompanySettings from './sections/CompanySettings';
import NotificationSettings from './sections/NotificationSettings';
import AppearanceSettings from './sections/AppearanceSettings';
import IntegrationSettings from './sections/IntegrationSettings';
import UserManagementSettings from './sections/UserManagementSettings';

const SettingsLayout = () => {
  const [activeTab, setActiveTab] = useState('geral');

  const tabs = [
    { id: 'geral', label: 'Configurações Gerais', component: GeneralSettings },
    { id: 'empresa', label: 'Dados da Empresa', component: CompanySettings },
    { id: 'usuarios', label: 'Usuários', component: UserManagementSettings },
    { id: 'notificacoes', label: 'Notificações', component: NotificationSettings },
    { id: 'aparencia', label: 'Aparência', component: AppearanceSettings },
    { id: 'integracao', label: 'Integrações', component: IntegrationSettings }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || GeneralSettings;

  return (
    <div className="settings-container">
      <h1>Configurações</h1>
      
      <div className="settings-layout">
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="settings-content">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
