const Usuario=require('../models/Usuario')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');



exports.nuevoUsuario = async (req, res, next) => {

    
    const usuario = new Usuario(req.body);
    usuario.password=await bcrypt.hash(req.body.password,12)
    try {        
        // almacenar el registro
        await usuario.save();
        res.json({ mensaje : 'Se agrego un nuevo registro' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
}
exports.autenticarUsuario=async(req,res,next)=>{
  
    
    const {correo,password}=req.body
console.log(correo);
try{
    
 
const usuario=await Usuario.findOne({correo})

if(!usuario)
{
    // si el usuario no existe
    await res.status(401).json({mensaje:"el usuario no existe"})
    next()
}else
{
        if(!bcrypt.compareSync(password,usuario.password))
        {
            // si el password es correcto

          
            await res.status(401).json({mensaje:'Password Incorrecto'})
            next()

        }else
        {
            
                //password token ,firmar el correcto 
                const id=usuario._id;
                    
                const token=jwt.sign(
                    {
                        correo:usuario.correo,
                        nombre:usuario.nombre,
                        id:usuario._id

                    },'LLAVESECRETA',
                    {
                        expiresIn:'1h'
                    })

                    res.json({token})
        }


}
}catch(error)
{
    console.log(error);


    
}


}

