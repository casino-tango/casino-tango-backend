import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const ruleta = sequelize.define('ruletas', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  //numero unico de coljuegos
  Nuc_1: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  Nuc_2: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  Nuc_3: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  Nuc_4: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  Nuc_5: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  Nuc_6: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  Nuc_7: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  Nuc_8: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  Nuc_9: {
    type: DataTypes.BIGINT

    // allowNull: false,
    // unique: true
  },

  Nuc_10: {
    type: DataTypes.BIGINT
    // allowNull: false,
    // unique: true
    //NUMEROS SERILES DE LA RULETA
  },

  N_serial: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  N_serial_1: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  N_serial_2: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  N_serial_3: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  N_serial_4: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  N_serial_5: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  N_serial_6: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  N_serial_7: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  N_serial_8: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  N_serial_9: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  N_serial_10: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  //NUMERO DE LOS BILLETEROS
  N_billetero_1: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_billetero_2: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_billetero_3: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_billetero_4: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_billetero_5: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_billetero_6: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_billetero_7: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_billetero_8: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_billetero_9: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_billetero_10: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  // NUMERO DE LOS STACKER
  N_stacker_1: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_stacker_2: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_stacker_3: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_stacker_4: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_stacker_5: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_stacker_6: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_stacker_7: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_stacker_8: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_stacker_9: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  N_stacker_10: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  //demas datos
  nombre_de_ruleta: {
    type: DataTypes.STRING,
    allowNull: false
  },
  N_modulos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Marca: {
  //     type: DataTypes.STRING,
  //     // allowNull: false
  // },
  Description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Pantalla: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ubicacion_del_elemento: {
    type: DataTypes.ENUM('Popayán Centro Comercial Campanario', 'Popayán Centro Comercial Terraplaza', 'Pasto Parque Infantil', 'Ipiales Casino Tango'),
    allowNull: false
  },
  fecha_instalaccion_ruleta: {
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
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_de_billetero: {
    type: DataTypes.BLOB('long')
  }
}, {
  timestamps: false
});