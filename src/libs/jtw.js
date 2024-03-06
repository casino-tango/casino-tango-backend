import  jtw  from "jsonwebtoken"; 
const TOKEN_SECRET =process.env.TOKEN_SECRET

export function creartoken(payload) {

 return new Promise((resolve,reject)=>{

jtw.sign(
    payload,
    process.env.TOKEN_SECRET,
    {
        expiresIn: "1d"
    },
    (err, token) => {
        if(err) 
        reject(err);
    resolve(token);

    }
)
})
}