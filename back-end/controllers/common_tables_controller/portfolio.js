connection = require("../../config/conexion");
bbdd = require("../../utility/mysql.js");
const {
  objToArray
} = require("../../utility/utils");
const controller = {};

/* NOT USED */
controller.showAll = (_, res) => {
  connection.query(bbdd.showAll(), (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

controller.showRandomAll = (_, res) => {
  let sql = `
  select 
  user.id as id_user, 
  portfolio.id as id_portfolio, 
  portfolio.avatar as avatar, 
  portfolio.likes as likes, 
  portfolio.views as views,
  file.name as header
  from portfolio  
  inner join file
  on portfolio.id = file.id_portfolio
  inner join user
  on portfolio.id_user = user.id
  order by RAND();`;
  console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};


controller.showByUserId = ({
  params: {
    id_user
  }
}, res) => {

  let sql = `SELECT id, title, avatar, likes, views, visible, active from portfolio where id_user = ${id_user};`

  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });

};

/* Inserto una FILE y despues cambio la ubicación de la FILE*/
controller.insert = ({
  body,
  file
}, res) => {

  /* ------------------ PREPARACION DE LOS DATOS ----------------------- */
  body.title = body.title.toLowerCase();
  body.avatar = file.newName;
  /* SQL para insertar fecha actual. */
  body.date = "CURDATE()";
  /* typo predefinido */
  body.id_type = 5;

  /* ----------------------INSERCION EN LA BBDD ------------------------- */
  connection.query(bbdd.insert("portfolio", objToArray(body)), (err, {
    insertId
  }) => {
    if (err) throw err;
    else {
      /* CREACION DE CARPETA PARA EL PORTFOLIO */
      const fs = require('fs');
      let dir = `public/multimedia/user_${body.id_user}/portfolios`;
      if (fs.existsSync(dir)) {
        fs.mkdirSync(dir + "/portfolio" + insertId);
      } else {
        console.log(`El directorio 'public/multimedia/user_${body.id_user}/portfolios' No existe`);
      }
      /* */
      /* CAMBIO DE DIRECTORIO LA IMAGEN RECIEN CREADA */
      let fileMoving = `public/multimedia/${file.newName}`; //Localizacion original
      console.log(file.newName);
      const path = require('path'); //path global
      let f = path.basename(fileMoving); //path del archivo

      dir = `public/multimedia/user_${body.id_user}/portfolios/portfolio${insertId}`;
      let dest = path.resolve(dir, f); //path de destino

      fs.rename(fileMoving, dest, (err) => {
        if (err) throw err;
        else console.log('Imagen ' + file.newName + " Uploaded correctly");
      });

      let sqlUpdateDeveloper = "UPDATE user SET isDeveloper = 1 WHERE id = " + body.id_user;
      connection.query(sqlUpdateDeveloper, () => {}); //actualizo al user que crea el porfolio

      /* CREACION TABLA NM user_portfolio */
      let sqlNM = bbdd.insert("portfolio_file", [
        ["id_portfolio", body.id_portfolio],
        ["id_file", insertId]
      ]);
      connection.query(sqlNM, () => {
        /* Que no haga nada */
      });
      /*  */
      res.send({
        insertId
      });
    }

  });
};

/* Header de  */
controller.showHeader = ({
  params: {
    id_portfolio
  }
}, res) => {
  let sql = `SELECT id, title, avatar, description, likes, views, visible, active  FROM portfolio where id = ${id_portfolio}`;
  connection.query(sql, (e, result) => {
    if (e) throw e;
    res.send(result[0]);
  });
};




/* NOT USED NOT TESTED */
controller.countPorfoliosFromUser = ({
  params: {
    id_user
  }
}, res) => {
  let sql = `SELECT count(id) as num FROM portfolio where id_user = ${id_user};`
  connection.query(
    sql,
    (err, result) => {
      if (err) throw err;
      res.send(result[0]);
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