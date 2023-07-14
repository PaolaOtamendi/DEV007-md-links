import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import axios from 'axios';

/*---------------------------FUNCION PARA VERIFICAR QUE LA RUTA EXISTE------------------------------*/
export const routeExists = (route) => { // parametro
  if(fs.existsSync(route)){
    //console.log(chalk.bold.cyan("El archivo EXISTE!"), 11);
    return true;
    }else{
    //console.log(chalk.bold.red("El archivo NO EXISTE!"), 12);
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
    console.log('allfile', arrayFiles);
    return arrayFiles;
  }

/*---------------------------FUNCION PARA fILTRAR LOS DOCUMENTO EXTENSION MD------------------------------*/
export function getMdExtension(arrayFiles) {
  return arrayFiles.filter(file => path.extname(file) === '.md');
}

/*---------------------------FUNCION PARA LEER EL DOCUMENTO-----------------------------------------------*/
export const readFiles = (arrayFiles) => {
  console.log('deberia llegar array de 2nd', arrayFiles);
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
    // console.table(links);
    return links;
  }


/*---------------------------FUNCION VERIFICA EL FALSE-----------------------------------*/

export function linksFalse(links) {
  console.log('deberia llegar el array', links);
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
  //console.log(falseLinks, 100);
  return falseLinks;
}

/*---------------------------OBTENER URL-----------------------------------*/

export function getUrl(array) {
  const url = [];
  array.forEach((link) => {
    const sameUrl = link.match(/https*?:([^"')\s]+)/g);
    url.push(sameUrl);
  });
  //console.log(url);
  return url;
}


/*---------------------------AXIOS-----------------------------------*/

export function peticionHTTP(arrObjs) {
  const arrayPromises = arrObjs.map((obj)=>{
    return axios.get(obj.href)
      .then((response)=>{
        obj.status = response.status
        obj.mensaje = response.statusText
        return obj
      })
      .catch((err)=>{
        obj.status = err.status
        obj.mensaje = "Fail"
        return obj
      })
    })
    //console.log(arrayPromises)
  return Promise.all(arrayPromises)  
}