import { Router } from "express";
import { crear, mirar } from "../controller/auth/registro.js";
import { validar } from "../middleware/validertoken.js";
const router = Router();
router.post('/registro', crear);
router.get('/registro', mirar);

//Respuestas HTTP CORS
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
export default router;