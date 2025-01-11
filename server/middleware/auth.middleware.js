import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        erro: 'Token de autenticação não fornecido' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user || user.status === 'inativo') {
      return res.status(401).json({ 
        erro: 'Usuário não encontrado ou inativo' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        erro: 'Token expirado' 
      });
    }
    return res.status(401).json({ 
      erro: 'Token inválido' 
    });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (req.user.cargo !== 'admin') {
    return res.status(403).json({ 
      erro: 'Acesso negado. Requer privilégios de administrador' 
    });
  }
  next();
};

export const gerenteMiddleware = (req, res, next) => {
  if (!['admin', 'gerente'].includes(req.user.cargo)) {
    return res.status(403).json({ 
      erro: 'Acesso negado. Requer privilégios de gerente ou superior' 
    });
  }
  next();
};
