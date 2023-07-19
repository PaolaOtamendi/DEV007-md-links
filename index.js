import fs from 'fs'
import path from 'path'
import axios from 'axios';
import { log } from 'console';

/*---------------------------FUNCION PARA VERIFICAR QUE LA RUTA EXISTE------------------------------*/
export const routeExists = (route) => { // parametro
  if(fs.existsSync(route)){
    return true;
    }else{
    return false;
    }
};


/*---------------------------FUNCION PARA CONVERTIR LA RUTA EN ABSOLUTA------------------------------*/
export const routeAbsolute = (route) => {
  if(!path.isAbsolute(route)){ // Verifica si la ruta es absoluta ! ponerlo 
    return path.resolve(route)
  }else{
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

  export function getLinks(array) {
    const links = [];
    const regex = /\[.+?\]\(.+?\)/g;
    array.forEach((link) => {
      const linkMatches = link.match(regex);
      if (linkMatches) {
        links.push(...linkMatches);
      }
    });
    return links;
  }


/*---------------------------FUNCION VERIFICA EL FALSE-----------------------------------*/

export function linksFalse(links) {
  const falseLinks = [];

  links.forEach((link) => {
    let ruta = path.resolve();
    if (link.match(/\[.+?\]\(.+?\)/g)) {
      let linkFalse = link.match(/\[.+?\]\(.+?\)/g);

      const linkObject = {
        href: linkFalse[0].match(/https*?:([^"')\s]+)/)[0],
        text: linkFalse[0].match(/\[(.*?)\]/)[1],
        file: ruta,
      };
      falseLinks.push(linkObject);
    }
  });
  return falseLinks;
}


/*---------------------------AXIOS-----------------------------------*/

export function peticionHTTP(arrObjs) {
  const arrayPromises = arrObjs.map((obj)=>{
    return axios
      .get(obj.href)
      .then((response)=>{
        obj.status = response.status
        obj.mensaje = response.statusText
        return obj
      })
      .catch((err)=>{
        obj.mensaje = "Fail"
        if(err.response){
          obj.status = err.response.status;
        }
        console.log(obj, 99);
        return obj
      });
    });
  return Promise.all(arrayPromises)  
}

/*---------------------------ESTADISTICAS DE LINKS-----------------------------------*/

export function getStatsFromLinks(arrObjs,isOptionValidate) {
  return new Promise((resolve, reject) => {
    const allStats = {
      total: arrObjs.length,
      unique: new Set(arrObjs.map((link) => link.href)).size,
    }
    if(isOptionValidate){
      allStats.working = arrObjs.filter( obj => obj.mensaje == 'OK').length;
      allStats.broken = arrObjs.filter( obj => obj.mensaje == 'Fail').length;
    }
    resolve(allStats);
  });
}
