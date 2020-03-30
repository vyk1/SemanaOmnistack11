const generateUID = require('../../src/utils/generateUID')

describe('Generate UID', () => {
    // tit para VSCODE
    it('should generate an unique ID - UID', () => {
        const id = generateUID()
        expect(id).toHaveLength(8)
    })
})