const express=require('express');
const router=express.Router();
const usuarioController=require('../controllers/usuarioController')
const tipoController=require('../controllers/tipoController')
const RegistroController=require('../controllers/registrosController')


module.exports=function(){

//  Crear Cuenta 
    router.post("/crear",usuarioController.nuevoUsuario);
//  Login  
    router.post("/login",usuarioController.autenticarUsuario);


//Tipo

    // Crear Tipo
    router.post("/creartipo",tipoController.nuevoTipo)
    //mostrar tipo 
    router.get("/mostrartipo/:idTip",tipoController.mostrarTipo)
    //actualizar tipo
    router.put("/actualizartipo/:idTip",tipoController.actualizarTipo)
    //borrar tipo
    router.delete("/eliminartipo/:idTip",tipoController.eliminarTipo)
    // Listar tipos por usuario
    router.get("/tipos/:token",tipoController.listarTiposporUsuario)

//Registro

    // Crear Registro
    router.post("/crearRegistro",RegistroController.nuevoRegistro)
    //mostrar Registro 
    router.get("/mostrarRegistro/:idReg",RegistroController.mostrarRegistro)
    //actualizar Registros
    router.put("/actualizarRegistro/:idReg",RegistroController.actualizarRegistro)
    //borrar Registros
    router.delete("/eliminarRegistro/:idReg",RegistroController.eliminarRegistro)
    // Listar Registross por usuario
    router.get("/registros/:token",RegistroController.listarRegistrosporUsuario)

    //Listar registro por usuarios y fecha 
    router.post("/fecharegistros",RegistroController.listarRegistrosporUsuarioyporFecha)
    // Listar Registros por tipo y hora 

    router.post("/registrostipohora",RegistroController.listarTipoyHoras)

    // Listar Registros por categoria y hora 

    router.post("/registrostipocategoria",RegistroController.listarCategoriasyHoras)



    return router;
}