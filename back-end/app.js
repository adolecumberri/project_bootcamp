var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
var cors = require("cors");
var app = express();
const path = require("path");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, "public")));
/*-------------------------------------- ROUTERS -------------------------------*/
/*--------------------> Tablas Maestras */
let profile = require("./routes/master_tables/profile");
let type = require("./routes/master_tables/type");

/*--------------------> Tablas Comunes */
let user = require("./routes/common_tables/user");
let portfolio = require("./routes/common_tables/portfolio");
let file = require("./routes/common_tables/file");

/*--------------------> Tablas NM */
let user_profile = require("./routes/nm_tables/user_profile");

/* Router de utilidades  */
let admin = require("./routes/admin/admin_user_router");
/* Router de Files */
let files_router = require("./routes/files/files_router");

/* -------------------------------------USO DE ROUTERS ------------------------*/
/*--> Tablas Maestras */
app.use("/profile", profile);
app.use("/type", type);

/*--> Tablas Comunes */
app.use("/user", user);
app.use("/portfolio", portfolio);
app.use("/file", file);

/*--> Tablas NM */
app.use("/user_profile", user_profile);

/* --> FILES */
app.use("/records", files_router);

/* --> Acciones especificas de la pagina como ADMIN */
app.use("/admin", admin);

/* DEFAULT PAGE */
app.get("/", (req, res) => {
  res.send("Bienvenido a la API de proyect_bootcamps.");
});

// ERROR SI NO ENTRA EN NINGUN ROUTER
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  throw err;
  console.trace();
});
module.exports = app;