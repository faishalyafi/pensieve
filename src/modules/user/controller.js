import sq from '../../config/connection.js'
import { Op } from 'sequelize'
import tipe from '../../helper/type.js'
import {hash_password, compare} from '../../helper/bcrypt.js'
import user_model from './model.js'
import { generate_token } from '../../helper/jwt.js'

class Controller {
    static async register(req, res) {
        const { name, email, password } = req.body

        try {
            const [result,created] = await user_model.findOrCreate({ where: { email:{[Op.iLike]:email} }, defaults: { name, email, password: hash_password(password) } })
            if(!created){
                return res.status(201).json({ status: 204, message: "data exists" })
            }
            res.status(200).json({ status: 200, message: "success", data: [result] })
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }

    static async update(req, res) {
        const { id, name } = req.body

        try {
            await user_model.update({ name }, { where: { id }})
            res.status(200).json({ status: 200, message: "success" })
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }

    static async delete(req, res) {
        const { id } = req.body

        try {
            await user_model.destroy({ where:{ id }})
            res.status(200).json({ status: 200, message: "success" })
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }

    static async list(req, res) {
        const { page, limit, name, email } = req.body

        try {
            let isi = ''
            let isi2 = ''

            if (name) {
                isi += ` and u.name ilike :name`
            }
            if (email) {
                isi += ` and u.email ilike :email`
            }

            if (page && limit) {
                isi2 += ` offset :offset limit :limit`
            }

            let data = await sq.query(`select * from "user" u where u."deletedAt" isnull${isi} order by u."createdAt" desc${isi2}`,
            tipe({ offset: (+page * limit), limit, name: `%${name}%` , email: `%${email}%`}))
            if (page && limit) {
                let jml = await sq.query(`select count(*) as "total" from "user" u where u."deletedAt" isnull${isi}`,
                tipe({  name: `%${name}%` , email: `%${email}%` }))
                res.status(200).json({ status: 200, message: "success", page, limit, count: jml[0].total, data })
            } else {
                res.status(200).json({ status: 200, message: "success", data })
            }
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }

    static async details_by_id(req, res) {
        const { id } = req.params

        try {
            const data = await sq.query(`select * from "user" u where u."deletedAt" isnull and u.id = :id`, tipe({ id }))

            res.status(200).json({ status: 200, message: "success", data })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body

        try {
            const data = await user_model.findOne({ where: {email:{[Op.iLike]:email}}})
            if(!data){
                return res.status(201).json({ status: 204, message: "email not found" })
            }
            if(!compare(password, data.password)){
                return res.status(201).json({ status: 204, message: "password not match" })     
            }
            data.dataValues.token = generate_token({user_id: data.id,email: data.email, password: data.password})
            await user_model.update({ token: data.token }, { where: { id: data.id }})

            res.status(200).json({ status: 200, message: "success", data:[data] })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }

    static async change_password(req, res) {
        const { email, old_password, new_password } = req.body

        try {
            const data = await user_model.findOne({ where: {email:{[Op.iLike]:email}}})
            console.log(data);
            if(!data){
                return res.status(201).json({ status: 204, message: "email not found" })
            }
            if(!compare(old_password, data.password)){
                return res.status(201).json({ status: 204, message: "password not match" })     
            }

            await user_model.update({ password: hash_password(new_password) }, { where: { id: data.id }})

            res.status(200).json({ status: 200, message: "success", data })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }
}

export default Controller;