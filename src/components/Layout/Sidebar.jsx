import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/licenses', icon: '🔑', label: 'Licenças' },
    { path: '/customers', icon: '👥', label: 'Clientes' },
    { path: '/settings', icon: '⚙️', label: 'Configurações' }
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <h2>{isExpanded ? 'SaaS Manager' : 'SM'}</h2>
        {isExpanded && <p className="company-name">Sua Empresa</p>}
        <button className="toggle-button" onClick={toggleSidebar}>
          {isExpanded ? '◀' : '▶'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            title={!isExpanded ? item.label : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            {isExpanded && <span className="nav-label">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          {isExpanded && (
            <div className="user-details">
              <p className="user-name">Admin</p>
              <button className="logout-button">Sair</button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
