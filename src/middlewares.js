import  jwt from "jsonwebtoken";

export const verificarJwt = (req, res, next)=>{
 const token = req.body.token;
 if(!token){
    return res.status(400).send({message:'No existe el token'})
 }
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded)=>{
    if(error){
        return res.status(400).send({message:'Token invalido'})
    }
    console.log('Estoy verificado', decoded)
    next();
  })
}