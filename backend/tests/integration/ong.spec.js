const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        // zarar bd antes de começar o teste
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })
    // tit para VSCODE
    it('should be able to create a new ONG', async () => {
        const res = await request(app)
            .post('/ongs')
            // .set('Authorization', 'asd')
            .send(
                {
                    name: "x",
                    email: "ongolon@ong.com",
                    whatsapp: "1188885555",
                    city: "Odorico Paraguassu",
                    uf: "CS"
                })
        console.log(res.body)
        expect(res.body).toHaveProperty('id')
        expect(res.body.id).toHaveLength(8)
    })
})