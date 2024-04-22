import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { usuarios } from "../../model/usuariosMODEL.js";

export async function login(req, res) {
    try {
        const { email, password,
            ubicacion_del_elemento,
            rol
        } = req.body;
        const user = await usuarios.findOne({
            //PROMESA PARA BUSCAR LAS CONDICIONES COMO EL EMAIL O CONTRASEÑA
            where: { email, rol, ubicacion_del_elemento }
        });



        if (!user) {
            res.status(301).json({ icon: "error", message: "Ingresa tu correo electrónico v ", });
            console.log("Ingresa tu correo electrónico ");
        }
        
        else {
            const passHash = await bcryptjs.compare(password, user.password); //SE UTILIZA LA FUNCION COMPARE DE LA BIBLIOTECA DE BCRYPTJS PARA COMPARA LA CONTRASEÑA
            //RESPUESTAS EN CASO DE ERROR SI NO COINCIDE EL TOKEN
            if (!passHash) {
                res.status(300).json({ message: "Contraseña incorrecta", });
                console.log("contraseña incorrecta");
            } else {
                const token = jwt.sign({
                    userId: user.id,
                    nombre: user.nombre,
                    ubicacion_del_elemento: user.ubicacion_del_elemento,
                    rol: user.rol,
                }, "mysecretkey", {

                    expiresIn: "2h",
                });
                res.cookie("token", token, {
                    httOnly: true,
                    maxAge:+ 2 * 60 * 60 * 100
                })
                res.status(200).json({
                    code: 201,
                    token,
                    message: "Bienvenido",
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Algo salió mal con el servidor",
        });
        console.log(error);
    }
};


export async function logout(req, res) {
    try {
        res.clearCookie("token");

        res.status(200).json({
            message: "session cerrada correctamete ",
        });
        console.log("session cerrada correctamete ");

    } catch (error) {
        res.status(500).json({
            message: "Algo salió mal con el servidor",
        });

    }
}