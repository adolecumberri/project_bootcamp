const {
  Router
} = require("express");
const router = Router();
const multer = require("multer");

const {
  uploadUserAvatar,
  uploadUserHeader
} = require("../../controllers/files_controller/files");
const {
  insert: portfolioInsert
} = require("../../controllers/common_tables_controller/portfolio");

const {
  insert: fileInsert
} = require("../../controllers/common_tables_controller/file");

const storage = multer.diskStorage({
  destination: "public/multimedia",
  filename: (req, file, cb) => {
    const extension = file.originalname.slice(
      file.originalname.lastIndexOf(".")
    );
    let newName = "";
    if (req.params.id) {
      newName = new Date().valueOf() + req.params.id + extension;
    } else {
      newName = new Date().valueOf() + extension;
    }

    file.newName = newName;
    cb(null, newName);
  }
});

const uploadAvatar = multer({
  storage
});

/* Avatar y Header del usuario */
router.put("/user/:id/avatar", uploadAvatar.single("file"), uploadUserAvatar);
router.put("/user/:id/header", uploadAvatar.single("file"), uploadUserHeader);

/*  CREA el portfolio y despues añade el avatar.*/
router.put("/portfolio", uploadAvatar.single("avatar_portfolio"), portfolioInsert);
/* CREA la File relacionada */
router.put("/file", uploadAvatar.single("body_portfolio"), fileInsert);

module.exports = router;