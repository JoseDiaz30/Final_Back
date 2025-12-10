import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
 

const UserSchema = new Schema (
  {username: {
      type: String,
      required: [true, 'Por favor ingrese un nombre de usuario'],
    },
    email: {
      type: String,
      required: [true, 'Por favor ingrese un email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor ingrese un email válido',
      ],
    },
    password: {
      type: String,
      required: [true, 'Por favor ingrese una contraseña'],
      minlength: 6,
      select: false,
    },
  },
  {
    // fecha de creación (createdAt) y actualización (updatedAt)
    timestamps: true,
  }
);

// Middleware (pre-save hook) para encriptar la contraseña antes de guardar
UserSchema.pre('save', async function (next) {
  // Si la contraseña no ha sido modificada, sigue adelante
  if (!this.isModified('password')) {
    next();
  }

  // Generar "salt" y encriptar contraseña
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar la contraseña ingresada con la almacenada
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', UserSchema);