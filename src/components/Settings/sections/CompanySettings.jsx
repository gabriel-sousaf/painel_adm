import React, { useState } from 'react';

const CompanySettings = () => {
  const [company, setCompany] = useState({
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    address: '',
    logo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompany(prev => ({
        ...prev,
        logo: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar salvamento dos dados da empresa
    console.log('Dados da empresa salvos:', company);
  };

  return (
    <div className="settings-section">
      <h2>Dados da Empresa</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyLogo">Logo da Empresa</label>
          <input
            type="file"
            id="companyLogo"
            accept="image/*"
            onChange={handleLogoChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Nome da Empresa</label>
          <input
            type="text"
            id="name"
            name="name"
            value={company.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cnpj">CNPJ</label>
          <input
            type="text"
            id="cnpj"
            name="cnpj"
            value={company.cnpj}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={company.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Telefone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={company.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Endereço</label>
          <textarea
            id="address"
            name="address"
            value={company.address}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <button type="submit" className="btn-primary">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default CompanySettings;
