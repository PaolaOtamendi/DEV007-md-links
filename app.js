import { routeExists, routeAbsolute, isDirectory, getMdExtension, readFiles, getLinks, linksFalse, peticionHTTP, getStatsFromLinks} from "./index.js";
import chalk from 'chalk'

/*---------------------------FUNCION PARA VERIFICAR QUE LA RUTA EXISTE------------------------------*/

export const mdlinks = (route, options) => {
    return new Promise((resolve, reject) => {
        const isExists = routeExists(route)
    if (isExists) {
        routeAbsolute(route);
        console.log(routeAbsolute(route), 1);
        const archivos = isDirectory(route);
        const filesMd = getMdExtension(archivos);
        readFiles(filesMd)
        .then((data) => {
            const links = getLinks(data)
            const objsLinks = linksFalse(links);

        if(options.validate && options.stats){
            peticionHTTP(objsLinks).then((validatedLinks) => {
            getStatsFromLinks(validatedLinks, options.validate).then((res) => resolve(res));
            });
            
        } else if(options.validate){

            peticionHTTP(objsLinks).then((res) => resolve(res));
        
        } else if(options.stats){

            getStatsFromLinks(objsLinks, options.validate).then((res) => resolve(res));
        
        }else{
            resolve(objsLinks)
        }

        })
        .catch((err) =>{
            reject(err);
        });
    } else {
    console.log(chalk.bold.red('La ruta ingresada no existe'));
    }
    });
};







