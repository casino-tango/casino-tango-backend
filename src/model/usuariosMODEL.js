import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { maquina } from "./maquinasMODEL.js";
import { ruleta } from "./ruletasMODEL.js";

export const usuarios = sequelize.define('usuario', {

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true

    },
    ubicacion_de_la_maquina: {
        type: DataTypes.ENUM(
            '01',
            '02',
            '03',
            '04',
        ),
        // allowNull: false,
    },
   

},
    {
        timestamps: false,
    }
)
//relacion con maquina
usuarios.hasMany(maquina, {
    foreinkey: 'usuariosId',
    sourceKey: 'id'
})
maquina.belongsTo(usuarios, { foreignKey: "usuarioId", targetKey: "id" })


//relacion de ruletas
usuarios.hasMany(ruleta, {
    foreinkey: 'usuariosId',
    sourceKey: 'id'
})
ruleta.belongsTo(usuarios, { foreignKey: "usuarioId", targetKey: "id" })


