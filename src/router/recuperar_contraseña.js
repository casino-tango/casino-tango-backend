import { Router } from "express";
import { ActualizarContrasena, recuperar } from "../controller/auth/recuperar_contraseña.js";

const router = Router()

router.post('/recuperar', recuperar)
router.patch('/actualizar/:email', ActualizarContrasena)
//Respuestas HTTP CORS
// router.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', 'true'); // This allows credentials like cookies to be sent with the request
//   next();
//   });
export default router