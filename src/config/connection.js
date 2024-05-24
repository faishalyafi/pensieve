import {Sequelize} from 'sequelize'
import 'dotenv/config'
import chalk from 'chalk';

const sq = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIAL,
    logging:false,
    dialectOptions:{
      dateStrings: true,
      typeCast: true,
    },
    pool: {
      max: 100,
      min: 0,
      idle: 10000,
      acquire: 60000,
    }
  });
console.log(chalk.red('========== DB CONNECTED ========='))

  export default sq