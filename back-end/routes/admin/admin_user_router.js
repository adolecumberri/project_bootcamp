var { Router } = require("express");
var router = Router();

const {
  getLessData
} = require("../../controllers/common_tables_controller/user");


router.post("/user", getLessData);

module.exports = router;
