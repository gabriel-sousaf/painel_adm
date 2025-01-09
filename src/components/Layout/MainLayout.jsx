import React from 'react';
import Sidebar from './Sidebar';
import './MainLayout.css';

function MainLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <header className="content-header">
          <div className="header-search">
            <input 
              type="search" 
              placeholder="Buscar..."
              className="search-input"
            />
          </div>
          <div className="header-actions">
            <button className="notification-btn">🔔</button>
            <button className="help-btn">?</button>
          </div>
        </header>
        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
