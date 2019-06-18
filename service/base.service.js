const db = require('../db/mysql')
const moment = require('moment');
const fs = require('fs')

list = function (_table) {
    const sql = `select * from ${_table}`;
    return db.query(sql);
}

listWhere = function (_table, _cond) {
    const cond = prepareCond(_cond);
    const sql = `select * from ${_table} where ${cond}`;
    return db.query(sql);
}

getById = function (_table, _id) {
    const sql = `select * from ${_table} where id = ${_id}`;
    return db.query(sql);
}

insert = function (_table, _data) {
    const dataSql = prepareDataInsert(_data);
    const sql = `insert into ${_table} ${dataSql}`;
    return db.query(sql);
}

update = function (_table, _data, _cond) {
    const data = prepareDataUpdate(_data);
    const cond = prepareCond(_cond);
    const sql = `update ${_table} set ${data} where ${cond}`;
    return db.query(sql);
}

delete = function (_table, _cond) {
    const cond = prepareCond(_cond);
    const sql = `delete from ${_table} where ${cond}`;
    return db.query(sql);
}

query = function (_sql) {
    return db.query(_sql);
}

saveFile = function (_path, _base64) {
    return new Promise(function (resolve, reject) {
        filename = moment().format('MMMMDDYYYYHMMSS');
        binaryData = Buffer.from(_base64, 'base64').toString('binary');
        fs.writeFile(`${_path}/${filename}.png`, binaryData, "binary", function (err) {
            if (err) reject(err);
            else resolve(`/${filename}.png`);
        });
    });
}

deleteFile = function (_path) {
    return new Promise(function (resolve, reject) {
        fs.unlink(_path, (err) => {
            if (err) reject(err);
            else resolve(true);
        });
    });
}

prepareDataInsert = function (_data) {
    let sqlCol = '';
    let sqlData = '';
    for (var k in _data) {
        sqlCol += `, ${k}`
        sqlData += `, '${_data[k]}'`
    }
    return `(${sqlCol.substring(1)} ) values ( ${sqlData.substring(2)} )`;
}

prepareDataUpdate = function (_data) {
    let sql = '';
    for (var k in _data) {
        sql += `, ${k} = '${_data[k]}'`
    }
    return sql.substring(2);
}

prepareCond = function (_data) {
    let sql = '';
    for (var k in _data) {
        sql += `and ${k} = '${_data[k]}' `
    }
    return sql.substring(4);
}


module.exports = {
    list,
    listWhere,
    getById,
    insert,
    update,
    delete,
    query,
    saveFile,
    deleteFile,
    prepareDataInsert,
    prepareDataUpdate,
    prepareCond
}