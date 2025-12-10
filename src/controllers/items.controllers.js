import Item from '../models/items.js';

// @desc    Obtener todos los items del usuario logueado
// @route   GET /api/items
// @access  Private
export async function getItems(req, res) {
  try {
    // req.user._id viene del middleware 'protect'
    const items = await Item.find({ user: req.user._id });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: `Error del servidor: ${error.message}` });
  }
}

// @desc    Crear un nuevo item
// @route   POST /api/items
// @access  Private
export async function createItem(req, res) {
  const { name, description } = req.body;

  try {
    const item = new Item({
      name,
      description,
      user: req.user._id, // Asignar el item al usuario logueado
    });

    const createdItem = await item.save();
    res.status(201).json({ message: 'Item creado exitosamente', createdItem});
  } catch (error) {
    res.status(500).json({ message: `Error del servidor: ${error.message}` });
  }
}

// @desc    Actualizar un item
// @route   PUT /api/items/:id
// @access  Private
export async function updateItem(req, res) {
  const { name, description } = req.body;

  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }

    // Verificar que el item pertenece al usuario que hace la solicitud
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Usuario no autorizado' });
    }

    item.name = name || item.name;
    item.description = description || item.description;

    const updatedItem = await item.save();
    res.json({ message: 'Item actualizado exitosamente', updatedItem });
  } catch (error) {
    res.status(500).json({ message: `Error del servidor: ${error.message}` });
  }
}

// @desc    Eliminar un item
// @route   DELETE /api/items/:id
// @access  Private
export async function deleteItem(req, res) {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item no encontrado' });
    }

    // Verificar que el item pertenece al usuario
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Usuario no autorizado' });
    }

    await item.deleteOne();
    res.json({ message: 'Item eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: `Error del servidor: ${error.message}` });
  }
}