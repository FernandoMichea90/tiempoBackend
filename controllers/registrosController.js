const Registro =require('../models/Registros');
const jwt_decode=require('jwt-decode');
const moment =require('moment')
const mongoose=require('mongoose')

exports.nuevoRegistro=async(req,res,next)=>
{
    var {valores,auth}=req.body;  
    var decode =jwt_decode(auth.token);
    var user=decode.id;

    
    
    
    const registro =new Registro(valores);
    registro.usuario=user;
    console.log(registro.usuario);
    
    try {
        
        await registro.save();
        res.json({mensaje:"Se agrego un nuevo registro"})
    } catch (error) {
        
        res.send(error);
        next();
    }
}





exports.mostrarRegistro = async (req, res, next) => {
    
    const tipo = await  Tipo.findById(req.params.idTip);
   
    
    
    if(!tipo) {
        res.json({mensaje : 'Ese tipo no existe'});
        next()
    }
    // Mostrar el cliente
    res.json(tipo);
}

exports.actualizarRegistro = async (req, res, next) => {
    try {
        const registro = await Registro.findOneAndUpdate({ _id : req.params.idReg }, req.body, {
            new : true
        });
        res.json(registro);
    } catch (error) {
        res.send(error);
        next();
    }
}
exports.eliminarRegistro = async (req, res, next) => {
    try {
        await Registro.findOneAndDelete({_id : req.params.idReg});
        res.json({mensaje : 'El registro se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}


exports.listarRegistrosporUsuario=async(req,res,next)=>
{
    
   

    try {
        //const diario = await Diario.find({});     console.log('req'+req);
        var decode =jwt_decode(req.params.token);
        var user=decode.id;

    //const tipo = await Tipo.find({usuario:`${user}`});

   // const registro = await Registro.find({usuario:`${user}`})
   const registro = await Registro.aggregate([
    {
      '$lookup': {
        'let': {
          'userObjId': {
            '$toObjectId': '$tipo'
          }
        }, 
        'from': 'tipos', 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$_id', '$$userObjId'
                ]
              }
            }
          }
        ], 
        'as': 'tipoDetalles'
      }
    }
  ])

        



            var objeto=
            {
                _id:'',inicio:'',fin:'',tipo:'',categoria:'',descripcion:''
            }

        for(var i=0;i<registro.length;i++)
        {
            //console.log(registro[i]);
             registro[i].inicio=moment( registro[i].inicio).format('LT')
             registro[i].fin=moment( registro[i].fin).format('LT')
             registro[i].tipo=registro[i].tipoDetalles[0].tipo;
          
            console.log(registro[i]);
            
            
        }

        var [tipoDetalles]=registro;
        //console.log(tipoDetalles);
        
                
        res.json(registro);
    } catch (error) {
        console.log(error);
        next();
    }


}

exports.listarRegistrosporUsuarioyporFecha=async(req,res,next)=>
{
    var {fecha,auth}=req.body;  

    console.log(fecha);
    console.log(auth);
    var decode =jwt_decode(auth.token);
var user=decode.id;
    
    // const fecha para buscar por fecha (inicio del dia y final del dia)
   var fechaString=fecha.fecha;



    //Pasar la fecha string a fecha date 
   var pruebainicio= moment(new  Date (fechaString)).startOf('day')
   var pruebafinal=moment(new  Date (fechaString)).endOf('day');
   console.log(new Date(pruebainicio));
   console.log(new Date(pruebafinal));
   
    try {
        //const diario = await Diario.find({});     console.log('req'+req);
       
        console.log(user);
        var usuario=mongoose.Types.ObjectId(user);
        
    //const tipo = await Tipo.find({usuario:`${user}`});

   // const registro = await Registro.find({usuario:`${user}`})
   const registro = await Registro.aggregate([
    { "$match" : { "usuario" :usuario,"inicio": {
        $gte:new Date(pruebainicio),
        $lte:new Date(pruebafinal)}},
    },
    {
      '$lookup': {
        'let': {
          'userObjId': {
            '$toObjectId': '$tipo'
          }
        }, 
        'from': 'tipos', 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$_id', '$$userObjId'
                ]
              }
            }
          }
        ], 
        'as': 'tipoDetalles'
      }
    }
  ])

        

  for(var i=0;i<registro.length;i++)
  {
      //console.log(registro[i]);
       registro[i].inicio=moment( registro[i].inicio).format('LT')
       registro[i].fin=moment( registro[i].fin).format('LT')
       registro[i].tipo=registro[i].tipoDetalles[0].tipo;    
  }

   
            
                
        res.json(registro);
    } catch (error) {
        console.log(error);
        next();
    }


}
exports.listarTipoyHoras=async(req,res,next)=>
{
    var {fecha,auth}=req.body;  
    var decode =jwt_decode(auth.token);

   //  var {fecha,token}=req.body;  
   
   //var decode =jwt_decode(token);

    
    var user=decode.id;
    
    // const fecha para buscar por fecha (inicio del dia y final del dia)
    var fechaString=fecha.fecha;
    //var fechaString=fecha;


    //Pasar la fecha string a fecha date 
   var pruebainicio= moment(new  Date (fechaString)).startOf('day')
   var pruebafinal=moment(new  Date (fechaString)).endOf('day');
   console.log(new Date(pruebainicio));
   console.log(new Date(pruebafinal));
   
    try {
        //const diario = await Diario.find({});     console.log('req'+req);
       
        console.log(user);
        var usuario=mongoose.Types.ObjectId(user);
        
    //const tipo = await Tipo.find({usuario:`${user}`});

   // const registro = await Registro.find({usuario:`${user}`})
   const registro = await Registro.aggregate([
    { "$match" : { "usuario" :usuario,"inicio": {
        $gte:new Date(pruebainicio),
        $lte:new Date(pruebafinal)}},
    },{
      '$lookup': {
        'let': {
          'userObjId': {
            '$toObjectId': '$tipo'
          }
        }, 
        'from': 'tipos', 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$_id', '$$userObjId'
                ]
              }
            }
          }
        ], 
        'as': 'tipoDetalles'
      }
    }, {
      '$group': {
        '_id': '$tipoDetalles', 
        'totalHoras': {
          '$sum': '$hora'
        }
      }
    }
  ]
  )
        
        res.json(registro);
    } catch (error) {
        console.log(error);
        next();
    }


}

exports.listarCategoriasyHoras=async(req,res,next)=>
{
    var {fecha,auth}=req.body;  
    var decode =jwt_decode(auth.token);

    // var {fecha,token}=req.body;  
    //var decode =jwt_decode(token);

    
    var user=decode.id;
    
    // const fecha para buscar por fecha (inicio del dia y final del dia)
    var fechaString=fecha.fecha;
   // var fechaString=fecha;


    //Pasar la fecha string a fecha date 
   var pruebainicio= moment(new  Date (fechaString)).startOf('day')
   var pruebafinal=moment(new  Date (fechaString)).endOf('day');
   console.log(new Date(pruebainicio));
   console.log(new Date(pruebafinal));
   
    try {
        //const diario = await Diario.find({});     console.log('req'+req);
       
        console.log(user);
        var usuario=mongoose.Types.ObjectId(user);
        
    //const tipo = await Tipo.find({usuario:`${user}`});

   // const registro = await Registro.find({usuario:`${user}`})
   const registro = await Registro.aggregate([
    { "$match" : { "usuario" :usuario,"inicio": {
        $gte:new Date(pruebainicio),
        $lte:new Date(pruebafinal)}},
    }, {
     
      '$group': {
        '_id': '$categoria', 
        'totalHoras': {
          '$sum': '$hora'
        }
      }
    }
  ]
  )
        
        res.json(registro);
    } catch (error) {
        console.log(error);
        next();
    }


}