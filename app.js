import { routeExists, routeAbsolute, /*mdlinks,*/ 
/*fileOrDir*/ isDirectory} from "./index.js";
import fs from 'fs'
import chalk from 'chalk'
// console.log(process.argv)

/*---------------------------FUNCION PARA VERIFICAR QUE LA RUTA EXISTE------------------------------*/
const route = process.argv[2];
//export default route;

const isExists = routeExists(route)// argumento

if(isExists === true){
    //llamar a la sig funcion
    const isAbsolute = routeAbsolute(route); // ruta resuelta is path absolute
    console.log(chalk.underline.blueBright('Ruta absoluta ' + isAbsolute));
    isDirectory(route);
    }
    // crear funcion que revise si es archivo o directorio (isfIle nodejs)
else{
    console.log(chalk.bold.red("Ruta no encontrada, validar la ruta"));
}

//Desde index importar las funciones de  mdlinks*/


/*---------------------------FUNCION PARA VERIFICAR QUE LA RUTA EXISTE------------------------------*/
/*mdlinks(route).then(()=>{}).catch((error) =>{
    console.log(error)
});*/


/*---------------------------FUNCION PARA VALIDAD LA RUTA ES UN DIRECTORIO------------------------------*/
/*const isDirectory = fs.stat(route, (err, stats) =>{
    if(!err){
    if(stats.isFile()){
        console.log(chalk.bold.blue('Es un documento?' + stats.isFile()));
    }
    else if(stats.isDirectory){
        console.log(chalk.bold.green('Es un directorio?' + stats.isDirectory()));
    }
    }
    else{
    throw err;
    }
})*/



