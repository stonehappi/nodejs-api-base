success = function (res, _data) {
    res.send({
        status: 'success',
        data: _data
    });
}
error = function (res, _msg) {
    res.send({
        status: 'error',
        message: _msg
    });
}

index = function (req, res) {
    return success(res, "Hello World From Stone NodeJS API");
}

module.exports = {
    success,
    error,
    index
}