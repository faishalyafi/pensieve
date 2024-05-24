import sq from '../../config/connection.js'
import { Op } from 'sequelize'
import tipe from '../../helper/type.js'
import gps_model from './model.js'

class Controller {
    static async register(req, res) {
        const { device_id, device_type, timestamp, location } = req.body

        try {
            const result = await gps_model.create({ device_id, device_type, timestamp, location })
            res.status(200).json({ status: 200, message: "success", data: [result] })
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }

    static async update(req, res) {
        const { id, device_id, device_type, timestamp, location } = req.body

        try {
            await gps_model.update({ device_id, device_type, timestamp, location }, { where: { id }})
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
            await gps_model.destroy({ where:{ id }})
            res.status(200).json({ status: 200, message: "success" })
        } catch (error) {
            console.log(req.body)
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }

    static async list(req, res) {
        const { page, limit, device_id, device_type, timestamp, location } = req.body

        try {
            let isi = ''
            let isi2 = ''

            if (device_id) {
                isi += ` and g.device_id = :device_id`
            }
            if (device_type) {
                isi += ` and g.device_type ilike :device_type`
            }
            if (timestamp) {
                isi += ` and g.timestamp = :timestamp`
            }
            if (location) {
                isi += ` and g.location ilike :location`
            }

            if (page && limit) {
                isi2 += ` offset :offset limit :limit`
            }

            let data = await sq.query(`select * from gps g where g."deletedAt" isnull${isi} order by g."createdAt" desc${isi2}`,
            tipe({ offset: (+page * limit), limit, device_id, device_type, timestamp, location }))
            if (page && limit) {
                let jml = await sq.query(`select count(*) as "total" from gps g where g."deletedAt" isnull${isi}`,
                tipe({ device_id, device_type, timestamp, location }))
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
            let data = await sq.query(`select * from gps g where g."deletedAt" isnull and g.id = :id`, tipe({ id }))

            res.status(200).json({ status: 200, message: "success", data })
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: 500, message: "error", data: error })
        }
    }
}

export default Controller;