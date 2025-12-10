import User from '../models/users.js';
import generateToken from '../utils/generateToken.js';

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
// @access  Public
export async function registerUser(req, res) {
  if (!req.body) {
    return res.status(400).json({ message: 'Datos no proporcionados' });
  }

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: 'Por favor, complete todos los campos'
    });
  }

  try {
    // 1. Validar que el email no exista
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // 2. Crear usuario (la contraseña se encripta en el hook pre-save del modelo)
    const user = await User.create({
      username,
      email,
      password,
    });

    // 3. Guardar usuario y retornar respuesta apropiada con token
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Datos de usuario inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: `Error del servidor: ${error.message}` });
  }
}

// @desc    Autenticar (login) un usuario
// @route   POST /api/auth/login
// @access  Public
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // 1. Validar credenciales (buscar usuario por email)
    //    Usamos .select('+password') porque en el modelo lo ocultamos por defecto
    const user = await User.findOne({ email }).select('+password');

    // 2. Comparar contraseña encriptada
    if (user && (await user.matchPassword(password))) {
      // 3. Generar y retornar JWT token
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // 4. Manejar errores de autenticación
      res.status(401).json({ message: 'Email o contraseña inválidos' });
    }
  } catch (error) {
    res.status(500).json({ message: `Error del servidor: ${error.message}` });
  }
}