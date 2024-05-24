import ora from 'ora';
import chalk from 'chalk';
import sq from './config/connection.js'
import { fileURLToPath } from "url";
import path from 'path';
import fs from 'fs';
const spinner = ora(`${chalk.red('Start DB Sync !')}`).start();

try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const normalize = fs.readdirSync(path.join(__dirname, "./modules"));
    
    for (let i = 0; i < normalize.length; i++) {
        if(fs.readdirSync(path.join(__dirname, "./modules/"+normalize[i])).includes('model.js')){
            await import(`./modules/${normalize[i]}/model.js`)
        }
    }
    
    await sq.sync({ alter: true});
    spinner.succeed(`${chalk.blue('Finish !')}`)
    process.exit(0);
} catch (error) {
    spinner.fail(`${chalk.yellow('error !')}`)
    console.log(error)
}