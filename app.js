import express from "express";
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json())
import cors from 'cors'
app.use(cors({
    origin: 'http://localhost:3001', // Permite solicitudes solo desde este origen
    // origin:'https://proyecto-final-uh4h.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite estos métodos HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Permite estos encabezados en la solicitud
    credentials: true // Esto permite que las credenciales como las cookies se envíen con la solicitud
  }));



import morgan from "morgan";

// // impor de cookis

app.use(cookieParser());

app.use(morgan(('dev')))

//ruta de el registro
import registroroute from "./src/router/registrorouter.js";
app.use('/api', registroroute)

//ruta de la maquina
import maquinarouters from "./src/router/maquinarouters.js";
app.use('/api', maquinarouters)

import ruletaroute from "./src/router/ruletarouter.js";
app.use('/api', ruletaroute)

//ruta de  login
import loginrouterroute from "./src/router/loginrouter.js";
app.use('/api', loginrouterroute)

//ruta de restablecer pasword
import contraseñaroute from "./src/router/recuperar_contraseña.js";
app.use('/api', contraseñaroute)






export default app;