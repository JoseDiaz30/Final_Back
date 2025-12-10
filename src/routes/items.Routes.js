import { getItems, createItem, updateItem, deleteItem } from '../controllers/items.controllers.js';
import protect from '../middlewares/auth.middlewares.js';
import { Router } from 'express';

const router = Router();

// Aplicamos el middleware 'protect' a todas las rutas de /api/items

// GET /api/items (Obtener todos)
// POST /api/items (Crear uno)
router.route('/').get(protect, getItems).post(protect, createItem);

// PUT /api/items/:id (Actualizar uno)
// DELETE /api/items/:id (Eliminar uno)
router.route('/:id').put(protect, updateItem).delete(protect, deleteItem);

export default router;