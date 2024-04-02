import { ruleta } from "../../model/ruletasMODEL.js";
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);


//mirar todas las ruleta
export async function mirar(req, res) {
    try {
        const ruletas = await ruleta.findAll(
            {
                attributes: {
                    exclude: [
                        'certificado_de_importacion_ruleta',                       
                        'Factura_compra_ruleta',
                        'serial_modelo_ruleta',
                        'fotografia_de_respaldo',
                        'fotografia_de_placa',
                        'fotografia_de_billetero',
                    ],
                }
            }

        )
        res.json(ruletas)
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);

    }
}
//creaer por ruleta
export async function crear(req, res) {
    try {

        const files = req.files;
        const {
            //numeor de seriales
            Numero_serial,
            Numero_serial_pantalla_1,
            Numero_serial_pantalla_2,
            Numero_serial_pantalla_3,
            Numero_serial_pantalla_4,
            Numero_serial_pantalla_5,
            Numero_serial_pantalla_6,
            Numero_serial_pantalla_7,
            Numero_serial_pantalla_8,
            Numero_serial_pantalla_9,
            Numero_serial_pantalla_10,
            //billeteros
            Numero_billetero_1,
            Numero_billetero_2,
            Numero_billetero_3,
            Numero_billetero_4,
            Numero_billetero_5,
            Numero_billetero_6,
            Numero_billetero_7,
            Numero_billetero_8,
            Numero_billetero_9,
            Numero_billetero_10,
            //stacker
            Numero_stacker_1,
            Numero_stacker_2,
            Numero_stacker_3,
            Numero_stacker_4,
            Numero_stacker_5,
            Numero_stacker_6,
            Numero_stacker_7,
            Numero_stacker_8,
            Numero_stacker_9,
            Numero_stacker_10,
            //demas datos 
            Nombre_de_ruleta,
            marca_del_billetero,
            Numero_modulos,
            Marca_ruleta,
            Description,
            Pantalla,
            ubicacion_del_elemento,
            fecha_instalaccion_ruleta,
            fecha_modificacion,

            //nummero unico de coljuegos


            Numero_unico_coljuegos_1,
            Numero_unico_coljuegos_2,
            Numero_unico_coljuegos_3,
            Numero_unico_coljuegos_4,
            Numero_unico_coljuegos_5,
            Numero_unico_coljuegos_6,
            Numero_unico_coljuegos_7,
            Numero_unico_coljuegos_8,
            Numero_unico_coljuegos_9,
            Numero_unico_coljuegos_10,
            usuarioId
        } = req.body;

        const imagesData = {};

        for (const key in files) {
            const file = files[key][0];
            const imageData = await fs.promises.readFile(file.path);
            imagesData[key] = imageData;
        }
        const ruletas = await ruleta.create({

            //numeor de seriales
            Numero_serial,
            Numero_serial_pantalla_1,
            Numero_serial_pantalla_2,
            Numero_serial_pantalla_3,
            Numero_serial_pantalla_4,
            Numero_serial_pantalla_5,
            Numero_serial_pantalla_6,
            Numero_serial_pantalla_7,
            Numero_serial_pantalla_8,
            Numero_serial_pantalla_9,
            Numero_serial_pantalla_10,
            //billeteros
            Numero_billetero_1,
            Numero_billetero_2,
            Numero_billetero_3,
            Numero_billetero_4,
            Numero_billetero_5,
            Numero_billetero_6,
            Numero_billetero_7,
            Numero_billetero_8,
            Numero_billetero_9,
            Numero_billetero_10,
            //stacker
            Numero_stacker_1,
            Numero_stacker_2,
            Numero_stacker_3,
            Numero_stacker_4,
            Numero_stacker_5,
            Numero_stacker_6,
            Numero_stacker_7,
            Numero_stacker_8,
            Numero_stacker_9,
            Numero_stacker_10,
            //demas datos 
            Nombre_de_ruleta,
            marca_del_billetero,
            Numero_modulos,
            Marca_ruleta,
            Description,
            Pantalla,
            ubicacion_del_elemento,
            fecha_instalaccion_ruleta,
            fecha_modificacion,

            //nummero unico de coljuegos


            Numero_unico_coljuegos_1,
            Numero_unico_coljuegos_2,
            Numero_unico_coljuegos_3,
            Numero_unico_coljuegos_4,
            Numero_unico_coljuegos_5,
            Numero_unico_coljuegos_6,
            Numero_unico_coljuegos_7,
            Numero_unico_coljuegos_8,
            Numero_unico_coljuegos_9,
            Numero_unico_coljuegos_10,
            usuarioId,
            //fotos
            certificado_de_importacion_ruleta: imagesData.certificado_de_importacion_ruleta,
            fotografia_de_ruleta: imagesData.fotografia_de_ruleta,
            Factura_compra_ruleta: imagesData.Factura_compra_ruleta,
            serial_modelo_ruleta: imagesData.serial_modelo_ruleta,
            fotografia_de_respaldo: imagesData.fotografia_de_respaldo,
            fotografia_de_placa: imagesData.fotografia_de_placa,
            fotografia_de_billetero: imagesData.fotografia_de_billetero




        });

        res.status(201).json(ruletas);
    } catch (error) {
        console.log(error);// Log the error message
        res.status(500).json({ message: error.message });
    }
}
//eliminar ruleta
export async function eliminar(req, res) {

    try {
        const { id } = req.params
        const eliminado = await ruleta.destroy({
            where:
            {
                id: id
            }
        })
        // res.status(201).json(eiliminado);
        // return res.status(200).json({eiliminado})
        return res.status(200).json({ message: 'la ruleta se a eliminado correctamente' })

    } catch (error) {
        res.status(300).json({ message: error.message });
    }
}
export async function eliminar1(req, res) {

    try {
        const { Numero_serial } = req.params
        await ruleta.destroy({
            where: {
                Numero_serial: Numero_serial
            }
        })
        return res.status(200).json({ message: 'maquina eliminad correctamente' });

    } catch (error) {

        console.log(error);
        res.status(300).json({ message: error.message });

    }
}
export async function mirar_ruleta_ubiccacion(req, res) {
    const { ubicacion_del_elemento } = req.params
    try {
        const buscarid = await ruleta.findAll({
            where: { ubicacion_del_elemento: ubicacion_del_elemento, },
            attributes: {
                exclude: [
                    'certificado_de_importacion_ruleta',
                    'fotografia_de_ruleta',
                    'Factura_compra_ruleta',
                    'serial_modelo_ruleta',
                    'fotografia_de_respaldo',
                    'fotografia_de_placa',
                    'fotografia_de_billetero',


                ],
            }
            // include: fotografia

        })
        res.json(buscarid)
    } catch (error) {
        res.status(300).json({ message: error.message });

    }

}



//buscar
export async function buscar(req, res) {
    const { Numero_serial } = req.params
    try {
        const buscar_serial = await ruleta.findOne({
            where: {
                Numero_serial: Numero_serial
            }
        })
        res.json(buscar_serial)
    } catch (error) {
        // console.log(error);
        res.status(300).json({ message: error.message });

    }
}
export async function buscarNuc1(req, res) {
    const { Nuc_1 } = req.params
    try {
        const buscarNuc = await ruleta.findOne({
            where: { Nuc_1: Nuc_1 }
        })
        res.json(buscarNuc)
    } catch (error) {
        res.status(300).json({ message: error.message });
    }
}
export async function editar_ruleta(req, res) {
    const { id } = req.params
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
            nombre_de_ruleta,
            // N_modulos,
            // Marca,
            // Description,
            // Pantalla,
            // ubicacion_del_elemento,
            // fecha_instalaccion_ruleta,
            //fotos
        } = req.body;
        const editar = await ruleta.findByPk(id)
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
        console.log(error);// Log the error message
        res.status(500).json({ message: error.message });
    }
}

export async function editar_ruleta_serial(req, res) {
    const { Numero_serial_ruleta } = req.params
    const files = req.files;

    try {
        const {
            //numeor de seriales
            Numero_serial_ruleta,
            Numero_serial_pantalla_1,
            Numero_serial_pantalla_2,
            Numero_serial_pantalla_3,
            Numero_serial_pantalla_4,
            Numero_serial_pantalla_5,
            Numero_serial_pantalla_6,
            Numero_serial_pantalla_7,
            Numero_serial_pantalla_8,
            Numero_serial_pantalla_9,
            Numero_serial_pantalla_10,
            //billeteros
            Numero_billetero_1,
            Numero_billetero_2,
            Numero_billetero_3,
            Numero_billetero_4,
            Numero_billetero_5,
            Numero_billetero_6,
            Numero_billetero_7,
            Numero_billetero_8,
            Numero_billetero_9,
            Numero_billetero_10,
            //stacker
            Numero_stacker_1,
            Numero_stacker_2,
            Numero_stacker_3,
            Numero_stacker_4,
            Numero_stacker_5,
            Numero_stacker_6,
            Numero_stacker_7,
            Numero_stacker_8,
            Numero_stacker_9,
            Numero_stacker_10,
            //demas datos 
            Nombre_de_ruleta,
            marca_del_billetero,
            Numero_modulos,
            Marca_ruleta,
            Description,
            Pantalla,
            ubicacion_del_elemento,
            fecha_instalaccion_ruleta,
            fecha_modificacion,

            //nummero unico de coljuegos


            Numero_unico_coljuegos_1,
            Numero_unico_coljuegos_2,
            Numero_unico_coljuegos_3,
            Numero_unico_coljuegos_4,
            Numero_unico_coljuegos_5,
            Numero_unico_coljuegos_6,
            Numero_unico_coljuegos_7,
            Numero_unico_coljuegos_8,
            Numero_unico_coljuegos_9,
            Numero_unico_coljuegos_10,
            usuarioId
        } = req.body;

        const imagesData = {};
        for (const key in files) {
            const file = files[key][0];
            const imageData = await fs.promises.readFile(file.path);
            imagesData[key] = imageData;
        }

        const [editar_serial] = await ruleta.update(
            {

                //numeor de seriales
                Numero_serial_ruleta,
                Numero_serial_pantalla_1,
                Numero_serial_pantalla_2,
                Numero_serial_pantalla_3,
                Numero_serial_pantalla_4,
                Numero_serial_pantalla_5,
                Numero_serial_pantalla_6,
                Numero_serial_pantalla_7,
                Numero_serial_pantalla_8,
                Numero_serial_pantalla_9,
                Numero_serial_pantalla_10,
                //billeteros
                Numero_billetero_1,
                Numero_billetero_2,
                Numero_billetero_3,
                Numero_billetero_4,
                Numero_billetero_5,
                Numero_billetero_6,
                Numero_billetero_7,
                Numero_billetero_8,
                Numero_billetero_9,
                Numero_billetero_10,
                //stacker
                Numero_stacker_1,
                Numero_stacker_2,
                Numero_stacker_3,
                Numero_stacker_4,
                Numero_stacker_5,
                Numero_stacker_6,
                Numero_stacker_7,
                Numero_stacker_8,
                Numero_stacker_9,
                Numero_stacker_10,
                //demas datos 
                Nombre_de_ruleta,
                marca_del_billetero,
                Numero_modulos,
                Marca_ruleta,
                Description,
                Pantalla,
                ubicacion_del_elemento,
                fecha_instalaccion_ruleta,
                fecha_modificacion,

                //nummero unico de coljuegos


                Numero_unico_coljuegos_1,
                Numero_unico_coljuegos_2,
                Numero_unico_coljuegos_3,
                Numero_unico_coljuegos_4,
                Numero_unico_coljuegos_5,
                Numero_unico_coljuegos_6,
                Numero_unico_coljuegos_7,
                Numero_unico_coljuegos_8,
                Numero_unico_coljuegos_9,
                Numero_unico_coljuegos_10,
                usuarioId,
                // //fotos
                certificado_de_importacion_ruleta: imagesData.certificado_de_importacion_ruleta,
                fotografia_de_ruleta: imagesData.fotografia_de_ruleta,
                Factura_compra_ruleta: imagesData.Factura_compra_ruleta,
                serial_modelo_ruleta: imagesData.serial_modelo_ruleta,
                fotografia_de_respaldo: imagesData.fotografia_de_respaldo

            },
            {
                where: { Numero_serial }

            }
        );

        if (editar_serial === 0) {
            return res.status(404).json({ message: 'No se encuentra un número de serial' });
        }

        res.json(req.filea);
    } catch (error) {
        console.log(error);// Log the error message
        res.status(500).json({ message: error.message });
    }
}
