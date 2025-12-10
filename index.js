import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/auth.Routes.js';
import itemRoutes from './src/routes/items.Routes.js';

const app = express();
const PORT = process.env.PORT ?? 5000;

const whitelist = ['http://localhost:5173', 'https://mi-app-frontend.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      // !origin permite peticiones sin origen (como Postman o Server-to-Server)
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
};  
  
app.use(cors(corsOptions))


// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/auth', authRoutes);
console.log('Montando rutas de registro...');
app.use('/api/items', itemRoutes);
console.log('Rutas de items montadas.');

// Iniciar el servidor y conectar a la base de datos

const startServer = async () => {
  try {
    await connectDB();

    app.get('/', (req, res) => {
      res.send('API REST funcionando correctamente');
    });

    app.listen(PORT, () => {
      console.log(`Servidor en el puerto ${PORT}`);
    });

  } catch (error) {

    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

export default app;