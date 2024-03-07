import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { usuarios } from "../../model/usuariosMODEL.js";
export async function login(req, res) {
  try {
    const {
      email,
      password,
      ubicacion_de_la_maquina
    } = req.body;
    const user = await usuarios.findOne({
      //PROMESA PARA BUSCAR LAS CONDICIONES COMO EL EMAIL O CONTRASEÑA
      where: {
        email,
        ubicacion_de_la_maquina
      }
    });
    if (!user) {
      res.status(200).json({
        icon: "error",
        message: "Ingrese tu emial correcto  y tu ubicacion correctamente  "
      });
    } else {
      const passHash = await bcryptjs.compare(password, user.password); //SE UTILIZA LA FUNCION COMPARE DE LA BIBLIOTECA DE BCRYPTJS PARA COMPARA LA CONTRASEÑA
      //RESPUESTAS EN CASO DE ERROR SI NO COINCIDE EL TOKEN
      if (!passHash) {
        res.status(200).json({
          message: "Contraseña incorrecta"
        });
        //ESTA RESPUESTA SE DA CUANDO EL TOKEN DE ACCESO COINCIDE
      } else {
        const token = jwt.sign({
          userId: user.id
        }, "mysecretkey", {
          expiresIn: "2h"
        });
        res.cookie("token", token, {
          httOnly: true,
          maxAge: 2 * 60 * 60 * 100
        });
        res.status(200).json({
          code: 201,
          token,
          message: "Bienvenido"
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Algo salió mal con el servidor"
    });
    console.log(error);
  }
}
;
export async function logout(req, res) {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "session cerrada correctamete "
    });
    console.log("session cerrada correctamete ");
  } catch (error) {
    res.status(500).json({
      message: "Algo salió mal con el servidor"
    });
  }
}