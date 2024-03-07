import { Router } from "express";
import { login, logout } from "../controller/auth/login.js";
const router = Router();
router.post('/login', login);
router.post('/logout', logout);

//Respuestas HTTP CORS
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
export default router;