import { Router } from "express";
import {
  crear,
  mirar,
  verifytoken
} from "../controller/auth/registro.js";
import { validar2 } from "../middleware/validertoken.js";

const router = Router()
router.post('/registro', crear)
router.get('/registro', validar2, mirar)


router.get('veify', verifytoken)

// Respuestas HTTP CORS
// router.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', 'true'); // This allows credentials like cookies to be sent with the request
//   next();
// });

export default router
