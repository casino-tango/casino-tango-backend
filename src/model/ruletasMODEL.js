import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const ruleta = sequelize.define('ruletas', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    //numero unico de coljuegos
    Numero_unico_coljuegos_1: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    Numero_unico_coljuegos_2: {
        type: DataTypes.BIGINT,

        allowNull: false,
        unique: true
    },
    Numero_unico_coljuegos_3: {
        type: DataTypes.BIGINT,

        allowNull: false,
        unique: true
    },
    Numero_unico_coljuegos_4: {
        type: DataTypes.BIGINT,

        allowNull: false,
        unique: true
    },
    Numero_unico_coljuegos_5: {
        type: DataTypes.BIGINT,

        allowNull: false,
        unique: true
    },
    Numero_unico_coljuegos_6: {
        type: DataTypes.BIGINT,

        allowNull: false,
        unique: true
    },
    Numero_unico_coljuegos_7: {
        type: DataTypes.BIGINT,

        allowNull: false,
        unique: true
    },
    Numero_unico_coljuegos_8: {
        type: DataTypes.BIGINT,

        allowNull: false,
        unique: true
    },
    Numero_unico_coljuegos_9: {
        type: DataTypes.BIGINT,

        // allowNull: false,
        // unique: true
    },
    Numero_unico_coljuegos_10: {
        type: DataTypes.BIGINT,
        // allowNull: false,
        // unique: true
        //NUMEROS SERILES DE LA RULETA
    },
    Numero_serial: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    //numero_serial_pantalla_ruleta
    Numero_serial_pantalla_1: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Numero_serial_pantalla_2: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Numero_serial_pantalla_3: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Numero_serial_pantalla_4: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Numero_serial_pantalla_5: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Numero_serial_pantalla_6: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Numero_serial_pantalla_7: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Numero_serial_pantalla_8: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Numero_serial_pantalla_9: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Numero_serial_pantalla_10: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    //NUMERO DE LOS BILLETEROS
    Numero_billetero_1: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    Numero_billetero_2: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    Numero_billetero_3: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    Numero_billetero_4: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    Numero_billetero_5: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    Numero_billetero_6: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    Numero_billetero_7: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    Numero_billetero_8: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    Numero_billetero_9: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    Numero_billetero_10: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    // NUMERO DE LOS STACKER
    Numero_stacker_1: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    Numero_stacker_2: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    Numero_stacker_3: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    Numero_stacker_4: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    Numero_stacker_5: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    Numero_stacker_6: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    Numero_stacker_7: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    Numero_stacker_8: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
    },
    Numero_stacker_9: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    Numero_stacker_10: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true

    },
    //demas datos
    
    Nombre_de_ruleta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Numero_modulos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Marca_ruleta: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Pantalla: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ubicacion_del_elemento: {
        type: DataTypes.ENUM(
            'Popayán Centro Comercial Campanario',
            'Popayán Centro Comercial Terraplaza',
            'Pasto Parque Infantil',
            'Ipiales Casino Tango'
        ),
        // allowNull: false,
    },
    marca_del_billetero: {
        type: DataTypes.ENUM(
            'VIZION',
            'MEI',
            'UBA',
            'ARDAC',
            '1'
        ),
        // allowNull: false

    },
    fecha_instalaccion_ruleta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_modificacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    // DATOS DE IMG
    certificado_de_importacion_ruleta: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    },
    fotografia_de_ruleta: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    },
    Factura_compra_ruleta: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    },
    serial_modelo_ruleta: {
        type: DataTypes.BLOB('long'),
        allowNull: false
    },
    fotografia_de_respaldo: {
        type: DataTypes.BLOB('long'),
        // allowNull: false
    },
    fotografia_de_billetero: {
        type: DataTypes.BLOB('long'),
    },
    fotografia_de_placa:{
        type:DataTypes.BLOB('long'),
        // allowNull: false
    }
},

    {
        timestamps: false,
    })

