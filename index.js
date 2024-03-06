import app from './app.js';
import { sequelize } from "./src/database/database.js";
import './src/model/usuariosMODEL.js'
import './src/model/maquinasMODEL.js'
import './src/model/ruletasMODEL.js'
import "./src/model/fotografiasMODEL.js";

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3001

async function main() {
    try {
        await sequelize.sync({ force:false}) //NO TOCAR O CAMBIAR POR TRUE
        app.listen(process.env.PORT, () => {
            console.log(`el puerto esta escuchando http://localhost:${PORT}`);
        })

    } catch (error) {
        console.log("Unable to connect to the database: ", error);
    }
}

main()