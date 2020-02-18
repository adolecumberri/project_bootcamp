const connection = require("../config/conexion");
let bbdd = null;

class Controller {
  tabla = null;
  constructor(tabla){
    this.table = tabla;
    bbdd = require("../utility/mysql.js")(this.table);
  }

  showAll  (_, res) {
    connection.query(bbdd.showAll(), (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }

  showById({ params: { id } }, res) {
    connection.query(bbdd.showById(id), (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }

  insert({ body }, res) {
    connection.query(bbdd.insert(objToArray(body)), (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }


  updateById({ params: { id }, body }, res) {
    connection.query(
      bbdd.update(objToArray(body), [["id", id]]),
      (e, result) => {
        if (e) throw e;
        res.json(result);
      }
    );
  }

  deleteById({ params: { id }, res }) {
    connection.query(bbdd.delete([["id", id]]), (e, result) => {
      if (e) throw e;
      res.json(result);
    });
  }
}

/* FUNCION PRIVADA DE UTILIDAD */
objToArray = objeto => {
  let result = Object.keys(objeto).map(key => {
    return [key, objeto[key]];
  });
  return result;
};

module.exports = (table) => { return new Controller(table) };
