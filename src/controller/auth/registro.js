import bcryptjs from "bcryptjs";
import { usuarios } from "../../model/usuariosMODEL.js";
import { creartoken } from "../../libs/jtw.js";


export async function crear(req, res) {
    try {
        const { email, password,
            ubicacion_del_elemento,
            rol
        } = req.body

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


        const haspassword = await bcryptjs.hash(password, 9)
        const creo = await usuarios.create({
            email,
            password: haspassword,
            ubicacion_del_elemento,
            rol, // Assign a default role here, adjust as needed

        })

     

        // await creo.setRol(rolExistente);
        const userSaved = creo.save()
        const token = await creartoken({
            id: userSaved._id,
            // userId: user.id,
            ubicacion_del_elemento: userSaved.ubicacion_del_elemento,
            rol: userSaved.rol,
        })
        res.cookie('token', token,)
        res.json(creo)
    } catch (error) {
        // console.log(error);
        res.status(301).json({ message: error.message })
    }
}
export async function mirar(req, res) {
    try {
        const people = await usuarios.findAll(

        )
        res.json(people);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}


export async function verifytoken(req, res) {
    const { token } = req.cookies
    if (!token)
        return res.status(400).json({ message: ' not authorization' })


    jwt.verify(token, 'token', async (err, usuarios) => {
        if (err) return res.status(500).json({ message: 'authorization' })

        const userFound = await usuarios.findAll(usuarios.id)
        if (!userFound) return res.status(404).json({ message: 'unauthorized' })
    })
    return res.json({
        id: userFound.id,
        email: userFound.email,
        ubicacion_del_elemento: userFound.ubicacion_del_elemento,
        rol:userFound.rol,
        message: "Bienvenido",
    })


}



