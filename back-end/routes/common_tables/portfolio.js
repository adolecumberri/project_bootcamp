var {
  Router
} = require("express");
var router = Router();

const {
  showAll,
  showRandomAll,
  showByUserId,
  insert,
  showHeader,
  deleteById,
  countPorfoliosFromUser
} = require("../../controllers/common_tables_controller/portfolio");

router.get("/", showAll);
router.post("/random", showRandomAll);
router.get("/user/:id_user", showByUserId);
router.post("/", insert);
router.post("/header/:id_portfolio", showHeader);
router.post("/count/:id_user", countPorfoliosFromUser);

router.delete("/:id", deleteById);


module.exports = router;