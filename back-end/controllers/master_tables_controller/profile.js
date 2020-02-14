const connection = require("../../config/conexion");
const bbdd = require("../../utility/mysql.js");
const {
  objToArray
} = require("../../utility/utils");
const controller = {};

controller.showAll = (_, res) => {
  connection.query(
    "select id, name from profile where category IS NULL order by name asc",
    (err, catNulls) => {
      if (catNulls) {
        //si hay categorías nullas....
        connection.query(
          "select category from profile where category is not null group by category order by category asc",
          (err, categories) => {
            //saco las categorias (solo las categorias)
            let sql = "select * from profile where category is not null order by category asc, name asc";
            connection.query(sql, (err, catNotNulls) => {

              res.send({
                categories,
                catNulls,
                catNotNulls
              });
            });
          }
        );
      }
    }
  );
};

controller.insert = ({
  body
}, res) => {
  connection.query(bbdd.insert("profile", objToArray(body)), (err, result) => {
    if (err) res.sendStatus(400);
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
    bbdd.update("profile", objToArray(body), [
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
  connection.query(bbdd.delete("profile", [
    ["id", id]
  ]), (e, result) => {
    if (e) throw e;
    res.send(result);
  });
};

controller.showUserPorfolio = (req, res) => {
  let sql = `select profile.* 
    from profile 
    inner join user_profile 
    on profile.id = user_profile.id_profile
    where id_user = ${req.params.id};`;
  connection.query(sql, (err, result) => {
    if (err) res.sendStatus(400);

    if (result !== undefined) { //la Id puede venir undefined, tengo que parsear esto
      let sql2 = `select category 
      from profile 
      inner join user_profile
      on profile.id = user_profile.id_profile
      where category is not null AND user_profile.id_user =  ${req.params.id}
      group by category 
      order by category asc;`

      connection.query(sql2,
        (err, categories) => {
          if (err) res.sendStatus(400);
          res.send({
            categories,
            result: result
          });
        });
    }


  });
};

module.exports = controller;