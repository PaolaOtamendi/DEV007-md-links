import fs, { fstatSync } from 'fs'
import path from 'path'
import chalk from 'chalk'

//module.exports = () => {
  // ...
//};
//Desde este archivo se pueden exportar las funciones

/*---------------------------FUNCION PARA VERIFICAR QUE LA RUTA EXISTE------------------------------*/
export const routeExists = (route) => { // parametro console.log(chalk.bold.bgRed('Es una carpeta'));background
  if(fs.existsSync(route)){
    console.log(chalk.bold.green("El archivo EXISTE!"));
    return true;
    }else{
    console.log(chalk.bold.red("El archivo NO EXISTE!"));
    return false;
    }
};

/*export const mdlinks = (path, options) => {
  // identificar si mi ruta existe
  return new Promise((resolve, reject) =>{
    if(fs.existsSync(path)){

    }
    else{
      reject(chalk.bold.red("La ruta NO EXISTE!"))
      return false;
    }
  })
}*/

/*---------------------------FUNCION PARA CONVERTIR LA RUTA EN ABSOLUTA------------------------------*/
export const routeAbsolute = (route) => {
  if(path.isAbsolute(route)===true){
    // console.log(route);
    return route
  }else{
    //console.log( path.resolve(route));
    return path.resolve(route)
  }
};

/*---------------------------FUNCION PARA VALIDAD LA RUTA ES UN DIRECTORIO------------------------------*/

export const isDirectory = (route) =>{
  fs.stat(route, (err, stats) =>{
  if(!err){
    if(stats.isFile()){
      console.log(chalk.underline.bgCyanBright('Es un documento? ' + stats.isFile()));
    }
    else if(stats.isDirectory){
      console.log(chalk.underline.bgMagentaBright('Es un directorio? ' + stats.isDirectory()));
      let files = [];
      fs.readdir(route, (err, result) =>{
        if(err){
          console.error(err)
          throw Error(err)
        }
        files = result
        console.log(result);
      });
    }
  }
  else{
    throw err;
  }
  });
}

/*---------------------------FUNCION PARA VALIDAD LA RUTA ES UN DIRECTORIO------------------------------*/
/*export function fileOrDir(file) {
  fs.stat(file, (error, Stats) => {
    if (error) {
      console.warn(chalk.bold.red("No es un archivo"))
    } else {
      console.log(Stats.isFile());
      console.log('No es un archivo')
    }
  });
  }*/