var {
  Router
} = require("express");
var router = Router();

const {
  getAllDevInfo,
  showById,
  insert,
  updateById,
  login,
  getDevInfo,
  getImages,
  getNameById,
  getUserByPortfolioId,
  checkPassword
} = require("../../controllers/common_tables_controller/user");

router.get("/:id", showById);
router.get("/name/:id", getNameById);

router.post("/", insert);
router.post("/login", login);
router.post("/dev_info", getDevInfo);
router.post("/img/:id", getImages)
router.post("/check_password", checkPassword);

router.post("/getAllDev", getAllDevInfo);
router.post("/portfolio/:id_portfolio", getUserByPortfolioId);

router.put("/:id", updateById);

module.exports = router;