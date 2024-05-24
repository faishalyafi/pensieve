import { DataTypes } from 'sequelize'
import sq from '../../config/connection.js'

const gps = sq.define('gps', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    device_id: {
        type: DataTypes.STRING
    },
    device_type: {
        type: DataTypes.STRING
    },
    timestamp: {
        type: DataTypes.DATE          
    },
    location: {
        type: DataTypes.STRING          
    }
},
    {
        paranoid: true,
        freezeTableName: true
    });

export default gps