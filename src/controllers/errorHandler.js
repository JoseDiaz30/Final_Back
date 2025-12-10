app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Credenciales Invalidas' });
    }

    res.json({ token: generateToken(user._id), user });
  } catch (error) {
    console.error(error); // log the actual error
    res.status(500).json({ message: 'Error del servidor' });
  }
});
