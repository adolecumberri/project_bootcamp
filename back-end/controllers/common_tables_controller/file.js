connection = require("../../config/conexion");
bbdd = require("../../utility/mysql.js");
const {
  objToArray
} = require("../../utility/utils");
const controller = {};


/* NOT USED */
controller.showByPorfolioId = ({
  params: {
    id_portfolio
  }
}, res) => {
  let sql = `
  select file.* 
  from  file
  where id_portfolio = ${id_portfolio};`
  if (id_portfolio != 0) {

    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    });

  }


};

/* Insercion y manejo de archivos */
controller.insert = ({
  body,
  file
}, res) => {

  /*  -------------------------- PREPARACION DE DATOS ---------------------*/
  body.name = file.newName;
  body.id_type = 1;
  const {
    id_user
  } = body;
  delete body.id_user;

  connection.query(bbdd.insert("file", objToArray(body)),
    (err, result) => {
      if (err) throw err;
      else {
        /* --------------creacion de la carpeta del BODY del PORTFOLIO -----*/
        const fs = require('fs');
        let dir = `public/multimedia/user_${id_user}/portfolios/portfolio${body.id_portfolio}`;
        /* Si existe el dir, creo la siguiente carpeta  */
        if (fs.existsSync(dir)) {
          fs.mkdirSync(dir + "/body"); //creo una carpeta body en la que se guardan las files del portfolio
        } else {
          res.sendStatus(400);
        }
        /* */
        /* --------CAMBIO DE DIRECTORIO LA IMAGEN RECIEN CREADA ------------*/
        let fileMoving = `public/multimedia/${file.newName}`; //Localizacion original
        const path = require('path'); //path global
        let f = path.basename(fileMoving); //path del archivo

        dir = `public/multimedia/user_${id_user}/portfolios/portfolio${body.id_portfolio}/body`;
        let dest = path.resolve(dir, f); //path de destino

        fs.rename(fileMoving, dest, (err, result_file) => {
          if (err) throw err;
          else console.log('Imagen ' + file.newName + " Uploaded correctly");
        });
      }
      /* INSERCION DE TABLA NP portfolio_file */
      let sqlNM = bbdd.insert("portfolio_file", [
        ["id_portfolio", body.id_portfolio],
        ["id_file", result.insertId]
      ]);
      connection.query(sqlNM, () => {
        /* Que no haga nada */
      });

      res.send({
        response: true
      });
    });
};

/* NOT USED */
controller.updateById = ({
  params: {
    id
  },
  body
}, res) => {
  connection.query(bbdd.update(objToArray(body), [
    ["id", id]
  ]), (e, result) => {
    if (e) throw e;
    res.send(result);
  });
};

/* NOT USED */
controller.deleteById = ({
  params: {
    id
  },
  res
}) => {
  connection.query(bbdd.delete([
    ["id", id]
  ]), (e, result) => {
    if (e) throw e;
    res.send(result);
  });
};

module.exports = controller;