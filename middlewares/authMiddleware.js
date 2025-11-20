import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        console.log('🔐 token válido, user:', payload);
        next();
    } catch (err) {
        console.log('❌ Token inválido:', err.message);
        return res.status(401).json({ message: 'Token inválido' });
    }
};

export const requireAdmin = (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'No autenticado' });
    if (!['administrador', 'admin', 'dueno'].includes(req.user.rol)) {
    return res.status(403).json({ message: 'Permisos insuficientes' });
    }
    next();
};
