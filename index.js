const express=require('express')
const app =express();
const cors =require('cors');
const route=require('./Router/index');
const mongoose=require('mongoose')
const bodyParser=require('body-parser');
require('dotenv').config({path:'variables.env'})

mongoose.Promise=global.Promise;
mongoose.connect(process.env.DB_URL,
{
    useUnifiedTopology: true,
    useNewUrlParser: true
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const whitelist =[process.env.FRONTEND_URL]



const corsOption={
    origin:(origin,callBack)=>
    {


        console.log("el origen "+origin);
        
        // revisar si la peticion proveniente del servidor esta en la whitelist

        const existe =whitelist.some(dominio=>dominio===origin);
        if(existe)
        {

            callBack(null,true)
        }else{

            callBack(new Error('no permitido por los suoer cors'));
            
        }
    }

}

app.use(cors());


app.use('/',route())

const host =process.env.HOST || 'localhost'
const port =process.env.PORT || 5000
app.listen(port,host,()=>
{
    //console.log(process.env.PORT);
    //console.log(port);
    
    //console.log(process.env.DB_URL);
    //console.log(process.env.FRONTEND_URL);

    console.log("esta conectado");
    


    

})
//app.listen(5000);