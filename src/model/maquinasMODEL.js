import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

import { fotografia } from "../model/fotografiasMODEL.js";
export const maquina = sequelize.define('maquinas', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Numero_serial: {
        type: DataTypes.STRING(20),
        // allowNull: false,
        // unique: true
    },
    Numero_unico_coljuegos: {
        type: DataTypes.STRING(11),
        // allowNull: false,
        // unique: true
    },
    Numero_billetero: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    nombre_de_maquina: {
        type: DataTypes.STRING(20),
        // allowNull: false
    },
    Numero_interno_maquina: {
        type: DataTypes.INTEGER(10),
        // allowNull: false
    },
    Numero_serial_pantalla_superior: {
        type: DataTypes.STRING(50),
        // unique: true
    },
    Numero_serial_pantalla_inferior: {
        type: DataTypes.STRING(50),
        // unique: true
    },
    Marca_pantalla: {
        type: DataTypes.STRING(50),
        // allowNull: false
    },
    Marca_maquina: {
        type: DataTypes.STRING(50),
        // allowNull: false
    },
    Numero_cpu:{
        type:DataTypes.STRING
    },
    ubicacion_de_la_maquina: {
        type: DataTypes.ENUM(
            'Popayán Centro Comercial Campanario Casino Tango',
            'Popayán Centro Comercial Terraplaza Casino Tango',
            'Pasto Parque Infantil Casino Tango',
            'Ipiales Casino Tango'

        ),
        allowNull: false,
    },
    libreria_maquina: {
        type: DataTypes.STRING(50),
        // allowNull: false
    },
    cantidad_de_juegos: {
        type: DataTypes.ENUM(
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
            '31',
            '32',
            '33',
            '34',
            '35',
            '36',
            '37',
            '38',
            '39',
            '40',
            '41',
            '42',
            '43',
            '44',
            '45',
            '46',
            '47',
            '48',
            '49',
            '50',
            '51',
            '52',
            '53',
            '54',
            '55',
            '56',
            '57',
            '58',
            '59',
            '60'

        ),
        // allowNull: false,
    },
    marca_billetero: {
        type: DataTypes.ENUM(
            'VIZION',
            'MEI',
            'UBA',
            'ARDAC'
        ),
        allowNull: false

    },
    lista_de_juegos: {
        type: DataTypes.TEXT(250),

    },
    descripcion_maquina: { 
        type: DataTypes.TEXT(150)
    },
    fecha_instalaccion: {
        type: DataTypes.DATE,
        // allowNull: false
    },
    fecha_modificacion: {
        type: DataTypes.DATE,
        // allowNull: false
    },
  
},
    { timestamps: false, })

    maquina.hasMany(fotografia, {foreinkey: 'maquinaId',sourceKey: 'id'})
    fotografia.belongsTo(maquina, { foreignKey: "maquinaId", targetKey: "id" })
    


export default maquina