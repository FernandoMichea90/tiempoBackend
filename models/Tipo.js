const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const tipoSchema=new Schema(
{
    tipo:{

        type:String,
        unique:true
    },
    color:{
        type:String
    },

    usuario:
    {

        type: Schema.ObjectId,
        ref: 'usuario'
    }
}

)
module.exports =mongoose.model('tipo',tipoSchema);