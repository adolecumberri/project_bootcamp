module.exports = function(table) {
  var { Router } = require("express");
  var router = Router();
  console.log("La tabla es " + table);
  const {
    showAll,
    showById,
    insert,
    updateById,
    deleteById
  } = require("../../controllers/controller.js")(table);

  router.get("/", showAll);
  router.get("/:id", showById);
  router.post("/", insert);
  router.put("/:id", updateById);
  router.delete("/:id", deleteById);
  return router;
};
