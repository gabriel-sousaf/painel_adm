import React, { useState } from 'react';

const AppearanceSettings = () => {
  const [appearance, setAppearance] = useState({
    theme: 'light',
    primaryColor: '#2563eb',
    fontSize: 'medium',
    sidebarPosition: 'left',
    compactMode: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAppearance(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar salvamento das configurações de aparência
    console.log('Configurações de aparência salvas:', appearance);
  };

  return (
    <div className="settings-section">
      <h2>Aparência</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="theme">Tema</label>
          <select
            id="theme"
            name="theme"
            value={appearance.theme}
            onChange={handleChange}
          >
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
            <option value="system">Sistema</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="primaryColor">Cor Principal</label>
          <input
            type="color"
            id="primaryColor"
            name="primaryColor"
            value={appearance.primaryColor}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="fontSize">Tamanho da Fonte</label>
          <select
            id="fontSize"
            name="fontSize"
            value={appearance.fontSize}
            onChange={handleChange}
          >
            <option value="small">Pequeno</option>
            <option value="medium">Médio</option>
            <option value="large">Grande</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sidebarPosition">Posição da Barra Lateral</label>
          <select
            id="sidebarPosition"
            name="sidebarPosition"
            value={appearance.sidebarPosition}
            onChange={handleChange}
          >
            <option value="left">Esquerda</option>
            <option value="right">Direita</option>
          </select>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="compactMode"
              checked={appearance.compactMode}
              onChange={handleChange}
            />
            Modo Compacto
          </label>
        </div>

        <button type="submit" className="btn-primary">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default AppearanceSettings;
