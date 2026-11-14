const z = require("zod");

const crearAdmin = z.object({
    email: z.string().min(5),
    password: z.string().min(4)
})

const validarAdmin = (req, res, next) => {
    try {
        req.body = crearAdmin.parse(req.body);

        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json(error.issues);
        }
    }
}

module.exports = {validarAdmin}