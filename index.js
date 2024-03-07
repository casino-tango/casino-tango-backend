import app from './app.js';
import { sequelize } from "./src/database/database.js";
import './src/model/usuariosMODEL.js'
import './src/model/maquinasMODEL.js'
import './src/model/ruletasMODEL.js'
import "./src/model/fotografiasMODEL.js";
import { PORT } from './src/config/config.js';




async function main() {
    try {
        await sequelize.sync({ force:true}) //NO TOCAR O CAMBIAR POR TRUE
        app.listen(PORT, () => {
            console.log(`el puerto esta escuchando http://localhost:${PORT}`);
        })

    } catch (error) {
        console.log("Unable to connect to the database: ", error);
    }
}

main()