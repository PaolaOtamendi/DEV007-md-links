import { routeExists, routeAbsolute, isDirectory, getMdExtension, readFiles} from "./index.js";
import chalk from 'chalk'

/*---------------------------FUNCION PARA VERIFICAR QUE LA RUTA EXISTE------------------------------*/
const route = process.argv[2];
const isExists = routeExists(route)// argumento

/*export const mdlinks = () =>{
return new Promise((resolve, reject) => {
if(isExists){
    const isAbsolute = routeAbsolute(route); // ruta resuelta is path absolute
    console.log(chalk.underline.blueBright('Ruta absoluta: ' + isAbsolute));
    const archivos = isDirectory(route);
    console.log(archivos, 13);
    const filesMd = getMdExtension(archivos);
    console.log(filesMd, 15);
    readFile(document)
    .then((result) =>{
        console.log(result);
        resolve(result);
    });
    .catch((error) =>{
        console.error(error);
        reject(error);
    });
    } else {
        console.error('ERROR');
    reject(console.error(chalk.bold.red("Ruta no encontrada, validar la ruta")));
}
});
};*/

const mdlinks = () => {
    return new Promise((resolve, reject) => {
    if (isExists) {
        const absolute = routeAbsolute(route);
        console.log(chalk.bold.bgGreen(absolute));
        const archivos = isDirectory(route);
        console.log(archivos, 12);
        const filesMd = getMdExtension(archivos);
        console.log(filesMd, 15);
        readFiles(filesMd)
        .then((result) => {
            console.log(result, 16);
            resolve(result); 
        })
        .catch((error) => {
            console.error(error, 17);
            reject(error); 
        });
    } else {
        console.error("ERROR", 18);
        reject(new Error("ERROR")); // Rechazar la promesa con un error
    }
    });
};

mdlinks(route);

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

// const mdLinks2 = () => {
//     return new Promise((resolve, reject) => {
//     })
// }

/*---------------------------FUNCION PARA VERIFICAR QUE LA RUTA EXISTE------------------------------*/
/*mdlinks(route).then(()=>{}).catch((error) =>{
    console.log(error)
});*/



