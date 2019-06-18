const base = require('../controller/base.controller');

errorHandler = function (err, req, res, next) {
    if (typeof (err) === 'string') {
        // custom application error
        return base.error(res, err)
        // res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return base.error(res, "Invalid Token")
        // return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return base.error(res, err)
    return res.status(500).json({ message: err.message });
    next();
}

module.exports = errorHandler;