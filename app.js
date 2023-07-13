import { routeExists, routeAbsolute, isDirectory, getMdExtension, readFiles, getLinks, linksFalse} from "./index.js";
import chalk from 'chalk'

/*---------------------------FUNCION PARA VERIFICAR QUE LA RUTA EXISTE------------------------------*/

//const route = process.argv[2];


export const mdlinks = (route, options) => {
    return new Promise((resolve, reject) => {
        const isExists = routeExists(route)
    if (isExists) {
        const absolute = routeAbsolute(route);
        console.log(chalk.bold.bgMagenta(absolute), 13);
        const archivos = isDirectory(route);
        console.log(archivos, 14);
        const filesMd = getMdExtension(archivos);
        console.log(filesMd, 15);
        readFiles(filesMd)
        .then((data) => {
            const links = getLinks(data)
            const validatedLlinks = linksFalse(links, options.validate);
            resolve(validatedLlinks)
            resolve(links)
        })
        .catch((err) =>{
            reject(err)
        })
    } else {
        console.error("ERROR", 18);
        reject(new Error("ERROR")); // Rechazar la promesa con un error
    }
    });
};

//mdlinks(route);






