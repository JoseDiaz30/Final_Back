import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

const generateToken = (id) => {
  return sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // El token expira en 30 días
  });
};

export default generateToken;