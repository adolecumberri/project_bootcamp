drop database `proyect_bootcamp`;
CREATE DATABASE  IF NOT EXISTS `proyect_bootcamp` ;
USE `proyect_bootcamp`;

 SET NAMES utf8 ;

DROP TABLE IF EXISTS `type`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `cathegory` enum('file') DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `user`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(60) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `age` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `country` varchar(2) DEFAULT NULL,
  `header` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `features` varchar(60) DEFAULT NULL,
  `likes` int(11) DEFAULT '0',
  `seen` int(11) DEFAULT '0',
  `isDeveloper` tinyint(1) DEFAULT '0',
  `isAdmin` tinyint(1) DEFAULT '0',
  `outstanding` tinyint(1) DEFAULT '0',
  `last_visit` date NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `portfolio`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `portfolio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT 'ico_logo40x40.jpg',
  `title` varchar(60) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `id_type` int(11) DEFAULT '1',
  `likes` int(11) DEFAULT '0',
  `views` int(11) DEFAULT '0',
  `publish` tinyint(1) DEFAULT NULL,
  `date` date NOT NULL,
  `visible` tinyint(1) DEFAULT '1',
  `active` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `portfolio_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `file`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `file` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_type` int,
  `name` varchar(150),
  `id_portfolio` int(11) DEFAULT NULL,
  `claps` int(11) DEFAULT '0',
  `views` int(11) DEFAULT '0',
  `puntos` int(11) DEFAULT '0',
  `visible` tinyint(1) DEFAULT 1,
  `active` tinyint(1) DEFAULT 1,
  FOREIGN KEY(id_type) REFERENCES type(id),
  FOREIGN KEY(id_portfolio) REFERENCES portfolio(id)
) ENGINE=InnoDB DEFAULT CHARSET utf8mb4;

DROP TABLE IF EXISTS `profile`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `category` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `user_profile`;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_profile` (
  `id_user` int(11) NOT NULL,
  `id_profile` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_profile`),
  KEY `id_profile` (`id_profile`),
  CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `user_profile_ibfk_2` FOREIGN KEY (`id_profile`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

