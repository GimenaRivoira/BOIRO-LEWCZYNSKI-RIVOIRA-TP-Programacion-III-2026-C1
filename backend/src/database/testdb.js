//archivo creado  con ia pq no me funcionaba la conexion, ahora. manana se arregla :)

const sequelize = require("./sequelize"); // Reemplazá "./db" por la ruta real de tu archivo

async function probarConexion() {
  try {
    console.log("Conectando a la base de datos...");
    await sequelize.authenticate();
    console.log("¡Conexión establecida con éxito! ");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos: x", error.message);
  } finally {
    await sequelize.close();
  }
}

probarConexion();
