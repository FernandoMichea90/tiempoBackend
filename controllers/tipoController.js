const Tipo=require('../models/Tipo')
const jwt_decode=require('jwt-decode')

exports.nuevoTipo=async(req,res,next)=>
{

    var {valores,auth}=req.body;  
    var decode =jwt_decode(auth.token);
    valores.usuario=decode.id;
    
    
    const tipo =new Tipo(valores);
    
    try {
        
        await tipo.save();
        res.json({mensaje:"Se agrego un nuevo registro"})
    } catch (error) {
        
        res.send(error);
        next();
    }
}



exports.mostrarTipo = async (req, res, next) => {
    console.log("Mostrar  el id del tipo ");
    console.log(req.params.idTip);
    
    
    const diario = await  Tipo.findById(req.params.idTip);
   
    console.log(diario);
    
    
    if(!diario) {
        res.json({mensaje : 'Ese diario no existe'});
        next()
    }
    // Mostrar el cliente
    res.json(diario);
}

exports.actualizarTipo = async (req, res, next) => {
    try {
        const diario = await Tipo.findOneAndUpdate({ _id : req.params.idTip }, req.body, {
            new : true
        });
        res.json(diario);
    } catch (error) {
        res.send(error);
        next();
    }
}
exports.eliminarTipo = async (req, res, next) => {
    try {
        await Tipo.findOneAndDelete({_id : req.params.idTip});
        res.json({mensaje : 'El diario se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}
exports.listarTiposporUsuario=async(req,res,next)=>
{
    
   

    try {
       
           
        var decode =jwt_decode(req.params.token);
        var user=decode.id;

     const tipo = await Tipo.find({usuario:`${user}`});

        
        res.json(tipo);
    } catch (error) {
        console.log(error);
        next();
    }


}
