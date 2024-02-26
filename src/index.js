import app from './app.js';
import { sequelize } from "./database/database.js";
import './model/usuariosMODEL.js'
import './model/maquinasMODEL.js'
import './model/ruletasMODEL.js'
import  "./model/fotografiasMODEL.js";

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT ||3000

async function main() {
    try{
    await sequelize.sync({force:true}) //NO TOCAR O CAMBIAR POR TRUE
    app.listen(process.env.PORT,()=>{
        console.log(`el puerto esta escuchando http://localhost:${PORT}`);

    })

} catch (error) {
    console.log("Unable to connect to the database: ", error);
}
}

main()
