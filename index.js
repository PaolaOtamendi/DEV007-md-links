import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

/*---------------------------FUNCION PARA VERIFICAR QUE LA RUTA EXISTE------------------------------*/
export const routeExists = (route) => { // parametro
  if(fs.existsSync(route)){
    console.log(chalk.bold.cyan("El archivo EXISTE!"), 11);
    return true;
    }else{
    console.log(chalk.bold.red("El archivo NO EXISTE!"), 12);
    return false;
    }
};


/*---------------------------FUNCION PARA CONVERTIR LA RUTA EN ABSOLUTA------------------------------*/
export const routeAbsolute = (route) => {
  if(!path.isAbsolute(route)){ // Verifica si la ruta es absoluta ! ponerlo 
    //console.log( path.resolve(route));
    return path.resolve(route)
    //return route
  }else{
    // console.log(route);
    return route
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

/*---------------------------FUNCION PARA LEER EL DOCUMENTO-----------------------------------------------*/
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

/*---------------------------FUNCION PARA LEER LOS LINKS DEL DOCUMENTO-----------------------------------*/
export const getLinks = (array) => {
  const prueba = []
  const route = path.resolve()
  console.log(route, 20);
  array.forEach((elem)=>{
    if(elem.match(/[^!]\[.+?\]\(.+?\)/g)){
      let linkMatch = elem.match(/[^!]\[.+?\]\(.+?\)/g)
      prueba.push({
        href: linkMatch[0].match(/https*?:([^"')\s]+)/)[0],
        text: linkMatch[0].match(/\[(.*)\]/)[1],
        file: route
      })
    }
  })
  // console.table(prueba);
  //console.log(prueba);
  return prueba;
  }

