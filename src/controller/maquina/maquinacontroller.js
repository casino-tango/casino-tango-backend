import { maquina } from "../../model/maquinasMODEL.js";
import { fotografia } from "../../model/fotografiasMODEL.js";

import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);




export async function mirar(req, res) {
    try {
        const datos = await maquina.findAll(
            {
            include: 'fotografia' // Incluye los datos de la tabla 'fotografia' asociados a cada 'maquina'
        }
        );
        res.json(datos);
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        res.status(500).json({ error: 'Error al obtener los datos' });
    }
}

export async function crear(req, res) {
    try {
        const files = req.files;

        const {
            Numero_serial,
            Numero_unico_coljuegos,
            Numero_billetero,
            nombre_de_maquina,
            Numero_interno_maquina,
            Numero_serial_pantalla_superior,
            Numero_serial_pantalla_inferior,
            Marca_pantalla,
            Marca_maquina,
            Numero_cpu,
            ubicacion_de_la_maquina,
            libreria_maquina,
            cantidad_de_juegos,
            marca_billetero,
            lista_de_juegos,
            descripcion_maquina,
            fecha_instalaccion,
            fecha_modificacion,
            usuarioId
        } = req.body;

        // Crear la máquina primero para obtener el ID automáticamente
        const producto = await maquina.create({
            Numero_serial,
            Numero_unico_coljuegos,
            Numero_billetero,
            nombre_de_maquina,
            Numero_interno_maquina,
            Numero_serial_pantalla_superior,
            Numero_serial_pantalla_inferior,
            Marca_pantalla,
            Marca_maquina,
            Numero_cpu,
            ubicacion_de_la_maquina,
            libreria_maquina,
            cantidad_de_juegos,
            marca_billetero,
            lista_de_juegos,
            descripcion_maquina,
            fecha_instalaccion,
            fecha_modificacion,
            usuarioId
        });

        const maquinaId = producto.id; // Obtener el ID de la máquina creada

        const imagesData = {};

        for (const key in files) {
            const file = files[key][0];
            const imageData = await fs.promises.readFile(file.path);
            imagesData[key] = imageData;
        }


        // Crear la fotografía usando el maquinaId obtenido
        const fotografiaData = await fotografia.create({
            fotografia_billetero: imagesData.fotografia_billetero,
            fotografia_serial_maquina: imagesData.fotografia_serial_maquina,
            fotografia_de_pantalla_superior: imagesData.fotografia_de_pantalla_superior,
            fotografia_de_pantalla_inferior: imagesData.fotografia_de_pantalla_inferior,
            fotografia_la_placa: imagesData.fotografia_la_placa,
            fotografia_la_cpu: imagesData.fotografia_la_cpu,
            fotografia_la_maquina: imagesData.fotografia_la_maquina,
            fotografia_la_libreria: imagesData.fotografia_la_libreria,
            fotografia_la_compra_maquina: imagesData.fotografia_la_compra_maquina,
            fotografia_la_importacion_maquina: imagesData.fotografia_la_importacion_maquina,
            fotografia_la_importacion_billetero: imagesData.fotografia_la_importacion_billetero,
            fotografia_la_serial_billetero: imagesData.fotografia_la_serial_billetero,
            fotografia_la_importacion_pantallas: imagesData.fotografia_la_importacion_pantallas,
            fotografia_la_serial_pantallas: imagesData.fotografia_la_serial_pantallas,
            fotografia_la_importacion_cpu: imagesData.fotografia_la_importacion_cpu,
            fotografia_la_serial_cpu: imagesData.fotografia_la_serial_cpu,
            usuarioId,
            maquinaId
        });

        res.status(201).json({ fotografiaData, producto });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


export async function eliminarmaquina_N_serial(req, res) {
    try {
        const { N_serial } = req.params
        await maquina.destroy({
            where: {
                N_serial: N_serial
            }
        })
        return res.status(200).json({ message: 'maquina eliminad correctamente' });

    } catch (error) {
        // console.log(error);
        res.status(300).json({ message: error.message });

    }
}

export async function eliminarmaquina_id(req, res) {
    try {
        const { id } = req.params
        await maquina.destroy({
            where: {
                id: id
            }
        })
        return res.status(200).json({ message: 'maquina eliminad correctamente' });

    } catch (error) {

        res.status(300).json({ message: error.message });

    }
}

export async function eliminarmaquina_Nuc(req, res) {
    try {
        const { Nuc } = req.params
        await maquina.destroy({
            where: {
                Nuc: Nuc
            }
        })
        return res.status(200).json({ message: 'maquina eliminad correctamente' });

    } catch (error) {

        res.status(300).json({ message: error.message });
        // console.log(error);

    }
}

export async function buscar_id(req, res) {
    const { ubicacion_de_la_maquina } = req.params
    try {
        const buscarid = await maquina.findAll({
            where: { ubicacion_de_la_maquina: ubicacion_de_la_maquina, }
        })
        res.json(buscarid)
    } catch (error) {
        res.status(300).json({ message: error.message });
    }
}

export async function buscar_serial(req, res) {
    const { Numero_serial } = req.params
    try {
        const buscarN_serial = await maquina.findOne({
            where: { Numero_serial: Numero_serial },
            include: fotografia
        })
        res.json(buscarN_serial)
    } catch (error) {
        res.status(300).json({ message: error.message });
    }
}

export async function buscarNuc(req, res) {
    const { Numero_unico_coljuegos } = req.params
    try {
        const buscarNuc1 = await maquina.findOne({
            where: { Numero_unico_coljuegos: Numero_unico_coljuegos }
            ,
            include: fotografia
        })
        res.json(buscarNuc1)
    } catch (error) {

        res.status(300).json({ message: error.message });
    }
}

export async function editar_maquina(req, res) {
    const { id } = req.params;
    try {
        const {
            Numero_unico_coljuegos,
            Numero_billetero,
            nombre_de_maquina,
            Numero_interno_maquina,
            Numero_serial_pantalla_superior,
            Numero_serial_pantalla_inferior,
            Marca_pantalla,
            Marca_maquina,
            Numero_cpu,
            ubicacion_de_la_maquina,
            libreria_maquina,
            cantidad_de_juegos,
            marca_billetero,
            lista_de_juegos,
            descripcion_maquina,
            fecha_instalaccion,
            fecha_modificacion,
            usuarioId
        } = req.body;
        const editar = await maquina.findByPk(id);

        editar.nombre_de_maquina = nombre_de_maquina,
            editar.Numero_billetero = Numero_billetero;
        editar.descripcion_maquina = descripcion_maquina;
        editar.Numero_unico_coljuegos = Numero_unico_coljuegos;
        // editar.N_billetero = N_billetero;
        // editar.ubicacion_del_elemento = ubicacion_del_elemento;
        // editar.fecha_instalaccion = fecha_instalaccion;

        // editar.certificado_de_importacion = certificado_de_importacion,
        //     editar.fotografia_de_maquina = fotografia_de_maquina,
        //     editar.Factura_compra = Factura_compra,
        //     editar.serial_modelo = serial_modelo,
            await editar.save();

        res.json(editar);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

export async function editar_maquina1(req, res) {
    const { Numero_serial } = req.params;

    try {
        const files = req.files;
        const {
         
            Numero_unico_coljuegos,
            Numero_billetero,
            nombre_de_maquina,
            Numero_interno_maquina,
            Numero_serial_pantalla_superior,
            Numero_serial_pantalla_inferior,
            Marca_pantalla,
            Marca_maquina,
            Numero_cpu,
            ubicacion_de_la_maquina,
            libreria_maquina,
            cantidad_de_juegos,
            marca_billetero,
            lista_de_juegos,
            descripcion_maquina,
            fecha_instalaccion,
            fecha_modificacion,
            usuarioId
        } = req.body;

        const editar_n = await maquina.update(
            {
                
               Numero_unico_coljuegos,
                Numero_billetero,
                nombre_de_maquina,
                Numero_interno_maquina,
                Numero_serial_pantalla_superior,
                Numero_serial_pantalla_inferior,
                Marca_pantalla,
                Marca_maquina,
                Numero_cpu,
                ubicacion_de_la_maquina,
                libreria_maquina,
                cantidad_de_juegos,
                marca_billetero,
                lista_de_juegos,
                descripcion_maquina,
                fecha_instalaccion,
                fecha_modificacion,
                usuarioId,
                // Actualiza la imagen si se proporciona una nueva.
            },

            {
                where: { Numero_serial},
                returning: true 
            }
        );

        if (editar_n[0] === 0) {
            return res.status(404).json({ success: false, message: "La máquina no fue encontrada" });
        }
        const maquinaId = editar_n[1][0].id; // Obtener el ID de la máquina actualizada


        const imagesData = {};
        for (const key in files) {
            const file = files[key][0];
            const imageData = await fs.promises.readFile(file.path);
            imagesData[key] = imageData;
        }


        // Crear la fotografía usando el maquinaId obtenido
        const fotografiaData = await fotografia.update(
            {
            fotografia_billetero: imagesData.fotografia_billetero,
            fotografia_serial_maquina: imagesData.fotografia_serial_maquina,
            fotografia_de_pantalla_superior: imagesData.fotografia_de_pantalla_superior,
            fotografia_de_pantalla_inferior: imagesData.fotografia_de_pantalla_inferior,
            fotografia_la_placa: imagesData.fotografia_la_placa,
            fotografia_la_cpu: imagesData.fotografia_la_cpu,
            fotografia_la_maquina: imagesData.fotografia_la_maquina,
            fotografia_la_libreria: imagesData.fotografia_la_libreria,
            fotografia_la_compra_maquina: imagesData.fotografia_la_compra_maquina,
            fotografia_la_importacion_maquina: imagesData.fotografia_la_importacion_maquina,
            fotografia_la_importacion_billetero: imagesData.fotografia_la_importacion_billetero,
            fotografia_la_serial_billetero: imagesData.fotografia_la_serial_billetero,
            fotografia_la_importacion_pantallas: imagesData.fotografia_la_importacion_pantallas,
            fotografia_la_serial_pantallas: imagesData.fotografia_la_serial_pantallas,
            fotografia_la_importacion_cpu: imagesData.fotografia_la_importacion_cpu,
            fotografia_la_serial_cpu: imagesData.fotografia_la_serial_cpu,
            usuarioId,
            maquinaId
        },
        {
            where: {
                maquinaId
            }
        }
        
        );

        // res.json(editar_n);
        res.status(201).json({ fotografiaData, editar_n });
      console.log(editar_n);

    } catch (error) {
        console.error(error);
    }
}