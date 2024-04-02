import { maquina } from "../../model/maquinasMODEL.js";
import { fotografia } from "../../model/fotografiasMODEL.js";
import { usuarios } from '../../model/usuariosMODEL.js';

import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);

import nodemailer from 'nodemailer';


export async function mirar(req, res) {
    try {
        const datos = await maquina.findAll(
            {
                include: [{
                    model: fotografia,
                    attributes: ['fotografia_la_maquina',]
                }]
            }
        );
        res.json(datos);
    } catch (error) {
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
        const { Numero_serial } = req.params
        await maquina.destroy({
            where: {
                Numero_serial: Numero_serial
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

export async function mirar_maquina_ubiccacion(req, res) {
    const { ubicacion_de_la_maquina } = req.params
    try {
        const buscarid = await maquina.findAll({
            where: { ubicacion_de_la_maquina: ubicacion_de_la_maquina, },
            // include: fotografia
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
            fecha_modificacion,
            usuarioId
        } = req.body;

        const maquinaAntesDeEditar = await maquina.findOne({ where: { Numero_serial } });
        const valoresOriginales = maquinaAntesDeEditar.toJSON();

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
                fecha_modificacion,
                usuarioId,
                // Actualiza la imagen si se proporciona una nueva.
            },
            {
                where: { Numero_serial },
                returning: true
            }


        );

        const imagesData = {};

        for (const key in files) {
            const file = files[key][0];
            const imageData = await fs.promises.readFile(file.path);
            imagesData[key] = imageData;
        }
        const maquinaId = editar_n[1][0].id; // Obtener el ID de la máquina actualizada

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

        if (editar_n[0] === 0) {
            return res.status(404).json({ success: false, message: "La máquina no fue encontrada" });
        }


        const maquinaDespuesDeEditar = await maquina.findByPk(editar_n[1][0].id);
        const nuevosValores = maquinaDespuesDeEditar.toJSON();

        delete valoresOriginales.fecha_modificacion;

        // Compara los valores originales con los nuevos valores para determinar qué campos se editaron
        const camposEditados = [];
        for (const key in nuevosValores) {
            if (valoresOriginales[key] !== nuevosValores[key]) {
                camposEditados.push({ campo: key, valorAntiguo: valoresOriginales[key], valorNuevo: nuevosValores[key] });
            }
        }

        // Ensure camposEditados is an array before passing it to generateAlertEmailContent
        if (!Array.isArray(camposEditados)) {
            console.error("camposEditados is not an array:", camposEditados);
            return res.status(500).json({ success: false, message: "Ha ocurrido un error al editar la máquina" });
        }

        // Genera el contenido del correo electrónico de alerta con los datos originales y editados
        const emailContent = generateAlertEmailContent(Numero_serial, camposEditados);
        await sendAlertEmail(emailContent);

        res.status(201).json({ editar_n, fotografiaData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Ha ocurrido un error al editar la máquina" });
    }
}


function generateAlertEmailContent(Numero_serial, camposEditados) {
    let content = `
    <p>Hemos recibido una solicitud de cambio de componentes de la máquina: ${Numero_serial} </p>
    <p>Se han editado los siguientes campos:</p>
    <table style="border-collapse: collapse; width: 100%;">
        <tr>
            <th style="border: 1px solid black; padding: 8px;">Campo</th>
            <th style="border: 1px solid black; padding: 8px;">Valor Antiguo</th>
            <th style="border: 1px solid black; padding: 8px;">Valor Nuevo</th>
        </tr>
    `;
    camposEditados.forEach((campo) => {
        content += `
        <tr>
            <td style="border: 1px solid black; padding: 8px;">${campo.campo}</td>
            <td style="border: 1px solid black; padding: 8px;">${campo.valorAntiguo}</td>
            <td style="border: 1px solid black; padding: 8px;">${campo.valorNuevo}</td>
        </tr>
        `;
    });
    content += `</table>`;
    return content;
}

async function sendAlertEmail(content) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'unicasinosdecombiasa@gmail.com',
                pass: 'xjvq rioc tuvc enuk  ',
            }
        });

        const message = {
            from: 'unicasinosdecombiasa@gmail.com',
            to: process.env.user,
            subject: 'Alerta: Máquina editada',
            html: `
            <body>
    
      <center>        
         <a href="https://imgur.com/jRwKYu7"><img src="https://imgur.com/jRwKYu7.png"style="center" width="200px" alt="Imagen adjunta" /></a>
        
    
         <h2>Alerta de modificacion de los  componentes de la maquina</h2>

         <h1><strong>
         ${content}</strong></h1>
          <i>
         
         <p>Gracias,</p>
        <p>unicasinos de colombia S.A</p</i> 
        </body>`,
        };

        const info = await transporter.sendMail(message);
        console.log('Correo electrónico de alerta enviado:');
    } catch (error) {
        console.error('Error al enviar el correo electrónico de alerta:', error);
    }
}
