import jwt from "jsonwebtoken";
const TOKEN_SECRET = process.env.TOKEN_SECRET

// export const validar = (req, res, next) => {
//     try {

//         const { token } = req.cookies;
//         if (!token) {
//             return res.status(401).json({ message: 'No has iniciado sesion' })
//         }
//         jwt.verify(token,'mysecretkey' ,(error, user) => {

//             if (error) return res.status(403).json({ message: 'token invalido' })
//             req.user = user;
//             next();
//         })
//     } catch (error) {
//         return res.status(500).json({ message: error.message });

//     }
// }


// export const validar2 = (req, res, next) => {
//     try {
//         const { token } = req.cookies;
//         if (!token) {
//             return res.status(401).json({ message: 'No has iniciado sesión' });
//         }

//         jwt.verify(token, 'mysecretkey', (error, user) => {
//             if (error) return res.status(403).json({ message: 'Token inválido' });

//             req.user = user;

//             // Verificar el rol del usuario
//             if (user.rol === 'Admin') {
//                 // Si es administrador, permitir el acceso
//                 next();
//             } else {
//                 // Si no es administrador, devolver un error de acceso denegado
//                 return res.status(403).json({ message: 'Acceso denegado. No eres administrador.' });
//             }
//         });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };


export const validar2 = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log('No has iniciado sesión');

            return res.status(401).json({ message: 'No has iniciado sesión' });
        }

        jwt.verify(token, 'mysecretkey', (error, user) => {
            if (error) {
                console.error('Error al verificar el token:', error);
                return res.status(403).json({ message: 'Token inválido' });
            }

            req.user = user;

            if (user.rol === 'Admin' && (req.method === 'POST' || req.method === 'GET' || req.method === 'DELETE' || req.method === 'PUT')) {
                // Si es administrador y la solicitud es POST o DELETE, permitir el acceso
                next();
            } else if (user.rol === 'Usuario' && req.method === 'GET') {
                // Si es usuario normal y la solicitud es GET, permitir el acceso
                next();
            } else {
                // En cualquier otro caso, devolver un error de acceso denegado
                return res.status(403).json({ message: 'Acceso denegado. No tienes permiso para realizar esta acción.' });
            }
        });
    } catch (error) {
        console.error('Error en el middleware de validación:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};
