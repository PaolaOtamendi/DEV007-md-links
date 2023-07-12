import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

/*---------------------------FUNCION PARA VERIFICAR QUE LA RUTA EXISTE------------------------------*/
export const routeExists = (route) => { // parametro
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
  if(path.isAbsolute(route)===true){ // Verifica si la ruta es absoluta
    // console.log(route);
    return route
  }else{
    // console.log( path.resolve(route));
    return path.resolve(route)
  }
};

/*---------------------------FUNCION PARA VALIDAR LA RUTA ES UN DIRECTORIO------------------------------*/

export const isDirectory = (route) => {
  let arrayFiles = [];              // Creamos un array vacio donde vamos a pasar las rutas
  const stats = fs.statSync(route); 
    if(stats.isFile()){             // Verificmaos si la ruta es un documento
      arrayFiles.push(route);
    }
    else if(stats.isDirectory){
      const files = fs.readdirSync(route, "utf-8"); // Vaciamos la ruta en la constante files
      files.forEach((file) =>{  // Recorremos la constante
        const newRoute = path.join(route, file); // Unimos la ruta ya encontrada con la nueva ruta
        const statsNew = fs.statSync(newRoute);
        if(statsNew.isFile()){
          arrayFiles.push(newRoute);
        }
        else if(statsNew.isDirectory()){
          arrayFiles = arrayFiles.concat(isDirectory(newRoute));
        }
      });
    }
    return arrayFiles;
  }

/*---------------------------FUNCION PARA fILTRAR LOS DOCUMENTO EXTENSION MD------------------------------*/
export function getMdExtension(arrayFiles) {
  return arrayFiles.filter(file => path.extname(file) === '.md');
}

/*---------------------------FUNCION PARA lLEER EL DOCUMENTO------------------------------*/
export const readFiles = (arrayFiles) => {
  const allFiles = [];
  arrayFiles.forEach((file) => {
    allFiles.push(
    new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  })
  );
  });
  return Promise.all(allFiles);
};

