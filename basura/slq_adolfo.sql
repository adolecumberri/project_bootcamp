
drop database coworkin_proyect_bootcamp;
create database coworkin_proyect_bootcamp;
use coworkin_proyect_bootcamp;



SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/* ---------------------------------------------------------------------------------------------   */
/*-------------------------------------------------TABLA MAESTRA---------------------------------------------*/

 CREATE TABLE `profile` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(60)  NOT NULL UNIQUE,
  `cathegory` varchar (60) NOT NULL
) ENGINE=InnoDB default character set utf8mb4;

CREATE TABLE `type`(
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `cathegory` enum('file','project'),
  `description` text NULL
)ENGINE=InnoDB;

CREATE TABLE `social_media`(
  `id`int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB default character set utf8mb4;

 CREATE TABLE `tags` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(60)  NOT NULL UNIQUE,
  `times_used` int (11) NOT NULL
) ENGINE=InnoDB default character set utf8mb4;

 
/* ---------------------------------------------------------------------------------------------   */
/* -----------------------------------------------TABLES ---------------------------------------   */
CREATE TABLE `user` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` varchar(30) UNIQUE,
  `password`  varchar(30) ,
  `name`  varchar(25) UNIQUE,
  `age` int(3),
  `gender` enum('Man', 'Woman', 'Other'),
  `country`   varchar(2),
  `state`   varchar(30),
  `id_social_media` int NULL,
  `header`  varchar(255) default NULL ,
  `avatar` varchar(255) default NULL ,
  `features`  varchar(60) ,
  `cv_photo` text ,
  `cv_studies` text ,
  `cv_works` text ,
  `cv_experience` text ,
  `job_desired` tinyint(1) DEFAULT 0,
  `colaboration_desired` tinyint(1) DEFAULT 0,
  `likes` int(11)  DEFAULT 0,
  `seen` int(11)  DEFAULT '0',
  `isDeveloper` tinyint(1) DEFAULT 0,
  `isAdmin` tinyint(1) DEFAULT 0 ,
  `outstanding` tinyint(1) DEFAULT 0,
  `ip` text ,
  `last_visit` date NOT NULL,
  `active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB default character set utf8mb4;

CREATE TABLE `enterprise` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` varchar(60),
  `name` varchar(60),
  `url_friendly` varchar(255),
  `description` text ,
  `country`   varchar(2),
  `state`   varchar(30),
  `logo` text ,
  `header` text ,
  `seen` int(11) DEFAULT NULL,
  `date`  date NOT NULL,
  `visible` tinyint(1) DEFAULT 1,
  `active` tinyint(1) DEFAULT 1
  ) ENGINE=InnoDB default character set utf8mb4;

/*project: trabajos de empresas */
CREATE TABLE `project` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `description` text ,
  `id_type` int NOT NULL,
  `header` text ,
  `date`  date NOT NULL,
  `seen` int(11) DEFAULT NULL,
  `visible` tinyint(1) DEFAULT 1,
  `active` tinyint(1) DEFAULT 1,
  FOREIGN KEY(id_type) REFERENCES type(id)
) ENGINE=InnoDB DEFAULT character set utf8mb4;

/*conjunto de archivos de los creadores de contenido (posiblemente ligados a projects de empresas*/
/*id_project puede ser NULL porque un portafolio puede ser o ¡¡NO!! parte de un PROJECT y no de un usuario
  Y
 id_user puede ser NULL porque PUEDE SER o ¡¡NO!! parte del trabajo de un usuario*/
CREATE TABLE `portfolio` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_project` int DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  `avatar` varchar(255) NULL,
  `title` varchar(60) NOT NULL,
  `description` varchar(200) ,
  `id_type` int DEFAULT 1,
  `likes` int(11) DEFAULT 0,
  `views` int(11) DEFAULT 0,
  `publish` tinyint(1) DEFAULT NULL,
  `date`  date NOT NULL,
  `visible` tinyint(1) DEFAULT 1,
  `active` tinyint(1) DEFAULT 1,
  FOREIGN KEY(id_user) REFERENCES user(id),
  FOREIGN KEY(id_project) REFERENCES project(id)
) ENGINE=InnoDB DEFAULT CHARSET utf8mb4;

CREATE TABLE `file` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_type` int,
  `name` varchar(150),
  `id_project` int(11) DEFAULT NULL,
  `id_portfolio` int(11) DEFAULT NULL,
  `claps` int(11) DEFAULT '0',
  `views` int(11) DEFAULT '0',
  `puntos` int(11) DEFAULT '0',
  `visible` tinyint(1) DEFAULT 1,
  `active` tinyint(1) DEFAULT 1,
  FOREIGN KEY(id_type) REFERENCES type(id),
  FOREIGN KEY(id_project) REFERENCES project(id),
  FOREIGN KEY(id_portfolio) REFERENCES portfolio(id)
) ENGINE=InnoDB DEFAULT CHARSET utf8mb4;

CREATE TABLE `commentary` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `commentary` text ,
  `id_file` int NOT NULL,
  `id_user` int NOT NULL,
  `date`  date NOT NULL,
  `read` tinyint(1) DEFAULT 0,
  `visible` tinyint(1) DEFAULT 1,
  `active` tinyint(1) DEFAULT 1,
  FOREIGN KEY(id_file) REFERENCES file(id),
  FOREIGN KEY(id_user) REFERENCES user(id)
)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `favourite`(
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_portfolio` int NULL,
  `id_project` int NULL,
  `id_file` int NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  FOREIGN KEY(id_portfolio) REFERENCES portfolio(id),
  FOREIGN KEY(id_project) REFERENCES project(id),
  FOREIGN KEY(id_file) REFERENCES file(id),
  FOREIGN KEY(id_user) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET utf8mb4;
/*Qué es TIPO ??¿?¿?¿?¿??¿*/
CREATE TABLE `message` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_receiver` int NOT NULL,
  `id_sender` int NOT NULL,
  `message` text ,
  `tipo` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  `read` tinyint(1) DEFAULT 0,
  FOREIGN KEY(id_receiver) REFERENCES user(id),
  FOREIGN KEY(id_sender) REFERENCES user(id)
) ENGINE=InnoDB DEFAULT CHARSET utf8mb4;


/* ---------------------------------------------------------------------------------------------   */
/* --------------------------------------------------- TABLAS NM ----------------------------------------------------- */


CREATE TABLE `user_social_media`(
  `id_user` int NOT NULL,
  `id_social_media` int NOT NULL,
  FOREIGN KEY(id_user) REFERENCES user(id)  ON DELETE CASCADE,
  FOREIGN KEY(id_social_media) REFERENCES social_media(id)  ON DELETE CASCADE,
  PRIMARY KEY (id_user, id_social_media)
) ENGINE=InnoDB;

CREATE TABLE `user_profile`(
  `id_user` int  NOT NULL,
  `id_profile` int NOT NULL,
  FOREIGN KEY(id_user) REFERENCES user(id)  ON DELETE CASCADE,
  FOREIGN KEY(id_profile) REFERENCES profile(id)  ON DELETE CASCADE,
  PRIMARY KEY (id_user, id_profile)
) ENGINE=InnoDB;

-- CREATE TABLE `user_portfolio` (
--   `id_user` int(11) NOT NULL,
--   `id_portfolio` int(11) NOT NULL,
--   `portfolio_status` enum('doing','done'),
--   FOREIGN KEY(id_user) REFERENCES user(id)  ON DELETE CASCADE,
--   FOREIGN KEY(id_portfolio) REFERENCES portfolio(id)  ON DELETE CASCADE,
--   PRIMARY KEY (id_user, id_portfolio)
-- ) ENGINE=InnoDB;

/*Colaboradores aquí*/
CREATE TABLE `user_enterprise` (
  `id_user` int NOT NULL,
  `id_enterprise` int NOT NULL,
  `request_status` enum('send','accepted','refused'),
  `admin` int(11) DEFAULT NULL, 
  `type_user` enum('basic','updater','admin'),
  FOREIGN KEY(id_user) REFERENCES user(id)  ON DELETE CASCADE,
  FOREIGN KEY(id_enterprise) REFERENCES enterprise(id)  ON DELETE CASCADE,
  PRIMARY KEY (id_user, id_enterprise)
) ENGINE=InnoDB;

CREATE TABLE `user_project` (
  `id_user` int NOT NULL,
  `id_project` int NOT NULL,
  `request_status` enum('send','accepted','refused'),
  FOREIGN KEY(id_user) REFERENCES user(id)  ON DELETE CASCADE,
  FOREIGN KEY(id_project) REFERENCES project(id)  ON DELETE CASCADE,
  PRIMARY KEY (id_user, id_project)
) ENGINE=InnoDB DEFAULT CHARSET utf8mb4;


CREATE TABLE `enterprise_social_media`(
  `id_enterprise` int NOT NULL,
  `id_social_media` int NOT NULL,
  FOREIGN KEY(id_enterprise) REFERENCES enterprise(id)  ON DELETE CASCADE,
  FOREIGN KEY(id_social_media) REFERENCES social_media(id)  ON DELETE CASCADE,
  PRIMARY KEY (id_enterprise, id_social_media)
) ENGINE=InnoDB;

CREATE TABLE `enterprise_project` (
  `id_enterprise` int NOT NULL,
  `id_project` int NOT NULL,
  `request_status` enum('send','accepted','refused'),
  FOREIGN KEY(id_enterprise) REFERENCES enterprise(id)  ON DELETE CASCADE,
  FOREIGN KEY(id_project) REFERENCES project(id),
  PRIMARY KEY (id_enterprise, id_project)
) ENGINE=InnoDB;


/*Tablas de  comprobación de los campos seen*/
CREATE TABLE `seen_user_user` (
  `id_user` int NOT NULL,
  `id_whatched` int NOT NULL,
  `seen_flag` varchar(15),
  FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE,
  FOREIGN KEY (id_whatched) REFERENCES user(id) ON DELETE CASCADE,
  PRIMARY KEY (id_user, id_whatched)
)ENGINE = InnoDB;

CREATE TABLE `seen_user_enterprise` (
  `id_user` int NOT NULL,
  `id_enterprise` int NOT NULL,
  `seen_flag` varchar(15),
  FOREIGN KEY (id_user) REFERENCES user(id)  ON DELETE CASCADE,
  FOREIGN KEY (id_enterprise) REFERENCES enterprise(id) ON DELETE CASCADE,
  PRIMARY KEY (id_user, id_enterprise)
)ENGINE = InnoDB;

CREATE TABLE `seen_user_project` (
  `id_user` int NOT NULL,
  `id_project` int NOT NULL,
  `seen_flag` varchar(15),
  FOREIGN KEY (id_user) REFERENCES user(id)  ON DELETE CASCADE,
  FOREIGN KEY (id_project) REFERENCES project(id)  ON DELETE CASCADE,
  PRIMARY KEY (id_user, id_project)
)ENGINE = InnoDB;

CREATE TABLE `seen_user_portfolio` (
  `id_user` int NOT NULL,
  `id_portfolio` int NOT NULL,
  `seen_flag` varchar(15),
  FOREIGN KEY (id_user) REFERENCES user(id)  ON DELETE CASCADE,
  FOREIGN KEY (id_portfolio) REFERENCES portfolio(id) ON DELETE CASCADE,
  PRIMARY KEY (id_user, id_portfolio)
)ENGINE = InnoDB;

/*likes*/
CREATE TABLE `likes_user_portfolio` (
  `id_user` int NOT NULL,
  `id_portfolio` int NOT NULL,
  `like` tinyint(1) DEFAULT 0,
  FOREIGN KEY (id_user) REFERENCES user(id)  ON DELETE CASCADE,
  FOREIGN KEY (id_portfolio) REFERENCES portfolio(id)  ON DELETE CASCADE,
  PRIMARY KEY (id_user, id_portfolio)
)ENGINE = InnoDB;

CREATE TABLE `likes_user_project` (
  `id_user` int NOT NULL,
  `id_project` int NOT NULL,
  `like` tinyint(1) DEFAULT 0,
  FOREIGN KEY (id_user) REFERENCES user(id)  ON DELETE CASCADE,
  FOREIGN KEY (id_project) REFERENCES project(id)  ON DELETE CASCADE,
  PRIMARY KEY (id_user, id_project)
)ENGINE = InnoDB;

/*claps*/
CREATE TABLE `clap_user_files` (
  `id_user` int NOT NULL,
  `id_file` int NOT NULL,
  `claps` int(11),
  FOREIGN KEY (id_user) REFERENCES user(id),
  FOREIGN KEY (id_file) REFERENCES file(id),
  PRIMARY KEY (id_user, id_file)
)ENGINE = InnoDB;

/* TABLLAS NM DEL PORTFOLIO*/
CREATE TABLE `portfolio_tags` (
  `id_portfolio` int NOT NULL,
  `id_tags` int NOT NULL,
  `times_used` int(11),
  FOREIGN KEY (id_portfolio) REFERENCES portfolio(id),
  FOREIGN KEY (id_tags) REFERENCES tags(id),
  PRIMARY KEY (id_portfolio, id_tags)
)ENGINE = InnoDB;
/* 
//No la necesito porque la relación es 1-N.
// 1 portafolio tiene muchas imagenes.
CREATE TABLE `portfolio_file` (
  `id_portfolio` int NOT NULL,
  `id_file` int NOT NULL,
  FOREIGN KEY (id_portfolio) REFERENCES portfolio(id),
  FOREIGN KEY (id_file) REFERENCES file(id),
  PRIMARY KEY (id_portfolio, id_file)
)ENGINE = InnoDB;
*/