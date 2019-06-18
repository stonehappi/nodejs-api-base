const bcrypt = require('bcrypt');

hashPassword = function (_password) {
    return bcrypt.hashSync(_password, 10);
}

checkPassword = function (_password, _hash) {
    return bcrypt.compareSync(_password, hash);
}

module.exports = {
    hashPassword,
    checkPassword
}