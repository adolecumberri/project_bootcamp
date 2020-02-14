
module.exports = function( table ) {
    connection = require('../back-end/config/conexion');
    bbdd = require( '../back-end/utility/mysql.js')(table);

    function showAll (_, res) {
        connection.query(bbdd.showAll(), 
          (err, result)=> {
            if(err) throw err;
            res.send(result);
          });
      };

      function showById ({params: { id }}, res) {
        connection.query(bbdd.showById(id),
        (err,result) => {
          if(err) throw err;
          res.send(result);
        });
      };

      function insert ({ body }, res) {
        connection.query(
          bbdd.insert(objToArray(body)), 
          (err,result) => {
            if(err) throw err;
            res.send(result);
          });
      };

      function updateById ( {params : {id}, body}, res) {
        connection.query(
          bbdd.update(objToArray(body), [['id', id]]),
          (e,result) => {
            if(e) throw e;
            res.send(result);
          }
        )
      };

      function deleteById ( {params : {id}, res}) {
        connection.query(
          bbdd.delete([['id', id]]),
          (e,result) => {
            if(e) throw e;
            res.send(result);
          }
        )
      };

    /* FUNCION PRIVADA DE UTILIDAD */
    objToArray = ( objeto ) => {
        let result = Object.keys(objeto).map( key => {
            return [key, objeto[key]];
        });
        return result;
    };
    
    return{
        showById : showById,
        showAll : showAll,
        insert: insert,
        deleteById: deleteById,
        updateById: updateById
      };
  

};