const z = require('zod');

const ProductoCrear = z.object({
    nombre: z.string().min(3).max(50),
    tipo: z.enum(["flores","velas"]),
    precio: z.coerce.number().int().min(1),
    stock: z.coerce.number().int().min(0),
    descripcion: z.string().max(255).optional()
});

const productoModificar = z.object({
    nombre: z.string().min(3).max(50).optional(),
    tipo: z.enum(["flores","velas"]).optional(),
    precio: z.coerce.number().int().min(1).optional(),
    stock: z.coerce.number().int().min(0).optional(),
    descripcion: z.string().max(255).optional()
});

const crearProductoMW = (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ mensaje: "Falta la imagen del producto" });
        }

        req.body = ProductoCrear.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json(error.issues);
        }
    }
};

const modificarProductoMW = (req, res, next) => {
    try {
        req.body = productoModificar.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json(error.issues);
        }
    }
};

module.exports = { crearProductoMW, modificarProductoMW };