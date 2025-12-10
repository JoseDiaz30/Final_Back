import jwt from 'jsonwebtoken';
import User from '../models/users.js';

// Middleware para proteger rutas
const protect = async (req, res, next) => {
  let token;

  // Verificar si el token está en los headers y es de tipo Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 1. Obtener el token del header
      token = req.headers.authorization.split(' ')[1];

      // 2. Validar el token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Extraer información del usuario (menos la contraseña)
      //    y adjuntarla al objeto 'req' para usarla en los controladores
      req.user = await User.findById(decoded.id).select('-password');

      // 4. Permitir acceso
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'No autorizado, token falló' });
    }
  }

  // Manejar caso de no encontrar token
  if (!token) {
    res.status(401).json({ message: 'No autorizado, no hay token' });
  }
};

export default protect;