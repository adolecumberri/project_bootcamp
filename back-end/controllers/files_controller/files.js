const connection = require("../../config/conexion");
const bbdd = require("../../utility/mysql.js");
const fs = require('fs');
const controller = {};


controller.uploadUserAvatar = (req, res) => {
  /* CAMBIO DE DIRECTORIO LA IMAGEN RECIEN CREATA */
  let file = `public/multimedia/${req.file.newName}`;
  console.log(req.file.newName);
  const path = require('path'); //path global
  let f = path.basename(file); //path del archivo

  let dir = `public/multimedia/user_${req.params.id}/avatar/`;
  let dest = path.resolve(dir, f); //path de destino

  fs.rename(file, dest, (err) => {
    if (err) throw err;
    else console.log('Imagen ' + req.file.newName + "Uploaded correctly");
  });

  /* genero una query que me devuelve avatar, header o ambos */
  let sqlUpdateFile = createUpdateFileQuery(
    req.params.id,
    req.file.newName,
    undefined
  );
  connection.query(sqlUpdateFile, (err, result) => {
    if (err) res.sendStatus(400);
    connection.query(`SELECT avatar, header FROM user WHERE id = ${req.params.id}`,
      (err, resultIMGs) => {
        if (err) res.sendStatus(400);
        res.send(resultIMGs[0]);
      })
  });
};


controller.uploadUserHeader = (req, res) => {
  /* CAMBIO DE DIRECTORIO LA IMAGEN RECIEN CREATA */
  let file = `public/multimedia/${req.file.newName}`;
  const path = require('path'); //path global
  let f = path.basename(file); //path del archivo
  let dest = path.resolve(`public/multimedia/user_${req.params.id}/header/`, f); //path de destino

  fs.rename(file, dest, (err) => {
    if (err) throw err;
    else console.log('Imagen ' + req.file.newName + "Uploaded correctly");
  });

  /* genero una query que me devuelve avatar, header o ambos */
  let sqlUpdateFile = createUpdateFileQuery(
    req.params.id,
    undefined,
    req.file.newName
  );

  connection.query(sqlUpdateFile, (err, result) => {
    if (err) res.sendStatus(400);
    connection.query(`SELECT avatar, header FROM user WHERE id = ${req.params.id}`,
      (err, resultIMGs) => {
        if (err) res.sendStatus(400);
        res.send(resultIMGs[0]);
      })
  });


};

const createUpdateFileQuery = (
  id,
  avatar,
  header
) => {
  let sql = `UPDATE user SET `;
  if (avatar !== undefined && header !== undefined) {
    sql += `avatar = '${avatar}', header = '${header}' `;
  } else {
    if (avatar !== undefined) {
      sql += `avatar = '${avatar}' `;
    } else {
      if (header !== undefined) {
        sql += `header = '${header}' `;
      }
    }
  }
  console.log(sql);
  sql += ` WHERE id = ${id}`;
  return sql;
};



//move file1.htm from 'test/' to 'test/dir_1/'
// moveFile(`./multimedia/`+, './test/dir_1/');

module.exports = controller;