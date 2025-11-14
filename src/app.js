// DEPENDENCIAS
import express from "express";
import dotenv from "dotenv";
import { myQuery } from "../databases/mysql.js";

dotenv.config();    
const app = express();
const PORT = process.env.PORT || 4000;  
app.use(express.json());


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
app.listen(PORT,  () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
}); 

