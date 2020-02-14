/* FUNCION PRIVADA DE UTILIDAD */

const utility = {};
utility.objToArray = objeto => {
  let result = Object.keys(objeto).map(key => {
    return [key, objeto[key]];
  });
  return result;
};
const myPrivateKey = "klabeSekreta";
const jwt = require("jsonwebtoken");
/* Funcion estatica de creacion de tokens */
utility.createUserToken = ({ id, name, header, avatar, isAdmin }) => {

  const token = jwt.sign(
    {
      id,
      name,
      header,
      avatar,
      isAdmin
    },
    myPrivateKey
  );
  return token;
};

utility.convertDate = (str) =>{
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

module.exports = utility;
