import { Router } from "express";
import {
  buscar,
  buscarNuc1,
  crear,
  editar_ruleta,
  editar_ruleta_serial,
  eliminar,
  eliminar1,
  eliminarNuc,
  mirar
} from "../controller/ruleta/ruletaControler.js";


//import  validar para proteger la rutas q solo el user con token puede hacer el crud
// import { validar } from "../middleware/validertoken.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'; // Import the 'fs' module
// import { validar } from "../middleware/validertoken.js";

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
const publicPath = path.join(__dirname, '../public');

const storage = multer({ dest: publicPath });
const upload = multer({ storage });
const router = Router();

// const filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(filename);
// const storage =  multer({dest: '/public'});
// const upload = multer({ storage });
// const router = Router();

const camposdeImg = [
  { name: 'Factura_compra_ruleta' },
  { name: 'certificado_de_importacion_ruleta' },
  { name: 'fotografia_de_ruleta' },
  { name: 'serial_modelo_ruleta' },
  { name: 'fotografia_de_respaldo' },
]

const camposdeImg_editados = [
  { name: 'Factura_compra_ruleta' },
  { name: 'certificado_de_importacion_ruleta' },
  { name: 'fotografia_de_ruleta' },
  { name: 'serial_modelo_ruleta' },
]
router.post('/ruletas', storage.fields(camposdeImg), crear)
router.get('/ruleta7s/:N_serial', buscar)
router.get('/ruletass/:Nuc_1', buscarNuc1)
router.get('/ruletas',mirar)
router.delete('/ruleta/:id', eliminar)
router.delete('/ruletas/:N_serial', eliminar1)
router.delete('/ruletass/:Nuc_1', eliminarNuc)
router.put('/ruleta/:id', editar_ruleta)
router.put('/ruletas/:N_serial', storage.fields(camposdeImg_editados), editar_ruleta_serial)



//Respuestas HTTP CORS
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

export default router