// DEPENDENCIAS
import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();    
const app = express();
const PORT = process.env.PORT || 4000;  
app.use(express.json());

// CONEXIÓN A LA BASE DE DATOS  
const dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
};
let connection;
async function connectToDatabase() {
    connection = await mysql.createConnection(dbConfig);
    console.log("Conectado a la base de datos MySQL");
        }
async function myQuery(query) {
    const [rows] = await connection.execute(query);
    return rows;
}

// RUTAS
app.get("/testdb",  async(req, res) => {
    let sqlQuery = "SELECT NOW() AS now";
    try {
        const result = await myQuery(sqlQuery);
        return res.json(result);
    }
    catch (error) {
        console.error("Error al ejecutar la consulta:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

// INICIAR EL SERVIDOR
app.listen(PORT,  async () => {
    await connectToDatabase();
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
}); 

