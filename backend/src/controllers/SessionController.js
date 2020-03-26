const conn = require('../database/connection')

module.exports = {
    async create(req, res) {
        const { id } = req.body
        // try {
        const ong = await conn('ongs')
            .where('id', id)
            .select('name')
            .first()
        // retorna só um result em vez de array
        if (!ong) {
            return res.json({ error: "No ONG found for this id." }).status(400)
        }

        return res.json(ong)

        // } catch (error) {
        //     console.log(error);
        //     return res.json({ message: "Ocorreu um erro :/" })
        // }
    }
}