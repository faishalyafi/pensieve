import { QueryTypes } from 'sequelize'

function type( data ) {
	return { replacements:data, type: QueryTypes.SELECT };
}

export default type