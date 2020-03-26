const conn = require('../database/connection')
const crypto = require('crypto')

module.exports = {
    async index(req, res) {
        const ongs = await conn('ongs').select('*')
        return res.json(ongs)
    },
    async create(req, res) {

        const { name, email, whatsapp, city, uf } = req.body

        try {
            const id = crypto.randomBytes(4).toString('HEX')
            await conn('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            })

            return res.json({ id })
        } catch (error) {
            console.log(error);
            return res.json({ message: "Ocorreu um erro :/" })
        }
    }
}