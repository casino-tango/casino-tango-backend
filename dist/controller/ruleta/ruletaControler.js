import { ruleta } from "../../model/ruletasMODEL.js";
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { where } from "sequelize";
const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
import sharp from 'sharp';

//mirar todas las ruleta
export async function mirar(req, res) {
  try {
    const ruletas = await ruleta.findAll();
    res.json(ruletas);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
    console.log(error);
  }
}
//creaer por ruleta
export async function crear(req, res) {
  try {
    const files = req.files;
    const {
      //numeor de seriales
      N_serial,
      N_serial_1,
      N_serial_2,
      N_serial_3,
      N_serial_4,
      N_serial_5,
      N_serial_6,
      N_serial_7,
      N_serial_8,
      N_serial_9,
      N_serial_10,
      //billeteros
      N_billetero_1,
      N_billetero_2,
      N_billetero_3,
      N_billetero_4,
      N_billetero_5,
      N_billetero_6,
      N_billetero_7,
      N_billetero_8,
      N_billetero_9,
      N_billetero_10,
      //stacker
      N_stacker_1,
      N_stacker_2,
      N_stacker_3,
      N_stacker_4,
      N_stacker_5,
      N_stacker_6,
      N_stacker_7,
      N_stacker_8,
      N_stacker_9,
      N_stacker_10,
      //demas datos 
      nombre_de_ruleta,
      N_modulos,
      Marca,
      Description,
      Pantalla,
      ubicacion_del_elemento,
      fecha_instalaccion_ruleta,
      //nummero unico de coljuegos

      Nuc_1,
      Nuc_2,
      Nuc_3,
      Nuc_4,
      Nuc_5,
      Nuc_6,
      Nuc_7,
      Nuc_8,
      Nuc_9,
      Nuc_10
    } = req.body;
    const imagesData = {};
    for (const key in files) {
      const file = files[key][0];
      const imageData = await fs.promises.readFile(file.path);
      let width, height; // Definir las dimensiones específicas para cada imagen

      // Lógica para determinar las dimensiones para cada imagen
      if (key === 'certificado_de_importacion_ruleta') {
        width = 800; // Ancho deseado para certificado_de_importacion
        height = 880; // Alto deseado para certificado_de_importacion
      } else if (key === 'Factura_compra_ruleta') {
        width = 800; // Ancho deseado para fotografia_de_maquina
        height = 800; // Alto deseado para fotografia_de_maquina
      } else if (key === 'fotografia_de_respaldo') {
        width = 800; // Ancho deseado para certificado_de_importacion
        height = 980; // Alto deseado para certificado_de_importacion
      }

      // Reducir el tamaño de la imagen utilizando sharp con las dimensiones específicas
      const compressedImageData = await sharp(imageData).resize({
        width,
        height
      }).toBuffer();
      imagesData[key] = compressedImageData;
    }
    const ruletas = await ruleta.create({
      //numeor de seriales
      N_serial: N_serial,
      N_serial_1: N_serial_1,
      N_serial_2: N_serial_2,
      N_serial_3: N_serial_3,
      N_serial_4: N_serial_4,
      N_serial_5: N_serial_5,
      N_serial_6: N_serial_6,
      N_serial_7: N_serial_7,
      N_serial_8: N_serial_8,
      N_serial_9: N_serial_9,
      N_serial_10: N_serial_10,
      //billeteros
      N_billetero_1: N_billetero_1,
      N_billetero_2: N_billetero_2,
      N_billetero_3: N_billetero_3,
      N_billetero_4: N_billetero_4,
      N_billetero_5: N_billetero_5,
      N_billetero_6: N_billetero_6,
      N_billetero_7: N_billetero_7,
      N_billetero_8: N_billetero_8,
      N_billetero_9: N_billetero_9,
      N_billetero_10: N_billetero_10,
      //stacker
      N_stacker_1: N_stacker_1,
      N_stacker_2: N_stacker_2,
      N_stacker_3: N_stacker_3,
      N_stacker_4: N_stacker_4,
      N_stacker_5: N_stacker_5,
      N_stacker_6: N_stacker_6,
      N_stacker_7: N_stacker_7,
      N_stacker_8: N_stacker_8,
      N_stacker_9: N_stacker_9,
      N_stacker_10: N_stacker_10,
      //demas datos 
      nombre_de_ruleta: nombre_de_ruleta,
      N_modulos: N_modulos,
      Marca: Marca,
      Description: Description,
      Pantalla: Pantalla,
      ubicacion_del_elemento: ubicacion_del_elemento,
      fecha_instalaccion_ruleta,
      //fotos
      certificado_de_importacion_ruleta: imagesData.certificado_de_importacion_ruleta,
      fotografia_de_ruleta: imagesData.fotografia_de_ruleta,
      Factura_compra_ruleta: imagesData.Factura_compra_ruleta,
      serial_modelo_ruleta: imagesData.serial_modelo_ruleta,
      fotografia_de_respaldo: imagesData.fotografia_de_respaldo,
      // usuarioId
      //nummero unico de coljuegos
      Nuc_1: Nuc_1,
      Nuc_2: Nuc_2,
      Nuc_3: Nuc_3,
      Nuc_4: Nuc_4,
      Nuc_5: Nuc_5,
      Nuc_6: Nuc_6,
      Nuc_7: Nuc_7,
      Nuc_8: Nuc_8,
      Nuc_9: Nuc_9,
      Nuc_10: Nuc_10
    });
    res.status(201).json(ruletas);
  } catch (error) {
    console.log(error); // Log the error message
    res.status(500).json({
      message: error.message
    });
  }
}
//eliminar ruleta
export async function eliminar(req, res) {
  try {
    const {
      id
    } = req.params;
    const eliminado = await ruleta.destroy({
      where: {
        id: id
      }
    });
    // res.status(201).json(eiliminado);
    // return res.status(200).json({eiliminado})
    return res.status(200).json({
      message: 'la ruleta se a eliminado correctamente'
    });
  } catch (error) {
    res.status(300).json({
      message: error.message
    });
  }
}
export async function eliminar1(req, res) {
  try {
    const {
      N_serial
    } = req.params;
    await ruleta.destroy({
      where: {
        N_serial: N_serial
      }
    });
    return res.status(200).json({
      message: 'maquina eliminad correctamente'
    });
  } catch (error) {
    res.status(300).json({
      message: error.message
    });
    console.log(error);
  }
}
export async function eliminarNuc(req, res) {
  try {
    const {
      Nuc_1
    } = req.params;
    await ruleta.destroy({
      where: {
        Nuc_1: Nuc_1
      }
    });
    return res.status(200).json({
      message: 'maquina eliminad correctamente'
    });
  } catch (error) {
    res.status(300).json({
      message: error.message
    });
    console.log(error);
  }
}
//buscar
export async function buscar(req, res) {
  const {
    N_serial
  } = req.params;
  try {
    const buscar_serial = await ruleta.findOne({
      where: {
        N_serial: N_serial
      }
    });
    res.json(buscar_serial);
  } catch (error) {
    console.log(error);
  }
}
export async function buscarNuc1(req, res) {
  const {
    Nuc_1
  } = req.params;
  try {
    const buscarNuc = await ruleta.findOne({
      where: {
        Nuc_1: Nuc_1
      }
    });
    res.json(buscarNuc);
  } catch (error) {
    res.status(300).json({
      message: error.message
    });
  }
}
export async function editar_ruleta(req, res) {
  const {
    id
  } = req.params;
  try {
    const {
      //numeor de seriales
      // N_serial,
      // N_serial_1,
      // N_serial_2,
      // N_serial_3,
      // N_serial_4,
      // N_serial_5,
      // N_serial_6,
      // N_serial_7,
      // N_serial_8,
      // N_serial_9,
      // N_serial_10,
      //billeteros
      // N_billetero_1,
      // N_billetero_2,
      // N_billetero_3,
      // N_billetero_4,
      // N_billetero_5,
      // N_billetero_6,
      // N_billetero_7,
      // N_billetero_8,
      // N_billetero_9,
      // N_billetero_10,
      //stacker
      // N_stacker_1,
      // N_stacker_2,
      // N_stacker_3,
      // N_stacker_4,
      // N_stacker_5,
      // N_stacker_6,
      // N_stacker_7,
      // N_stacker_8,
      // N_stacker_9,
      // N_stacker_10,
      //demas datos 
      nombre_de_ruleta
      // N_modulos,
      // Marca,
      // Description,
      // Pantalla,
      // ubicacion_del_elemento,
      // fecha_instalaccion_ruleta,
      //fotos
    } = req.body;
    const editar = await ruleta.findByPk(id);
    //numeor de seriales
    // editar.N_serial_1 = N_serial_1;
    // editar.N_serial_2 = N_serial_2;
    // editar.N_serial_3 = N_serial_3;
    // editar.N_serial_4 = N_serial_4;
    // editar.N_serial_5 = N_serial_5;
    // editar.N_serial_6 = N_serial_6;
    // editar.N_serial_7 = N_serial_7;
    // editar.N_serial_8 = N_serial_8;
    // editar.N_serial_9 = N_serial_9;
    // editar.N_serial_10 = N_serial_10;
    //billeteros
    // editar.N_billetero_1 = N_billetero_1,
    //     editar.N_billetero_2 = N_billetero_2,
    //     editar.N_billetero_3 = N_billetero_3,
    //     editar.N_billetero_4 = N_billetero_4,
    //     editar.N_billetero_5 = N_billetero_5,
    //     editar.N_billetero_6 = N_billetero_6,
    //     editar.N_billetero_7 = N_billetero_7,
    //     editar.N_billetero_8 = N_billetero_8,
    //     editar.N_billetero_9 = N_billetero_9,
    // editar.N_billetero_10 = N_billetero_10,
    //stacker
    // editar.N_stacker_1 = N_stacker_1,
    // editar.N_stacker_2 = N_stacker_2,
    // editar.N_stacker_3 = N_stacker_3,
    // editar.N_stacker_4 = N_stacker_4,
    // editar.N_stacker_5 = N_stacker_5,
    // editar.N_stacker_6 = N_stacker_6,
    // editar.N_stacker_7 = N_stacker_7,
    // editar.N_stacker_8 = N_stacker_8,
    // editar.N_stacker_9 = N_stacker_9,
    // editar.N_stacker_10 = N_stacker_10,
    //demas datos 
    editar.nombre_de_ruleta = nombre_de_ruleta,
    // editar.N_modulos = N_modulos,
    // editar.Marca = Marca,
    // editar.Description = Description,
    // editar.Pantalla = Pantalla,
    // editar.ubicacion_del_elemento = ubicacion_del_elemento,
    // editar.fecha_instalaccion_ruleta = fecha_instalaccion_ruleta,
    //fotos

    await editar.save();
    res.json(editar);
  } catch (error) {
    console.log(error); // Log the error message
    res.status(500).json({
      message: error.message
    });
  }
}
export async function editar_ruleta_serial(req, res) {
  const {
    N_serial
  } = req.params;
  const files = req.files;
  try {
    const {
      //numeor de seriales
      // N_serial,
      N_serial_1,
      N_serial_2,
      N_serial_3,
      N_serial_4,
      N_serial_5,
      N_serial_6,
      N_serial_7,
      N_serial_8,
      N_serial_9,
      N_serial_10,
      //billeteros
      N_billetero_1,
      N_billetero_2,
      N_billetero_3,
      N_billetero_4,
      N_billetero_5,
      N_billetero_6,
      N_billetero_7,
      N_billetero_8,
      N_billetero_9,
      N_billetero_10,
      //stacker
      N_stacker_1,
      N_stacker_2,
      N_stacker_3,
      N_stacker_4,
      N_stacker_5,
      N_stacker_6,
      N_stacker_7,
      N_stacker_8,
      N_stacker_9,
      N_stacker_10,
      //demas datos 
      nombre_de_ruleta,
      N_modulos,
      Marca,
      Description,
      Pantalla,
      ubicacion_del_elemento,
      fecha_instalaccion_ruleta
      //fotos
    } = req.body;
    const imagesData = {};
    for (const key in files) {
      const file = files[key][0];
      const imageData = await fs.promises.readFile(file.path);
      imagesData[key] = imageData;
    }
    const [editar_serial] = await ruleta.update({
      //numeor de seriales
      N_serial_1,
      N_serial_2,
      N_serial_3,
      N_serial_4,
      N_serial_5,
      N_serial_6,
      N_serial_7,
      N_serial_8,
      N_serial_9,
      N_serial_10,
      //billeteros
      N_billetero_1,
      N_billetero_2,
      N_billetero_3,
      N_billetero_4,
      N_billetero_5,
      N_billetero_6,
      N_billetero_7,
      N_billetero_8,
      N_billetero_9,
      N_billetero_10,
      //stacker
      N_stacker_1,
      N_stacker_2,
      N_stacker_3,
      N_stacker_4,
      N_stacker_5,
      N_stacker_6,
      N_stacker_7,
      N_stacker_8,
      N_stacker_9,
      N_stacker_10,
      //demas datos 
      nombre_de_ruleta,
      N_modulos,
      Marca,
      Description,
      Pantalla,
      ubicacion_del_elemento,
      fecha_instalaccion_ruleta,
      // //fotos
      certificado_de_importacion_ruleta: imagesData.certificado_de_importacion_ruleta,
      fotografia_de_ruleta: imagesData.fotografia_de_ruleta,
      Factura_compra_ruleta: imagesData.Factura_compra_ruleta,
      serial_modelo_ruleta: imagesData.serial_modelo_ruleta,
      fotografia_de_respaldo: imagesData.fotografia_de_respaldo
    }, {
      where: {
        N_serial
      }
    });
    if (editar_serial === 0) {
      return res.status(404).json({
        message: 'No se encuentra un número de serial'
      });
    }
    res.json(req.filea);
  } catch (error) {
    console.log(error); // Log the error message
    res.status(500).json({
      message: error.message
    });
  }
}