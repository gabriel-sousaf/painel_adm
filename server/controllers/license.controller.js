import { Licenca, Cliente } from '../models/index.js';
import { v4 as uuidv4 } from 'uuid';

const generateLicenseKey = () => {
  return uuidv4().replace(/-/g, '').toUpperCase();
};

export const getLicenses = async (req, res) => {
  try {
    const licenses = await Licenca.findAll({
      include: [{
        model: Cliente,
        attributes: ['razaoSocial', 'cnpj']
      }]
    });
    res.json(licenses);
  } catch (error) {
    res.status(500).json({ 
      erro: 'Erro ao buscar licenças',
      detalhes: error.message 
    });
  }
};

export const createLicense = async (req, res) => {
  try {
    const { clienteId, tipo, dataInicio } = req.body;
    
    const client = await Cliente.findByPk(clienteId);
    if (!client) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    const chave = generateLicenseKey();
    let dataExpiracao = null;

    if (tipo === 'mensal') {
      dataExpiracao = new Date(dataInicio);
      dataExpiracao.setMonth(dataExpiracao.getMonth() + 1);
    } else if (tipo === 'anual') {
      dataExpiracao = new Date(dataInicio);
      dataExpiracao.setFullYear(dataExpiracao.getFullYear() + 1);
    }

    const license = await Licenca.create({
      chave,
      tipo,
      dataInicio,
      dataExpiracao,
      clienteId,
      status: 'ativa'
    });

    res.status(201).json(license);
  } catch (error) {
    res.status(500).json({ 
      erro: 'Erro ao criar licença',
      detalhes: error.message 
    });
  }
};

export const renewLicense = async (req, res) => {
  try {
    const { id } = req.params;
    const { novaDataExpiracao } = req.body;

    const license = await Licenca.findByPk(id);
    if (!license) {
      return res.status(404).json({ erro: 'Licença não encontrada' });
    }

    await license.update({
      dataExpiracao: novaDataExpiracao,
      status: 'ativa'
    });

    res.json(license);
  } catch (error) {
    res.status(500).json({ 
      erro: 'Erro ao renovar licença',
      detalhes: error.message 
    });
  }
};

export const validateLicense = async (req, res) => {
  try {
    const { chave } = req.params;

    const license = await Licenca.findOne({
      where: { chave },
      include: [{
        model: Cliente,
        attributes: ['razaoSocial', 'status']
      }]
    });

    if (!license) {
      return res.status(404).json({ erro: 'Licença não encontrada' });
    }

    const now = new Date();
    const isValid = license.status === 'ativa' && 
                   (!license.dataExpiracao || new Date(license.dataExpiracao) > now) &&
                   license.Cliente.status === 'ativo';

    res.json({
      valida: isValid,
      licenca: license
    });
  } catch (error) {
    res.status(500).json({ 
      erro: 'Erro ao validar licença',
      detalhes: error.message 
    });
  }
};
