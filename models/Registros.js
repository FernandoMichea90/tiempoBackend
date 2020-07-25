const mongoose=require('mongoose')
const Schema=mongoose.Schema
const registroSchema=new Schema(
    {
        inicio:{
            type:Date
        },
        fin:{
            type:Date
        },
        tipo:
        {
            type: Schema.ObjectId,
            ref: 'tipo'
        }
        ,
        categoria:
        {
            type:String
        },
        descripcion:
        {
            type:String
        },
        hora:{
            type:Number
        }
        ,usuario:{
            type: Schema.ObjectId,
            ref: 'usuario'
        }

    })


    module.exports =mongoose.model('registro',registroSchema);