connection = require("../../config/conexion");
bbdd = require("../../utility/mysql.js");
const {
  objToArray,
  createUserToken,
  convertDate
} = require("../../utility/utils");
const controller = {};

controller.showById = ({
  params: {
    id
  }
}, res) => {
  connection.query(bbdd.showById("user", id), (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
};

controller.insert = ({
  body
}, res) => {
  body.last_visit = "CURDATE()";
  body.name = body.name.toLowerCase();
  body.email = body.email.toLowerCase();
  connection.query(bbdd.insert("user", objToArray(body)), (err, result) => {
    if (err) {
      res.sendStatus(400);
    } else {
      if (result == undefined) {
        res.sendStatus(400);
      } else {
        connection.query(
          bbdd.showById("user", result.insertId),
          (err, newUser) => {
            if (err) {
              res.sendStatus(400);
            } else {
              const token = createUserToken(newUser[0]);
              createDirs(newUser[0].id);
              res.send({
                user: {
                  id: newUser[0].id,
                  name: newUser[0].name,
                  header: newUser[0].header,
                  isAdmin: newUser[0].isAdmin
                },
                token
              });
            }
          }
        );
      }
    }
  });
};

controller.updateById = ({
  params: {
    id
  },
  body
}, res) => {

  connection.query(
    bbdd.update("user", objToArray(body), [
      ["id", id]
    ]),
    (e, result) => {
      if (e) res.sendStatus(401);
      res.send(result);
    }
  );
};

controller.login = ({
  body
}, res) => {
  connection.query(
    bbdd.select("user", "", [], objToArray(body)),
    (err, result) => {
      if (err) res.sendStatus(400);
      if (result.length != 0) {
        const token = createUserToken({
          id: result[0].id,
          name: result[0].name,
          header: result[0].header,
          avatar: result[0].avatar,
          isAdmin: result[0].isAdmin
        });
        res.json(token);
      } else {
        res.sendStatus(400);
      }

    }
  );
};

/* Para crear el token (creo) */
controller.getLessData = (req, res) => {
  connection.query(
    bbdd.select("user", ["id", "name", "email", "active", "isAdmin"]),
    (err, result) => {
      if (err) res.sendStatus(400);

      res.send(result);
    }
  );
};


/* Sacada de info para crear cards en seccion developers */
controller.getAllDevInfo = (req, res) => {
  let sql = 'select id_user, name from user_profile inner join profile on user_profile.id_profile = profile.id order by id_user;';
  connection.query(sql, (err, profiles) => {
    if (err) throw err;
    let sql2 = 'SELECT id, name, country, state, avatar, header FROM user WHERE isDeveloper = 1;';
    connection.query(sql2, (err, result) => {
      if (err) throw err;
      res.send({
        users: result,
        profiles
      })
    })
  })

}


controller.getDevInfo = (req, res) => {

  connection.query(
    bbdd.select(
      "user",
      ["name", "gender", "age", "country", "state"],
      [],
      [
        ["id", "" + req.body.id]
      ]
    ),
    (err, result) => {
      if (err) res.sendStatus(400);

      let devInfo = {
        ...result[0]
      };
      let newAge = convertDate(result[0].age);
      devInfo.age = {
        day: newAge.substring(8, 10),
        month: newAge.substring(5, 7),
        year: newAge.substring(0, 4)
      };
      res.send(devInfo);
    }
  );
};

controller.getImages = (req, res) => {
  connection.query(`SELECT avatar, header FROM user where id = ${req.params.id}`,
    (err, result) => {
      if (err) res.send(400);
      res.send(result[0]);
    })
}

controller.getNameById = ({
  params: {
    id
  }
}, res) => {
  connection.query(`SELECT name FROM user WHERE id = ${id}`,
    (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    })
}

/*NOT NECESARY */
controller.getUserByPortfolioId = ({
  params: {
    id_portfolio
  }
}, res) => {

  let sql = `SELECT id, name, avatar, header, country, state from user` +
    ` where id = (select id_user from portfolio where id = ${id_portfolio});`
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });


}

controller.checkPassword = (req, res) => {
  const {
    old_pssw,
    id_user
  } = req.body;
  connection.query(bbdd.select("user", ["name"], [], [
      ["password", `sha1('${old_pssw}')`],
      ["id", id_user]
    ]),
    (err, result) => {
      if (result.length == 0) {
        res.send({
          name: false
        });
      } else {
        res.send(result[0]);
      }
    });
};

const createDirs = (id) => {
  const fs = require('fs');
  let dir = `public/multimedia/user_${id}`;
  if (!fs.existsSync(dir)) {

    fs.mkdirSync(dir);
    fs.mkdirSync(dir + "/avatar");
    fs.mkdirSync(dir + "/header");
    fs.mkdirSync(dir + "/thumb");
    fs.mkdirSync(dir + "/portfolios");

  }

}

module.exports = controller;