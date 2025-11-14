import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config(); 

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
    connection = await mysql.createPool(dbConfig);
    console.log("Conectado a la base de datos MySQL");
    return connection;
        }
export async function myQuery(query) {
    if (!connection) {
        await connectToDatabase();
    }
    const [rows] = await connection.execute(query);
    return rows;
}
