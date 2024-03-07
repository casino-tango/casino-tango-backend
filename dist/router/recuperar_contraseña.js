import { Router } from "express";
import { ActualizarContrasena, recuperar } from "../controller/auth/recuperar_contraseña.js";
const router = Router();
router.post('/recuperar', recuperar);
router.patch('/actualizar/:email', ActualizarContrasena);
//Respuestas HTTP CORS
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
export default router;