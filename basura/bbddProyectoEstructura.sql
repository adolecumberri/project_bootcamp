CREATE DATABASE  IF NOT EXISTS `proyect_bootcamp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `proyect_bootcamp`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: Proyecto Bootcamp
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clap_user_files`
--

DROP TABLE IF EXISTS `clap_user_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `clap_user_files` (
  `id_user` int(11) NOT NULL,
  `id_file` int(11) NOT NULL,
  `claps` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_user`,`id_file`),
  KEY `id_file` (`id_file`),
  CONSTRAINT `clap_user_files_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `clap_user_files_ibfk_2` FOREIGN KEY (`id_file`) REFERENCES `file` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `commentary`
--

DROP TABLE IF EXISTS `commentary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `commentary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commentary` text,
  `id_file` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `date` date NOT NULL,
  `read` tinyint(1) DEFAULT '0',
  `visible` tinyint(1) DEFAULT '1',
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_file` (`id_file`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `commentary_ibfk_1` FOREIGN KEY (`id_file`) REFERENCES `file` (`id`),
  CONSTRAINT `commentary_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `enterprise`
--

DROP TABLE IF EXISTS `enterprise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `enterprise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(60) DEFAULT NULL,
  `name` varchar(60) DEFAULT NULL,
  `url_friendly` varchar(255) DEFAULT NULL,
  `description` text,
  `logo` text,
  `header` text,
  `country` varchar(2) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `seen` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  `visible` tinyint(1) DEFAULT '1',
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `enterprise_project`
--

DROP TABLE IF EXISTS `enterprise_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `enterprise_project` (
  `id_enterprise` int(11) NOT NULL,
  `id_project` int(11) NOT NULL,
  `request_status` enum('send','accepted','refused') DEFAULT NULL,
  PRIMARY KEY (`id_enterprise`,`id_project`),
  KEY `id_project` (`id_project`),
  CONSTRAINT `enterprise_project_ibfk_1` FOREIGN KEY (`id_enterprise`) REFERENCES `enterprise` (`id`),
  CONSTRAINT `enterprise_project_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `enterprise_social_media`
--

DROP TABLE IF EXISTS `enterprise_social_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `enterprise_social_media` (
  `id_enterprise` int(11) NOT NULL,
  `id_social_media` int(11) NOT NULL,
  PRIMARY KEY (`id_enterprise`,`id_social_media`),
  KEY `id_social_media` (`id_social_media`),
  CONSTRAINT `enterprise_social_media_ibfk_1` FOREIGN KEY (`id_enterprise`) REFERENCES `enterprise` (`id`),
  CONSTRAINT `enterprise_social_media_ibfk_2` FOREIGN KEY (`id_social_media`) REFERENCES `social_media` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `favourite`
--

DROP TABLE IF EXISTS `favourite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `favourite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_portfolio` int(11) DEFAULT NULL,
  `id_project` int(11) DEFAULT NULL,
  `id_file` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_portfolio` (`id_portfolio`),
  KEY `id_project` (`id_project`),
  KEY `id_file` (`id_file`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `favourite_ibfk_1` FOREIGN KEY (`id_portfolio`) REFERENCES `portfolio` (`id`),
  CONSTRAINT `favourite_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `project` (`id`),
  CONSTRAINT `favourite_ibfk_3` FOREIGN KEY (`id_file`) REFERENCES `file` (`id`),
  CONSTRAINT `favourite_ibfk_4` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_type` int(11) DEFAULT NULL,
  `name` varchar(150) DEFAULT NULL,
  `id_project` int(11) DEFAULT NULL,
  `id_portfolio` int(11) DEFAULT NULL,
  `claps` int(11) DEFAULT '0',
  `views` int(11) DEFAULT '0',
  `puntos` int(11) DEFAULT '0',
  `visible` tinyint(1) DEFAULT '1',
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_type` (`id_type`),
  KEY `id_project` (`id_project`),
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`id_type`) REFERENCES `type` (`id`),
  CONSTRAINT `file_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `likes_user_portfolio`
--

DROP TABLE IF EXISTS `likes_user_portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `likes_user_portfolio` (
  `id_user` int(11) NOT NULL,
  `id_portfolio` int(11) NOT NULL,
  `like` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_user`,`id_portfolio`),
  KEY `id_portfolio` (`id_portfolio`),
  CONSTRAINT `likes_user_portfolio_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `likes_user_portfolio_ibfk_2` FOREIGN KEY (`id_portfolio`) REFERENCES `portfolio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `likes_user_project`
--

DROP TABLE IF EXISTS `likes_user_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `likes_user_project` (
  `id_user` int(11) NOT NULL,
  `id_project` int(11) NOT NULL,
  `like` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id_user`,`id_project`),
  KEY `id_project` (`id_project`),
  CONSTRAINT `likes_user_project_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `likes_user_project_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_receiver` int(11) NOT NULL,
  `id_sender` int(11) NOT NULL,
  `message` text,
  `tipo` int(11) DEFAULT NULL,
  `date` date NOT NULL,
  `read` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `id_receiver` (`id_receiver`),
  KEY `id_sender` (`id_sender`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`id_receiver`) REFERENCES `user` (`id`),
  CONSTRAINT `message_ibfk_2` FOREIGN KEY (`id_sender`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `portfolio`
--

DROP TABLE IF EXISTS `portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `portfolio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_project` int(11) DEFAULT NULL,
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
  KEY `id_project` (`id_project`),
  CONSTRAINT `portfolio_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `portfolio_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `portfolio_tags`
--

DROP TABLE IF EXISTS `portfolio_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `portfolio_tags` (
  `id_portfolio` int(11) NOT NULL,
  `id_tags` int(11) NOT NULL,
  `times_used` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_portfolio`,`id_tags`),
  KEY `id_tags` (`id_tags`),
  CONSTRAINT `portfolio_tags_ibfk_1` FOREIGN KEY (`id_portfolio`) REFERENCES `portfolio` (`id`),
  CONSTRAINT `portfolio_tags_ibfk_2` FOREIGN KEY (`id_tags`) REFERENCES `tags` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `category` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `description` text,
  `id_type` int(11) NOT NULL,
  `header` text,
  `date` date NOT NULL,
  `seen` int(11) DEFAULT NULL,
  `visible` tinyint(1) DEFAULT '1',
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `id_type` (`id_type`),
  CONSTRAINT `project_ibfk_1` FOREIGN KEY (`id_type`) REFERENCES `type` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `seen_user_enterprise`
--

DROP TABLE IF EXISTS `seen_user_enterprise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `seen_user_enterprise` (
  `id_user` int(11) NOT NULL,
  `id_enterprise` int(11) NOT NULL,
  `seen_flag` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_user`,`id_enterprise`),
  KEY `id_enterprise` (`id_enterprise`),
  CONSTRAINT `seen_user_enterprise_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `seen_user_enterprise_ibfk_2` FOREIGN KEY (`id_enterprise`) REFERENCES `enterprise` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `seen_user_portfolio`
--

DROP TABLE IF EXISTS `seen_user_portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `seen_user_portfolio` (
  `id_user` int(11) NOT NULL,
  `id_portfolio` int(11) NOT NULL,
  `seen_flag` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_user`,`id_portfolio`),
  KEY `id_portfolio` (`id_portfolio`),
  CONSTRAINT `seen_user_portfolio_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `seen_user_portfolio_ibfk_2` FOREIGN KEY (`id_portfolio`) REFERENCES `portfolio` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `seen_user_project`
--

DROP TABLE IF EXISTS `seen_user_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `seen_user_project` (
  `id_user` int(11) NOT NULL,
  `id_project` int(11) NOT NULL,
  `seen_flag` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_user`,`id_project`),
  KEY `id_project` (`id_project`),
  CONSTRAINT `seen_user_project_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `seen_user_project_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `seen_user_user`
--

DROP TABLE IF EXISTS `seen_user_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `seen_user_user` (
  `id_user` int(11) NOT NULL,
  `id_whatched` int(11) NOT NULL,
  `seen_flag` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id_user`,`id_whatched`),
  KEY `id_whatched` (`id_whatched`),
  CONSTRAINT `seen_user_user_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `seen_user_user_ibfk_2` FOREIGN KEY (`id_whatched`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `social_media`
--

DROP TABLE IF EXISTS `social_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `social_media` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `times_used` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `cathegory` enum('file','project') DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
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
  `cv_photo` text,
  `cv_studies` text,
  `cv_works` text,
  `cv_experience` text,
  `job_desired` tinyint(1) DEFAULT '0',
  `colaboration_desired` tinyint(1) DEFAULT '0',
  `likes` int(11) DEFAULT '0',
  `seen` int(11) DEFAULT '0',
  `isDeveloper` tinyint(1) DEFAULT '0',
  `isAdmin` tinyint(1) DEFAULT '0',
  `outstanding` tinyint(1) DEFAULT '0',
  `ip` text,
  `last_visit` date NOT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_enterprise`
--

DROP TABLE IF EXISTS `user_enterprise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_enterprise` (
  `id_user` int(11) NOT NULL,
  `id_enterprise` int(11) NOT NULL,
  `request_status` enum('send','accepted','refused') DEFAULT NULL,
  `admin` int(11) DEFAULT NULL,
  `type_user` enum('basic','updater','admin') DEFAULT NULL,
  PRIMARY KEY (`id_user`,`id_enterprise`),
  KEY `id_enterprise` (`id_enterprise`),
  CONSTRAINT `user_enterprise_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `user_enterprise_ibfk_2` FOREIGN KEY (`id_enterprise`) REFERENCES `enterprise` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_profile` (
  `id_user` int(11) NOT NULL,
  `id_profile` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_profile`),
  KEY `id_profile` (`id_profile`),
  CONSTRAINT `user_profile_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `user_profile_ibfk_2` FOREIGN KEY (`id_profile`) REFERENCES `profile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_project`
--

DROP TABLE IF EXISTS `user_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_project` (
  `id_user` int(11) NOT NULL,
  `id_project` int(11) NOT NULL,
  `request_status` enum('send','accepted','refused') DEFAULT NULL,
  PRIMARY KEY (`id_user`,`id_project`),
  KEY `id_project` (`id_project`),
  CONSTRAINT `user_project_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `user_project_ibfk_2` FOREIGN KEY (`id_project`) REFERENCES `project` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_social_media`
--

DROP TABLE IF EXISTS `user_social_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_social_media` (
  `id_user` int(11) NOT NULL,
  `id_social_media` int(11) NOT NULL,
  PRIMARY KEY (`id_user`,`id_social_media`),
  KEY `id_social_media` (`id_social_media`),
  CONSTRAINT `user_social_media_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  CONSTRAINT `user_social_media_ibfk_2` FOREIGN KEY (`id_social_media`) REFERENCES `social_media` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

