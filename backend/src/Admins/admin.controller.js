const bcrypt = require("bcrypt");
const { Admin, Producto } = require("../database/relaciones");

const crearAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;

        const sal = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, sal);

        const adminCreado = await Admin.create({
            email: email,
            password: hash
        })

        res.status(201).json({
            ok: true,
            mensaje: "Admin creado",
            admin: adminCreado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            mensaje: "Error al crear el administrador",
            error: error.message,
        })
    }
}

const mostrarLogin = (req, res) => {
    res.render("admin/login", {error: null});
}

const procesarLogin = async (req, res) => {

    const {email, password} = req.body;

    const admin = await Admin.findOne({ where: { email: email } });

    if (admin && bcrypt.compareSync(password, admin.password)) {
        res.redirect("/admin/dashboard");
    } else {
        res.render("admin/login", {error: "Email o contraseña incorrectas"});
    }
}

//DASHBOARD
const mostrarDashboard = async (req, res) => {
    const tipo = req.query.tipo;
    
    let productos;
    if (tipo) {
        productos = await Producto.findAll({ where: {tipo: tipo} });
    } else {
        productos = await Producto.findAll({ order: [["tipo", "ASC"]] });   
    }

    res.render("admin/dashboard", { productos: productos, tipo: tipo });
}

//POST PRODUCTOS
const mostrarPostForm = (req, res) => {
    res.render("admin/formulario", {producto: null});
}

const crearProducto = async (req, res) => {
    const { nombre, tipo, precio, stock, descripcion } = req.body;

    const imagen = `http://localhost:3000/imagenes/${req.file.filename}`;

    await Producto.create({
        nombre: nombre,
        tipo: tipo,
        precio: precio,
        stock: stock,
        descripcion: descripcion,
        imagen: imagen,
        activo: true,
    })

    res.redirect("/admin/dashboard")
}

//LOGICA DEL CAMPO ACTIVO
const darDeBaja = async (req, res) => {
    await Producto.update( { activo: false}, {where: {id: req.params.id} })

    res.redirect("/admin/dashboard")
}

const activar = async (req, res) => {
    await Producto.update( {activo: true}, {where: { id: req.params.id}} );

    res.redirect("/admin/dashboard");
}

module.exports = {
    crearAdmin,
    mostrarLogin,
    procesarLogin,
    mostrarDashboard,
    mostrarPostForm,
    crearProducto,
    darDeBaja,
    activar
}