import { routeExists, routeAbsolute, isDirectory, getMdExtension, readFiles, getLinks} from "./index.js";
import chalk from 'chalk'

/*---------------------------FUNCION PARA VERIFICAR QUE LA RUTA EXISTE------------------------------*/
const route = process.argv[2];
const isExists = routeExists(route)// argumento

const isOptionValidate = process.argv.includes('--validate');
console.log(isOptionValidate)

const isOptionStats = process.argv.includes('--stats');
console.log(isOptionStats)


const mdlinks = () => {
    return new Promise((resolve, reject) => {
    if (isExists) {
        const absolute = routeAbsolute(route);
        console.log(chalk.bold.bgMagenta(absolute), 13);
        const archivos = isDirectory(route);
        console.log(archivos, 14);
        const filesMd = getMdExtension(archivos);
        console.log(filesMd, 15);
        readFiles(filesMd)
        .then((result) => {
            //getLinks(result)
            console.log(result, 16);
            const links = getLinks(result);
            resolve(result); 
            if(!isOptionStats && !isOptionValidate){
                links.forEach((link) => {
                console.log(document + " " + link.href + " " + link.text, 41)
                })
            }
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




