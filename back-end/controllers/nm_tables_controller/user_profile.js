connection = require("../../config/conexion");
bbdd = require("../../utility/mysql.js");
const {
  objToArray
} = require("../../utility/utils");
const controller = {};

controller.showAll = (_, res) => {
  connection.query("user_profile", bbdd.showAll(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

controller.showById = ({
  params: {
    id
  }
}, res) => {
  
  connection.query( `select id_profile from user_profile where id_user = ${id};`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

controller.insert = ({
  body
}, res) => {
  connection.query(bbdd.insert("user_profile", objToArray(body)), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

controller.updateById = ({
  params: {
    id
  },
  body
}, res) => {
  connection.query(bbdd.update("user_profile", objToArray(body), [
    ["id", id]
  ]), (e, result) => {
    if (e) throw e;
    res.send(result);
  });
};

controller.deleteById = ({
  body: {
    id_user,
    id_profile
  },
  res
}) => {
  connection.query(bbdd.delete("user_profile", [
    ["id_profile", id_profile],
    ["id_user", id_user]
  ]), (e, result) => {
    if (e) throw e;
    res.send(result);
  });
};

module.exports = controller;