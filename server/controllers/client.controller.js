import { Cliente } from '../models/index.js';

export const getClients = async (req, res) => {
  try {
    const clients = await Cliente.findAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ 
      erro: 'Erro ao buscar clientes',
      detalhes: error.message 
    });
  }
};

export const createClient = async (req, res) => {
  try {
    const { razaoSocial, cnpj, email, telefone, endereco } = req.body;
    
    const clientExists = await Cliente.findOne({ where: { cnpj } });
    if (clientExists) {
      return res.status(400).json({ erro: 'CNPJ já cadastrado' });
    }

    const client = await Cliente.create({
      razaoSocial,
      cnpj,
      email,
      telefone,
      endereco
    });

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ 
      erro: 'Erro ao criar cliente',
      detalhes: error.message 
    });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { razaoSocial, email, telefone, endereco, status } = req.body;

    const client = await Cliente.findByPk(id);
    if (!client) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    await client.update({
      razaoSocial,
      email,
      telefone,
      endereco,
      status
    });

    res.json(client);
  } catch (error) {
    res.status(500).json({ 
      erro: 'Erro ao atualizar cliente',
      detalhes: error.message 
    });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    
    const client = await Cliente.findByPk(id);
    if (!client) {
      return res.status(404).json({ erro: 'Cliente não encontrado' });
    }

    await client.destroy();
    res.json({ mensagem: 'Cliente removido com sucesso' });
  } catch (error) {
    res.status(500).json({ 
      erro: 'Erro ao remover cliente',
      detalhes: error.message 
    });
  }
};
