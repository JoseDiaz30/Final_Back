import { Schema, model } from 'mongoose';

const ItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Por favor ingrese un nombre para el item'],
      trim: true,
    },
    description: {
      type: String,
      required: false,
    },
    // Relación con el usuario que creó el item
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Referencia al modelo 'User'
    },
  },
  {
    timestamps: true,
  }
);

export default model('Item', ItemSchema);