var {
    Router
} = require("express");
var router = Router();

const controller = require("../../controllers/master_tables_controller/profile");

router.get('/', controller.showAll);
router.post('/', controller.insert);
router.put('/:id', controller.updateById);
router.delete('/:id', controller.deleteById);
router.post("/user/:id", controller.showUserPorfolio);

module.exports = router;