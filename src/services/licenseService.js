import api from './api';

export const licenseService = {
  getAll: async () => {
    const response = await api.get('/licenses');
    return response.data;
  },

  create: async (licenseData) => {
    const response = await api.post('/licenses', licenseData);
    return response.data;
  },

  renew: async (id, renewalData) => {
    const response = await api.put(`/licenses/${id}/renew`, renewalData);
    return response.data;
  },

  validate: async (licenseKey) => {
    const response = await api.get(`/licenses/validate/${licenseKey}`);
    return response.data;
  }
};
