CREATE DATABASE  IF NOT EXISTS `coworkin_coworkingame` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `coworkin_coworkingame`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: coworkin_coworkingame
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
-- Dumping data for table `clap_user_files`
--

LOCK TABLES `clap_user_files` WRITE;
/*!40000 ALTER TABLE `clap_user_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `clap_user_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `commentary`
--

LOCK TABLES `commentary` WRITE;
/*!40000 ALTER TABLE `commentary` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `enterprise`
--

LOCK TABLES `enterprise` WRITE;
/*!40000 ALTER TABLE `enterprise` DISABLE KEYS */;
/*!40000 ALTER TABLE `enterprise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `enterprise_project`
--

LOCK TABLES `enterprise_project` WRITE;
/*!40000 ALTER TABLE `enterprise_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `enterprise_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `enterprise_social_media`
--

LOCK TABLES `enterprise_social_media` WRITE;
/*!40000 ALTER TABLE `enterprise_social_media` DISABLE KEYS */;
/*!40000 ALTER TABLE `enterprise_social_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `favourite`
--

LOCK TABLES `favourite` WRITE;
/*!40000 ALTER TABLE `favourite` DISABLE KEYS */;
/*!40000 ALTER TABLE `favourite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (7,1,'1581022599812.jpg',NULL,26,0,0,0,1,1),(8,1,'1581062335132.jpg',NULL,27,0,0,0,1,1),(9,1,'1581063067345.jpg',NULL,31,0,0,0,1,1),(10,1,'1581063359608.jpg',NULL,32,0,0,0,1,1),(11,1,'1581063411498.jpg',NULL,33,0,0,0,1,1),(12,1,'1581063869022.jpg',NULL,34,0,0,0,1,1),(13,1,'1581063870296.jpg',NULL,34,0,0,0,1,1),(14,1,'1581064114429.jpg',NULL,35,0,0,0,1,1),(15,1,'1581075316005.jpg',NULL,36,0,0,0,1,1),(16,1,'1581094286546.jpg',NULL,37,0,0,0,1,1),(17,1,'1581098560205.jpg',NULL,38,0,0,0,1,1),(18,1,'1581098903734.jpg',NULL,39,0,0,0,1,1),(19,1,'1581099567855.JPG',NULL,40,0,0,0,1,1),(20,1,'1581099958543.JPG',NULL,41,0,0,0,1,1),(21,1,'1581103400578.JPG',NULL,47,0,0,0,1,1),(22,1,'1581241120185.jpg',NULL,48,0,0,0,1,1),(23,1,'1581241824822.jpg',NULL,49,0,0,0,1,1),(24,1,'1581241829057.jpg',NULL,50,0,0,0,1,1),(25,1,'1581242015484.jpg',NULL,51,0,0,0,1,1),(26,1,'1581242508091.jpg',NULL,52,0,0,0,1,1),(27,1,'1581243173380.jpg',NULL,53,0,0,0,1,1),(28,1,'1581261699703.JPG',NULL,54,0,0,0,1,1),(29,1,'1581329630378.jpg',NULL,55,0,0,0,1,1),(30,1,'1581337109090.jpg',NULL,56,0,0,0,1,1),(31,1,'1581441788929.jpg',NULL,57,0,0,0,1,1),(32,1,'1581500092727.jpg',NULL,58,0,0,0,1,1);
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `likes_user_portfolio`
--

LOCK TABLES `likes_user_portfolio` WRITE;
/*!40000 ALTER TABLE `likes_user_portfolio` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes_user_portfolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `likes_user_project`
--

LOCK TABLES `likes_user_project` WRITE;
/*!40000 ALTER TABLE `likes_user_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes_user_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `portfolio`
--

LOCK TABLES `portfolio` WRITE;
/*!40000 ALTER TABLE `portfolio` DISABLE KEYS */;
INSERT INTO `portfolio` VALUES (26,NULL,20,'1581022599400.jpg','proyecto 22','proyecto 22',5,0,0,NULL,'2020-02-06',1,0),(27,NULL,20,'1581062334871.jpg','porfolioNM','porfolioNM',5,0,0,NULL,'2020-02-07',1,0),(29,NULL,20,'1581062975249.jpg','proyecto redirect','',5,0,0,NULL,'2020-02-07',1,0),(30,NULL,20,'1581063027156.jpg','proyecto redirect','',5,0,0,NULL,'2020-02-07',1,0),(31,NULL,20,'1581063066758.jpg','proyecto redirect','',5,0,0,NULL,'2020-02-07',1,0),(32,NULL,20,'1581063358841.jpg','proyecto redirect','',5,0,0,NULL,'2020-02-07',1,0),(33,NULL,20,'1581063410914.jpg','proyecto redirect','',5,0,0,NULL,'2020-02-07',1,0),(34,NULL,20,'1581063868753.jpg','proyecto Redireccion2','',5,0,0,NULL,'2020-02-07',1,0),(35,NULL,20,'1581064114127.jpg','history 4','history 4 definition',5,0,0,NULL,'2020-02-07',1,0),(36,NULL,20,'1581075315782.jpg','Proyecto con alejandro','asfsdusadsadxa',5,0,0,NULL,'2020-02-07',1,0),(37,NULL,20,'1581094286274.jpg','TROLOLOLO','POR DIOSSSSSS !!!! QUWE ESTO FUNCIONE',5,0,0,NULL,'2020-02-07',1,0),(38,NULL,20,'1581098557958.jpg','sdasdad','sadsadada',5,0,0,NULL,'2020-02-07',1,0),(39,NULL,21,'1581098903443.jpg','1º proyecto nahuel','Descripcion y esas cosass',5,0,0,NULL,'2020-02-07',1,0),(40,NULL,21,'1581099567672.JPG','La carpeta de patos ','no te metas con dug',5,0,0,NULL,'2020-02-07',1,0),(41,NULL,21,'1581099958367.JPG','tíldés','á é  í ó ú \nâ ê î ô û \nä ë ï Ö Ü',5,0,0,NULL,'2020-02-07',1,0),(42,NULL,21,'1581101589059.JPG','agua','agua',5,0,0,NULL,'2020-02-07',1,0),(43,NULL,21,'1581101592788.JPG','agua','agua',5,0,0,NULL,'2020-02-07',1,0),(44,NULL,21,'1581101601812.JPG','agua','agua',5,0,0,NULL,'2020-02-07',1,0),(45,NULL,21,'1581101621446.JPG','agua','agua',5,0,0,NULL,'2020-02-07',1,0),(46,NULL,21,'1581102312068.JPG','','',5,0,0,NULL,'2020-02-07',1,0),(47,NULL,21,'1581103400408.JPG','Quack troops','',5,0,0,NULL,'2020-02-07',1,0),(48,NULL,22,'1581241119955.jpg','ejemplo del usuario de prueba aaaaaaaaaaaaaaaaaaaaaaaaaaaaa','Longitud máxima : ',5,0,0,NULL,'2020-02-09',1,0),(49,NULL,22,'1581241824576.jpg','prueba de redireccion','agua agua agua agua',5,0,0,NULL,'2020-02-09',1,0),(50,NULL,22,'1581241828801.jpg','prueba de redireccion','agua agua agua agua',5,0,0,NULL,'2020-02-09',1,0),(51,NULL,22,'1581242015111.jpg','prueba del history.replace','prueba nº 4',5,0,0,NULL,'2020-02-09',1,0),(52,NULL,22,'1581242507889.jpg','prueba 5','otro intento de redireccion correcta',5,0,0,NULL,'2020-02-09',1,0),(53,NULL,22,'1581243173176.jpg','Davis','Davis\'s project',5,0,0,NULL,'2020-02-09',1,0),(54,NULL,23,'1581261699535.JPG','Developeando','palabras ',5,0,0,NULL,'2020-02-09',1,0),(55,NULL,25,'1581329630112.jpg','jajan\'t','prueba de titulos capitalizado',5,0,0,NULL,'2020-02-10',1,0),(56,NULL,25,'1581337108906.jpg','portfolio ale','',5,0,0,NULL,'2020-02-10',1,0),(57,NULL,25,'1581441788461.jpg','spart-gallus','',5,0,0,NULL,'2020-02-11',1,0),(58,NULL,25,'1581500092581.jpg','saltad-owl de pertiga','',5,0,0,NULL,'2020-02-12',1,0);
/*!40000 ALTER TABLE `portfolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `portfolio_tags`
--

LOCK TABLES `portfolio_tags` WRITE;
/*!40000 ALTER TABLE `portfolio_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `portfolio_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'2D Artist',NULL),(2,'3D Artist',NULL),(3,'Animator',NULL),(4,'Programmer',NULL),(5,'Blender',NULL),(6,'Script Writter',NULL),(7,'QA',NULL),(8,'mathematician',NULL),(9,'ilustration','2d art'),(10,'Pixel art','2d art'),(11,'Vectorial','2d art'),(12,'Rigging','3d art'),(13,'Modelate','3d art'),(14,'textured','3d art'),(15,'material creator','3d art'),(16,'2D animation','Animation'),(17,'3D animation','Animation'),(18,'Stop Motion','Animation'),(19,'C++','Programming'),(20,'C#','Programming'),(21,'Java','Programming'),(22,'JavaScript','Programming'),(23,'Game Design','Design'),(24,'Scenarios Design','Design'),(26,'UI Design','Design'),(27,'UX Design','Design'),(28,'Vfx','Design'),(29,'General Music','Music'),(30,'8-16 bits','Music'),(31,'Sfx','Music'),(32,'Jazz','Music');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `seen_user_enterprise`
--

LOCK TABLES `seen_user_enterprise` WRITE;
/*!40000 ALTER TABLE `seen_user_enterprise` DISABLE KEYS */;
/*!40000 ALTER TABLE `seen_user_enterprise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `seen_user_portfolio`
--

LOCK TABLES `seen_user_portfolio` WRITE;
/*!40000 ALTER TABLE `seen_user_portfolio` DISABLE KEYS */;
/*!40000 ALTER TABLE `seen_user_portfolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `seen_user_project`
--

LOCK TABLES `seen_user_project` WRITE;
/*!40000 ALTER TABLE `seen_user_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `seen_user_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `seen_user_user`
--

LOCK TABLES `seen_user_user` WRITE;
/*!40000 ALTER TABLE `seen_user_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `seen_user_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `social_media`
--

LOCK TABLES `social_media` WRITE;
/*!40000 ALTER TABLE `social_media` DISABLE KEYS */;
/*!40000 ALTER TABLE `social_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'Image','file','imagenes clasicas dentro del proyecto.'),(2,'Video','file','imagenes clasicas dentro del proyecto.'),(3,'Model 3D','file','imagenes clasicas dentro del proyecto.'),(4,'Music','file','Sonido?'),(5,'Practice','project',NULL),(6,'Real Proyect','project',NULL);
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (16,'ejemplo10@gmail.com','e38ad214943daad1d64c102faec29de4afe9da3d','Manolito','1997-07-12','Female','Málaga sity country del sol','EG','158089064346616.jpg','158093156230916.jpg',NULL,NULL,NULL,NULL,NULL,0,0,0,0,0,0,0,NULL,'2020-02-03',1),(17,'ejemplo11@gmail.com','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8','Manele',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0,0,0,0,NULL,'2020-02-06',1),(18,'ejemplo12@gmail.com','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8','Juanramon',NULL,NULL,NULL,NULL,NULL,'',NULL,NULL,NULL,NULL,NULL,0,0,0,0,1,0,0,NULL,'2020-02-06',1),(20,'ejemplo3@gmail.com','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8','lecum','1977-01-12','Male','Malaga','TF','158102197485420.jpg','158102339706020.jpg',NULL,NULL,NULL,NULL,NULL,0,0,0,0,1,0,0,NULL,'2020-02-06',1),(21,'nahuel@gmail.com','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8','Nahuel',NULL,NULL,NULL,NULL,'158117176228821.jpg','158109877240021.jpg',NULL,NULL,NULL,NULL,NULL,0,0,0,0,1,0,0,NULL,'2020-02-07',1),(22,'ejemplo4@gmail.com','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8','prueba4',NULL,NULL,NULL,NULL,'158124105124322.jpg','158124104496522.jpg',NULL,NULL,NULL,NULL,NULL,0,0,0,0,1,0,0,NULL,'2020-02-09',1),(23,'developer@gmail.com','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8','Developer',NULL,NULL,NULL,NULL,'158126171924623.JPG','158126171254923.JPG',NULL,NULL,NULL,NULL,NULL,0,0,0,0,1,0,0,NULL,'2020-02-09',1),(24,'developer2','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8','developer2',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,0,0,0,0,0,0,NULL,'2020-02-10',1),(25,'developer3@gmail.com','5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8','developer3',NULL,NULL,NULL,'AF','158152854339925.png','158152853735825.jpg',NULL,NULL,NULL,NULL,NULL,0,0,0,0,1,0,0,NULL,'2020-02-10',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_enterprise`
--

LOCK TABLES `user_enterprise` WRITE;
/*!40000 ALTER TABLE `user_enterprise` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_enterprise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES (16,2),(21,2),(16,3),(16,4),(21,4),(25,7),(16,9),(21,9),(16,10),(21,10),(21,11),(16,12),(21,12),(16,13),(21,13),(25,13),(21,14),(16,15),(25,15),(20,16),(25,16),(25,17),(16,22),(21,29);
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_project`
--

LOCK TABLES `user_project` WRITE;
/*!40000 ALTER TABLE `user_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user_social_media`
--

LOCK TABLES `user_social_media` WRITE;
/*!40000 ALTER TABLE `user_social_media` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_social_media` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-13 17:22:35
