import { Router } from "express";
import {
  buscar,
  crear,
  editar_ruleta,
  editar_ruleta_serial,
  eliminar,
  eliminar1,
  mirar,
  mirar_ruleta_ubiccacion
} from "../controller/ruleta/ruletaControler.js";


//import  validar para proteger la rutas q solo el user con token puede hacer el crud
// import { validar } from "../middleware/validertoken.js";

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { validar2 } from "../middleware/validertoken.js";



const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
const publicPath = path.join(__dirname, '../public');

const storage = multer({ dest: publicPath });
const upload = multer({ storage });
const router = Router();


const camposdeImg = [
  { name: 'Factura_compra_ruleta' },
  { name: 'certificado_de_importacion_ruleta' },
  { name: 'fotografia_de_ruleta' },
  { name: 'serial_modelo_ruleta' },
  { name: 'fotografia_de_respaldo' },
  { name: 'fotografia_de_placa' },
  { name: 'fotografia_de_billetero' }
]

const camposdeImg_editados = [
  { name: 'Factura_compra_ruleta' },
  { name: 'certificado_de_importacion_ruleta' },
  { name: 'fotografia_de_ruleta' },
  { name: 'serial_modelo_ruleta' },
  { name: 'fotografia_de_placa' },
  { name: 'fotografia_de_billetero' }
]
router.post('/ruletas', validar2, storage.fields(camposdeImg), crear)
router.get('/ruletas/:Numero_serial', validar2, buscar)

router.get('/ruletas', validar2, mirar)

router.delete('/ruleta/:id', eliminar)

router.delete('/ruletas/:Numero_serial', validar2, eliminar1)

router.put('/ruleta2/:id', validar2, editar_ruleta)

router.put('/ruletas/:Numero_serial', validar2, storage.fields(camposdeImg_editados), editar_ruleta_serial)

router.get('/ruleta/:ubicacion_del_elemento', mirar_ruleta_ubiccacion)


//Respuestas HTTP CORS
// router.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });

export default router