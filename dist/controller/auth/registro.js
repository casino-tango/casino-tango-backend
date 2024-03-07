import bcryptjs from "bcryptjs";
import { usuarios } from "../../model/usuariosMODEL.js";
import maquina from "../../model/maquinasMODEL.js";
import { creartoken } from "../../libs/jtw.js";
export async function crear(req, res) {
  try {
    const {
      email,
      password,
      ubicacion_de_la_maquina
    } = req.body;

    // Validar si correo es una dirección de email válida
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("El campo correo debe ser una dirección de email válida");
    }

    // Verificar el dominio del correo electrónico permitido
    const allowedDomains = ["gmail.com", "@yahoo.com"]; // Coloca aquí los dominios permitidos
    const domain = email.split("@")[1]; // Obtener el dominio del correo electrónico
    if (!allowedDomains.includes(domain)) {
      throw new Error("El dominio del correo electrónico no está permitido");
    }
    if (password.length < 0 || password.length > 9) {
      throw new Error("La contraseña debe tener entre 0 y 9 caracteres");
    }
    const haspassword = await bcryptjs.hash(password, 9);
    const creo = await usuarios.create({
      email,
      password: haspassword,
      ubicacion_de_la_maquina
    });
    // res.cookie('token', token,)
    const userSaved = creo.save();
    const token = await creartoken({
      id: userSaved._id
    });
    res.cookie('token', token);
    res.json(creo);
  } catch (error) {
    console.log(error);
    // res.status(301).json({ message: error.message })
  }
}

export async function mirar(req, res) {
  try {
    const people = await usuarios.findAll();
    res.json(people);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
}