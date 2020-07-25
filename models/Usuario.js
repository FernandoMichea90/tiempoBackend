const  mongoose =require('mongoose');
const Schema=mongoose.Schema;

const usuarioSchema=new Schema(
    {
        correo:
        {
            type:String,unique:true,lowercase:true
        },
        nombre:{
            type:String
        },
        password:{
            type:String
        }
    })
    module.exports =mongoose.model('usuario',usuarioSchema);