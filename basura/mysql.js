
let table = null;
class utilityMySQL {

  constructor(tabla){
    table = tabla;
  }
  showAll() {
    return `SELECT * FROM ${table};`;
  }

  showById(id) {
    return `SELECT * FROM ${table} WHERE id = '${id}' ;`;
  }

  /*
      EJECUTA SELECTS
      @Brief: select
      @params : 
          <String[]>          Fields -> array de campos a seleccionar. 
          <String[]>          Joins -> nombre tablas a las que hacerle el join
          <[[String, any]]>   Conditions -> condiciones del select. (un array de arrays de 2 casillas)
      */
  select(fields, joins = [], conditions = []) {
    /* -------- CAMPOS ------- */
    let f = "";

    if (typeof fields[0] == "undefined") {
      f = "*";
    } else {
      fields.forEach((value, i) => {
        f += value;
        f += i < fields.length - 1 ? ", " : "";
      });
    }

    /* -------- JOINS ------- */
    let j = "";
    joins.forEach(join => {
      j = " INNER JOIN " + join + " ON " + table + ".id = " + join + ".id ";
    });

    return `SELECT ${f} FROM ${table} ${j} ${createConditions(conditions)};`;
  }

  /*
    EJECUTA INSERTS
    @params: 
      <[[string, any]]> fields : array asociativo clave valor
  */
  insert(fields = []) {
    /* -------- VALORES ------- */
    /* Condition [0] -> key . Condition [1] -> value*/
    let solucion = `INSERT INTO ${table} SET `;
    fields.map((value, i) => {
      //creación de conjuntos key = value
      let newVal = "";
      if (typeof value[1] !== "number" && typeof value[1] !== "boolean") {
        newVal = `"${value[1]}"`;
      } else {
        newVal = value[1];
      }
      solucion += `${value[0]} = ${newVal}`;
      solucion += i < fields.length - 1 ? " , " : " ";
    });
    return (solucion += " ;");
  }
  /*
    Ejecuta funciones update.
    @params 
      <[[string, any]]> fields : array asociativo clave valor
       <[[String, any]]>   conditions : condiciones del select. (un array de arrays de 2 casillas)
  */
  update(fields = [], conditions = []) {
    let solucion = `UPDATE ${table} SET `;
    /* -------- CAMPOS ------- */
    fields.map((value, i) => {
      //creación de conjuntos key = value
      let newVal = "";
      if (typeof value[1] !== "number" && typeof value[1] !== "boolean") {
        newVal = `"${value[1]}"`;
      } else {
        newVal = value[1];
      }
      solucion += `${value[0]} = ${newVal}`;
      solucion += i < fields.length - 1 ? " , " : " ";
    });

    return `${solucion} ${createConditions(conditions)};`;
  }
  /*
    Borra respecto a condición.
    @params
    <[[String, any]]>   Conditions -> condiciones del select. (un array de arrays de 2 casillas)
  */
  remove(conditions = []) {
    return `DELETE FROM ${table} ${createConditions(conditions)}`;
  }
}

/* FUERA DE LA CLASE UTILITY */

/* Crea las condiciones "WHERE $campo = $valor;*/
const createConditions = (conditions = []) => {
  /* -------- CONDITIONS ------- */
  let c = typeof conditions[0] !== "undefined" ? "WHERE " : "";
  /* Condition [0] -> key . Condition [1] -> value*/
  conditions.map((condition, i) => {
    let value = "";
    if (typeof condition[1] !== "number" && typeof condition[1] !== "boolean") {
      value = `"${condition[1]}"`;
    } else {
      value = condition[1];
    }
    c += `${condition[0]} = ${value}`;
    c += i < conditions.length - 1 ? " AND " : " ";
  });

  return c;
};

module.exports = (table) => new utilityMySQL(table);

