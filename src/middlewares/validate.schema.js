export const validateSchema = (Schema) => {
  return (req, res, next) => {
    try { Schema.safeParse(req.body);
        next();
    } catch (error) {
        
        res.status(400).json({ error: 'Datos inválidos según el esquema definido.' });
    }
    };
};