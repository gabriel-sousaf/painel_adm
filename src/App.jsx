import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout'
import Dashboard from './components/Dashboard'
import LicenseManagement from './components/LicenseManagement'
import CustomerManagement from './components/CustomerManagement'
import SettingsLayout from './components/Settings/SettingsLayout'
import WhatsappConnections from './components/WhatsappConnections/WhatsappConnections'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/licenses" element={<LicenseManagement />} />
          <Route path="/customers" element={<CustomerManagement />} />
          <Route path="/whatsapp" element={<WhatsappConnections />} />
          <Route path="/settings" element={<SettingsLayout />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App
