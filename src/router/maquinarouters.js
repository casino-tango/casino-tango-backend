import { Router } from "express";
import {
  mirar,
  crear,
  eliminarmaquina_N_serial,
  buscar_serial,
  eliminarmaquina_id,
  editar_maquina1,
  mirar_maquina_ubiccacion
} from "../controller/maquina/maquinacontroller.js";
import multer from 'multer';
import cron from 'node-cron';
import { validar2 } from "../middleware/validertoken.js";

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'; // Import the 'fs' module

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
const publicPath = path.join(__dirname, '../public');
const storage = multer({ dest: publicPath });
const upload = multer({ storage });
const router = Router();


// Nombres de campos como constantes

const camposDeArchivos = [
  { name: 'fotografia_billetero' },
  { name: 'fotografia_serial_maquina' },
  { name: 'fotografia_de_pantalla_superior' },
  { name: 'fotografia_de_pantalla_inferior' },
  { name: 'fotografia_la_placa' },
  { name: 'fotografia_la_cpu' },
  { name: 'fotografia_la_maquina' },
  { name: 'fotografia_la_libreria' },
  { name: 'fotografia_la_compra_maquina' },
  { name: 'fotografia_la_importacion_maquina' },
  { name: 'fotografia_la_importacion_billetero' },
  { name: 'fotografia_la_serial_billetero' },
  { name: 'fotografia_la_importacion_pantallas' },
  { name: 'fotografia_la_serial_pantallas' },
  { name: 'fotografia_la_importacion_cpu' },
  { name: 'fotografia_la_serial_cpu' },
];

const camposDeArchivos_editados = [
  { name: 'fotografia_billetero' },
  { name: 'fotografia_serial_maquina' },
  { name: 'fotografia_de_pantalla_superior' },
  { name: 'fotografia_de_pantalla_inferior' },
  { name: 'fotografia_la_placa' },
  { name: 'fotografia_la_cpu' },
  { name: 'fotografia_la_maquina' },
  { name: 'fotografia_la_libreria' },
  { name: 'fotografia_la_compra_maquina' },
  { name: 'fotografia_la_importacion_maquina' },
  { name: 'fotografia_la_importacion_billetero' },
  { name: 'fotografia_la_serial_billetero' },
  { name: 'fotografia_la_importacion_pantallas' },
  { name: 'fotografia_la_serial_pantallas' },
  { name: 'fotografia_la_importacion_cpu' },
  { name: 'fotografia_la_serial_cpu' },
];

router.post('/maquinas',validar2, storage.fields(camposDeArchivos), crear)
router.get('/maquinas',validar2, mirar)

router.delete('/maquinas/:Numero_serial',validar2, eliminarmaquina_N_serial);
router.delete('/maquina/:id',validar2, eliminarmaquina_id);

router.get('/maquina/:ubicacion_del_elemento', mirar_maquina_ubiccacion);
router.get('/maquinas/:Numero_serial',validar2, buscar_serial);

router.put('/maquinas/:Numero_serial',storage.fields(camposDeArchivos_editados), editar_maquina1);


cron.schedule('* * * * *', () => {
  // Lógica para eliminar archivos en el directorio público
  fs.readdir(publicPath, (err, files) => {
    if (err) {
      console.error('Error al leer el directorio:', err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(publicPath, file);
      fs.unlink(filePath, err => {
        if (err) {
          console.error('Error al eliminar el archivo:', err);
          return;
        }
        console.log('Archivo eliminado:');
      });
    });
  });
});

//Respuestas HTTP CORS
// router.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', 'true'); // This allows credentials like cookies to be sent with the request
//   next();
// });


export default router