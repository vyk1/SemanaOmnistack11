const crypto = require('crypto')

module.exports = function genterateUID() {
    return crypto.randomBytes(4).toString('HEX')
}

