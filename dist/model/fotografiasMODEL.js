import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { maquina } from "./maquinasMODEL.js";
export const fotografia = sequelize.define('fotografia', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fotografia_billetero: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_serial_maquina: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_de_pantalla_superior: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_de_pantalla_inferior: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_la_placa: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_la_cpu: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_la_maquina: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_la_libreria: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_la_compra_maquina: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_la_importacion_maquina: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_la_importacion_billetero: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_la_serial_billetero: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_la_importacion_pantallas: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_la_serial_pantallas: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_la_importacion_cpu: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  },

  fotografia_la_serial_cpu: {
    type: DataTypes.BLOB('long')
    // allowNull: false
  }
}, {
  timestamps: false
});
export default fotografia;