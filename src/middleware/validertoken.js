import jwt from "jsonwebtoken";
const TOKEN_SECRET=process.env.TOKEN_SECRET


export const validar = (req, res, next) => {

    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: 'No has iniciado sesion' })
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'token invalido' })
        
        req.user = user;
        next();n
    })
}