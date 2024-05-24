import {verify_token} from '../helper/jwt.js'
import sq from '../config/connection.js'
import tipe from '../helper/type.js'


async function authentification(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decode = verify_token(token);
        const check_user = await sq.query(`select * from "user" u where u."deletedAt" isnull and u.id = :id and u.password = :password`,tipe({id:decode.user_id,password:decode.password}))
        if (check_user.length>0) {
            req.user_data = check_user[0]
            next()
        } else {
            res.status(201).json({ status: 204, message: "anda belum login" });
        }
    } catch (err) {
        console.log(err);
        res.status(201).json({ status: 204, message: "anda belum login" });
    }
}


export default authentification