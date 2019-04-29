const db = require('../db/mssql')
const moment = require('moment');
const fs = require('fs')

exports.list = function (_table) {
    const sql = `select * from ${_table}`;
    return new Promise(function (resolve, reject) {
        db.query(sql).then(res => resolve(res), err => reject(err));
    });
}

exports.listWhere = function (_table, _cond) {
    const cond = prepareCond(_cond);
    const sql = `select * from ${_table} where ${cond}`;
    return db.query(sql);
}

exports.getById = function (_table, _id) {
    const sql = `select * from ${_table} where id = ${_id}`;
    return new Promise(function (resolve, reject) {
        db.query(sql).then(res => { resolve(res) }, err => reject(err));
    });
}

exports.insert = function (_table, _data) {
    const dataSql = prepareDataInsert(_data);
    const sql = `insert into ${_table} ${dataSql}`;
    return new Promise(function (resolve, reject) {
        db.query(sql).then(res => resolve(res), err => reject(err));
    });
}

exports.update = function (_table, _data, _cond) {
    const data = prepareDataUpdate(_data);
    const cond = prepareCond(_cond);
    const sql = `update ${_table} set ${data} where ${cond}`;
    return new Promise(function (resolve, reject) {
        db.query(sql).then(res => resolve(res), err => reject(err));
    });
}

exports.delete = function (_table, _cond) {
    const cond = prepareCond(_cond);
    const sql = `delete from ${_table} where ${cond}`;
    return new Promise(function (resolve, reject) {
        db.query(sql).then(res => resolve(res), err => reject(err));
    });
}

exports.query = function (_sql) {
    return db.query(_sql);
}

exports.saveFile = function (_path, _base64) {
    return new Promise(function (resolve, reject) {
        filename = moment().format('MMMMDDYYYYHMMSS');
        binaryData = Buffer.from(_base64, 'base64').toString('binary');
        fs.writeFile(`${_path}/${filename}.png`, binaryData, "binary", function (err) {
            if (err) reject(err);
            else resolve(`/${filename}.png`);
        });
    });
}

exports.deleteFile = function (_path) {
    return new Promise(function (resolve, reject) {
        fs.unlink(_path, (err) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
}

function prepareDataInsert(_data) {
    let sqlCol = '';
    let sqlData = '';
    for (var k in _data) {
        sqlCol += `, ${k}`
        sqlData += `, '${_data[k]}'`
    }
    return `(${sqlCol.substring(1)} ) values ( ${sqlData.substring(2)} )`;
}

function prepareDataUpdate(_data) {
    let sql = '';
    for (var k in _data) {
        sql += `, ${k} = '${_data[k]}'`
    }
    return sql.substring(2);
}

function prepareCond(_data) {
    let sql = '';
    for (var k in _data) {
        sql += `and ${k} = '${_data[k]}' `
    }
    return sql.substring(4);
}
