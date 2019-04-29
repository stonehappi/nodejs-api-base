exports.success = function (res, _data) {
    res.send({
        status: 'success',
        data: _data
    })
}
exports.error = function (res, _msg) {
    res.send({
        status: 'error',
        message: _msg
    })
}
exports.Permission = {
    User: 0,
    T_manager: 1,
    M_manager: 2,
    L_manager: 3
}