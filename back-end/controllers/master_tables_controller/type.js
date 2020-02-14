const connection = require("../../config/conexion");
const bbdd = require("../../utility/mysql.js");
const {
  objToArray
} = require("../../utility/utils");
const controller = {};

controller.showAll = (_, res) => {
  connection.query(bbdd.showAll("type"), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

controller.showById = ({
  params: {
    id
  }
}, res) => {
  connection.query(bbdd.showById("type", id), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

controller.insert = ({
  body
}, res) => {
  connection.query(bbdd.insert("type", objToArray(body)), (err, result) => {
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
  connection.query(
    bbdd.update("type", objToArray(body), [
      ["id", id]
    ]),
    (e, result) => {
      if (e) throw e;
      res.send(result);
    }
  );
};

controller.deleteById = ({
  params: {
    id
  },
  res
}) => {
  connection.query(bbdd.delete("type", [
    ["id", id]
  ]), (e, result) => {
    if (e) throw e;
    res.send(result);
  });
};

module.exports = controller;