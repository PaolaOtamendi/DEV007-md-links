#!/usr/bin/env node
import {mdlinks} from './app.js'
import chalk from 'chalk';


const document = process.argv[2];

const isOptionValidate = process.argv.includes('--validate');
const isOptionStats = process.argv.includes('--stats');

const options = {
    validate: isOptionValidate,
    stats: isOptionStats,
}

mdlinks(document, options)
.then((links)=>{
    if (options.validate && options.stats) {
        console.log(chalk.bold.bgWhiteBright('Ejecutado con exito --validate y --stats'));
        console.log(chalk.bold.blue('Total: ' + links.total))
        console.log(chalk.bold.blue('Unique: ' + links.unique))
        console.log(chalk.bold.green('Working: ' + links.working))
        console.log(chalk.bold.red('Broken: ' +links.broken))
    }

    else if(options.validate){
        console.log(chalk.bold.bgWhiteBright('Ejecutado con exito --validate, no --stats'));
        links.forEach(link => {
        console.log(chalk.bold.gray(link.file + ' ' + link.href + ' ' + link.mensaje + ' ' + link.status + ' ' + link.text))
        });
    }

    else if(options.stats) {
        console.log(chalk.bold.bgWhiteBright('Ejecutado con exito --stats, no --validate'));
        console.log(chalk.bold.green('Total: ' + links.total))
        console.log(chalk.bold.green('Unique: ' + links.unique))
    }

    else{
        console.log(chalk.bold.bgWhiteBright('Ruta obtenida'));
        links.forEach(link => {
        console.log(chalk.bold.yellow(link.file + ' ' + link.href + ' ' + link.text))
        });
    }
})
.catch((err)=>{
console.log(err, 22)
})
