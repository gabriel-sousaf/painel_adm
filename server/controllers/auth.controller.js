import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/index.js';

const gerarTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user.id, cargo: user.cargo },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    if (user.status === 'inativo') {
      return res.status(401).json({ erro: 'Usuário inativo' });
    }

    const tokens = gerarTokens(user);
    
    await user.update({ 
      ultimoAcesso: new Date() 
    });

    res.json({
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        cargo: user.cargo
      },
      ...tokens
    });
  } catch (error) {
    res.status(500).json({ 
      erro: 'Erro ao realizar login' 
    });
  }
};

export const register = async (req, res) => {
  try {
    const { nome, email, senha, cargo } = req.body;

    const usuarioExistente = await User.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ 
        erro: 'Email já cadastrado' 
      });
    }

    const user = await User.create({
      nome,
      email,
      senha,
      cargo: cargo || 'usuario'
    });

    const tokens = gerarTokens(user);

    res.status(201).json({
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        cargo: user.cargo
      },
      ...tokens
    });
  } catch (error) {
    res.status(500).json({ 
      erro: 'Erro ao criar usuário' 
    });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(401).json({ 
        erro: 'Refresh token não fornecido' 
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user || user.status === 'inativo') {
      return res.status(401).json({ 
        erro: 'Usuário não encontrado ou inativo' 
      });
    }

    const tokens = gerarTokens(user);
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ 
      erro: 'Refresh token inválido' 
    });
  }
};

export const logout = async (req, res) => {
  // Implementação futura: blacklist de tokens
  res.json({ mensagem: 'Logout realizado com sucesso' });
};
