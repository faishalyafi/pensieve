import { DataTypes } from 'sequelize'
import sq from '../../config/connection.js'

const user = sq.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true          
    },
    password: {
        type: DataTypes.STRING          
    },
    login_token: {
        type: DataTypes.TEXT          
    }
},
    {
        paranoid: true,
        freezeTableName: true
    });

export default user