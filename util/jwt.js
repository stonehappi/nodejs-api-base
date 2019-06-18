const jwt = require('jsonwebtoken');
const env = require('../config/env')

generateToken = function (_auth) {
    return jwt.sign({ auth: _auth }, env.SECRET_KEY, { expiresIn: env.EXPIRED_TIME });
}

verifyToken = function (_token) {
    jwt.verify(_token, env.SECRET_KEY, function(err, decoded) {
       if (err) {
           console.log(err);
           return null;
       }
       return decoded.auth;
    });
}

module.exports = {
    hashPassword,
    checkPassword
}