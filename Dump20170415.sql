CREATE DATABASE  IF NOT EXISTS `heroku_db65f8e9326be4b` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `heroku_db65f8e9326be4b`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: heroku_db65f8e9326be4b
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `animal type`
--

DROP TABLE IF EXISTS `animal type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `animal type` (
  `Animal Type ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Description` varchar(200) NOT NULL,
  PRIMARY KEY (`Animal Type ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal type`
--

LOCK TABLES `animal type` WRITE;
/*!40000 ALTER TABLE `animal type` DISABLE KEYS */;
INSERT INTO `animal type` VALUES (1,'Mammalia','Mammal'),(2,'Reptilia','Reptile'),(3,'Aves','Bird'),(4,'Amphibia','Amphibian'),(5,'Fish','Fish');
/*!40000 ALTER TABLE `animal type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animals`
--

DROP TABLE IF EXISTS `animals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `animals` (
  `Animal ID` int(11) NOT NULL AUTO_INCREMENT,
  `Exhibit ID` int(11) NOT NULL,
  `Diet Type ID` int(11) NOT NULL,
  `Animal Type ID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Age` int(11) NOT NULL,
  `Weight` varchar(45) NOT NULL,
  `Height` varchar(45) NOT NULL,
  `Gender` varchar(45) NOT NULL,
  PRIMARY KEY (`Animal ID`),
  KEY `fk_Animals_Exhibits1_idx` (`Exhibit ID`),
  KEY `fk_Animals_Diet Type1_idx` (`Diet Type ID`),
  KEY `fk_Animals_Animal Type1_idx` (`Animal Type ID`),
  CONSTRAINT `fk_Animals_Animal Type1` FOREIGN KEY (`Animal Type ID`) REFERENCES `animal type` (`Animal Type ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Animals_Diet Type1` FOREIGN KEY (`Diet Type ID`) REFERENCES `diet type` (`Diet Type ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Animals_Exhibits1` FOREIGN KEY (`Exhibit ID`) REFERENCES `enclosure` (`Enclosure`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animals`
--

LOCK TABLES `animals` WRITE;
/*!40000 ALTER TABLE `animals` DISABLE KEYS */;
INSERT INTO `animals` VALUES (1,1,1,1,'Zimba','Lion',5,'420 lbs','4.0 ft.','Male'),(2,1,1,1,'Luigi','Bobcat',4,'22 lbs','2.0 ft.','Male'),(3,2,3,3,'Walter','American Flamingo',4,'5 lbs','5.0 ft.','Male'),(4,2,3,3,'Mary','Greater Rhea',5,'40 lbs','4.0 ft.','Female'),(5,3,1,1,'Annie','Gray Wolf',3,'65 lbs','4.3 ft.','Female'),(6,3,2,1,'Bucky','American Beaver',3,'35 lbs','2.5 ft.','Male'),(7,4,1,1,'Zoom','Cheetah',6,'80 lbs','3.0 ft.','Male'),(8,4,2,1,'Stripes','Grevy\'s Zebra',7,'800 lbs','5.0 ft.','Female'),(9,5,2,1,'Rice','Asian Elephant',15,'8000 lbs','7.3 ft.','Female'),(10,6,1,2,'Crunch','American Alligator',10,'500 lbs','1.0 ft.','Male'),(11,6,1,2,'Rocky','Burmese Rock Python',12,'64 lbs','15  ft.','Male'),(12,7,3,5,'Lily','Japanese Koi',3,'16 lbs','20 in.','Female'),(13,7,2,5,'Nemo','Clown Fish',6,'.2 lbs','3 in.','Male'),(14,8,3,1,'Ush','Western Lowland Gorilla',18,'440 lbs','5.5 ft.','Male'),(15,8,3,1,'Rick','Orangutan',11,'110 lbs','4.2 ft.','Female'),(16,1,1,1,'Derreck','Sumatran Tiger',5,'350 lbs','8.0 ft.','Male'),(17,1,2,1,'Bryan','Blak-tailed Prairie Dog',7,'2 lbs','1.3 ft.','Female'),(18,1,1,1,'Linux','Caracal lynx',10,'30 lbs','3.3 ft.','Male'),(19,1,2,1,'Spike','North American Porcupine',2,'20 lbs','2.0 ft.','Male'),(20,2,3,3,'Emma','Emu',13,'81 lbs','5.1 ft.','Female'),(21,2,1,3,'Kenny','King Vulture',6,'7 lbs','2.5 ft.','Male'),(22,2,3,3,'Cody','Kori Bustard',11,'32 lbs','5.0 ft.','Male'),(23,2,3,3,'Emily','Stanley Crane',5,'9 lbs','3.5 ft.','Female'),(24,2,3,3,'Sarah','Roseate Spoonbill',10,'3 lbs','2.5 ft.','Female'),(25,3,1,3,'Baldie','Bald Eagle',31,'8 lbs','2.9 ft.','Male'),(26,3,3,3,'Cupper','Brown Pelican',11,'7 lbs','4.2 ft.','Male'),(27,3,1,1,'Raina','Gray Seal',16,'319 lbs','5.4 ft.','Female'),(28,3,1,1,'Jessica','Harbor Seal',7,'120 lbs','5.0 ft.','Female'),(29,3,3,3,'Remi','Common Raven',4,'2 lbs','2.0 ft.','Male'),(30,4,3,1,'Harry','Red River Hog',8,'100 lbs','2.0 ft.','Male'),(31,4,2,1,'Leslie','Lesser Kudu',5,'135 lbs','3.3 ft.','Female'),(32,4,2,1,'Larry','Sitatunga',9,'190 lbs','4.1 ft.','Male'),(34,6,1,2,'Tooth','Cuban Crocodile',8,'474 lbs','6.9 ft.','Male'),(35,6,1,2,'Slitherin','Eastern Indigo Snake',4,'6 lbs','6.5 ft.','Female'),(36,6,1,2,'Rawr','Gila Monster',3,'5 lbs','2.0 ft.','Male'),(37,6,1,2,'Gary','Komodo Dragon',18,'180 lbs','7.6 ft.','Male'),(38,8,3,1,'Carrie','White-Cheeked Gibbon',4,'11 lbs','1.7 ft.','Female'),(39,8,3,1,'Joe','Siamang',6,'13 lbs','3.2 ft.','Male'),(40,8,3,1,'Mankey','Red-Tailed Monkey',3,'7 lbs','1.3 ft.','Female'),(41,8,3,1,'Leonard','Ring-Tailed Lemur',14,'4 lbs','1.4 ft.','Male'),(42,7,2,5,'Coco','Twig catfish',2,'.5 lbs','5 in.','Female'),(43,7,1,5,'Dexter','Red-Bellied Piranha',4,'3 lbs','1 ft.','Male'),(44,7,2,1,'Ash','Donkey',6,'80 lbs','4.5 ft.','Male');
/*!40000 ALTER TABLE `animals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers` (
  `Customer ID` int(11) NOT NULL AUTO_INCREMENT,
  `Zoo ID` int(11) NOT NULL,
  `First Name` varchar(45) NOT NULL,
  `Last Name` varchar(45) NOT NULL,
  `VIP` tinyint(1) NOT NULL,
  PRIMARY KEY (`Customer ID`),
  KEY `fk_Customers_Zoo1_idx` (`Zoo ID`),
  CONSTRAINT `fk_Customers_Zoo1` FOREIGN KEY (`Zoo ID`) REFERENCES `zoo` (`Zoo ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,1,'John','Smith',0),(2,1,'Brian','Rogers',0),(3,1,'Alan','Poole',0),(4,1,'Sue','Simpson',0),(5,1,'Joe','Barry',0),(6,1,'Pippa','Terry',0),(7,1,'Sam','Sanderson',0),(8,1,'Una','Terry',0),(9,1,'Harry','Dyer',0),(10,1,'Victor','Young',0),(11,1,'Ian','White',0),(12,1,'Lillian','McDonald',0),(13,1,'Isaac','Gibson',0),(14,1,'Jake','Scott',0),(15,1,'Heather','King',0),(16,1,'Julian','Jones',0),(17,1,'Thomas','Mackay',0),(18,1,'Adam','Quinn',0),(19,1,'Christopher','Slater',0),(20,1,'Trevor','Hill',0),(21,1,'Thomas','Mitchell',0),(22,1,'Robert','Jackson',0),(23,1,'Anthony','Peters',0),(24,1,'Sarah','Bell',0),(25,1,'Keith','Walker',0),(32,1,'Individual','Donors',0),(42,1,'Corporate','Donors',0),(52,1,'Fundraiser','Events',0);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diet type`
--

DROP TABLE IF EXISTS `diet type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diet type` (
  `Diet Type ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Eating Schedule` varchar(200) NOT NULL,
  PRIMARY KEY (`Diet Type ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diet type`
--

LOCK TABLES `diet type` WRITE;
/*!40000 ALTER TABLE `diet type` DISABLE KEYS */;
INSERT INTO `diet type` VALUES (1,'Carnivore','Flesh Eating','Morning'),(2,'Herbivore','Vegetation','Afternoon'),(3,'Omnivore','Animal and Plant Tissue','Evening');
/*!40000 ALTER TABLE `diet type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `Employee ID` int(11) NOT NULL AUTO_INCREMENT,
  `Zoo ID` int(11) NOT NULL,
  `Enclosure ID` int(11) DEFAULT NULL,
  `Shop ID` int(11) DEFAULT NULL,
  `First Name` varchar(45) NOT NULL,
  `Last Name` varchar(45) NOT NULL,
  `Full Name` varchar(45) NOT NULL,
  `Job Desciption` varchar(200) NOT NULL,
  `Hire Date` date NOT NULL,
  `Shifts` varchar(45) NOT NULL,
  `Salary` float NOT NULL,
  PRIMARY KEY (`Employee ID`),
  KEY `fk_Employee_Zoo_idx` (`Zoo ID`),
  KEY `fk_Employee_Shop1_idx` (`Shop ID`),
  KEY `fk_Employee_Exhibits1_idx` (`Enclosure ID`),
  CONSTRAINT `fk_Employee_Exhibits1` FOREIGN KEY (`Enclosure ID`) REFERENCES `enclosure` (`Enclosure`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Employee_Shop1` FOREIGN KEY (`Shop ID`) REFERENCES `shop` (`Shop ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Employee_Zoo` FOREIGN KEY (`Zoo ID`) REFERENCES `zoo` (`Zoo ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=471 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (7,1,NULL,2,'Roberto','Paige','Roberto Paige','Cashier','2017-03-24','Morning',10.25),(9,1,NULL,2,'Luke','Hart','','Cook','2017-03-27','Evening',12.75),(10,1,NULL,2,'Anne','Wilkins','','Cashier','2017-03-27','Evening',10.5),(11,1,3,NULL,'Jack','Bauer','','Animal Care Taker','2017-03-27','Morning',12.5),(12,1,4,NULL,'Wanda','Rutherford','','Animal Care Taker','2017-03-27','Evening',12.5),(13,1,5,NULL,'Alexandra','Roberts','','Animal Care Taker','2017-03-27','Morning',12.5),(14,1,6,NULL,'Kevin','Sutherland','','Animal Care Taker','2017-03-27','Evening',12.5),(15,1,7,NULL,'Gordon','Peake','','Animal Care Taker','2017-03-27','Morning',12.5),(16,1,8,NULL,'Cameron','Black','','Animal Care Taker','2017-03-27','Evening',12.5),(17,1,9,NULL,'Melanie','King','','Animal Care Taker','2017-03-27','Morning',12.5),(18,1,10,NULL,'Jennifer','Clarkson','','Animal Care Taker','2017-03-27','Evening',12.5),(19,1,11,NULL,'Lucas','Graham','','Animal Care Taker','2017-03-27','Morning',12.5),(212,1,NULL,3,'Jennifer','Snow','','Cashier','2017-03-30','Morning',10.25),(282,1,NULL,1,'Kimberly','Go','','Cashier','2017-03-31','Morning',9.5),(292,1,NULL,2,'Ryan','Turner','','Cook','2017-03-31','Morning',13.5),(312,1,10,1,'Harry','Potter','','Animal Care Taker','2017-03-31','Evening',11.3),(392,1,15,NULL,'Josh','Riot','','Cashier','2017-03-31','Morning',9.6),(412,1,10,NULL,'Cory','Yu','','Cashier','2017-03-31','Evening',10.8),(432,1,12,NULL,'Liz','Roe','','Animal Care Taker','2017-03-31','Evening',11.2),(462,1,5,NULL,'Anna','Pham','','Cashier','2017-03-31','Evening',12.25),(463,1,5,NULL,'Lizzie','Moe','Lizzie  Moe','Cashier','2017-01-05','Morning',13.35),(464,1,12,NULL,'Ryan','Gonzalez','Ryan Gonzalez','Animal Care Taker','2017-02-14','Morning',13.2),(467,1,12,NULL,'Roy','Cullen','Roy Cullen','Manager','2016-06-08','Morning',26.55),(470,1,NULL,1,'Terry','Colby','Terry Colby','Manager','2016-11-30','Evening',31.6);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `heroku_db65f8e9326be4b`.`employee_BEFORE_INSERT` BEFORE INSERT ON `employee` FOR EACH ROW
BEGIN
	DECLARE msg VARCHAR(255);
    DECLARE msg2 VARCHAR(255);
	IF NEW.Salary < 7.25           
	THEN 
		SET msg = 'Violation of Minimum Employee Salary.' ;
		SIGNAL SQLSTATE '45000' SET message_text = msg ;
	ELSE IF (NEW.`Job Desciption` = "Manager" && New.Salary < 25)
    THEN
		SET msg2 = 'Violation of Minimum Manager Salary.' ;
		SIGNAL SQLSTATE '45000' SET message_text = msg2 ;
	END IF;
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `heroku_db65f8e9326be4b`.`employee_BEFORE_UPDATE` BEFORE UPDATE ON `employee` FOR EACH ROW
BEGIN
	DECLARE msg VARCHAR(255);
    DECLARE msg2 VARCHAR(255);
	IF NEW.Salary < 7.25           
	THEN 
		SET msg = 'Violation of Minimum Employee Salary.' ;
		SIGNAL SQLSTATE '45000' SET message_text = msg ;
	ELSE IF (NEW.`Job Desciption` = "Manager" && New.Salary < 25)
    THEN
		SET msg2 = 'Violation of Minimum Manager Salary.' ;
		SIGNAL SQLSTATE '45000' SET message_text = msg2 ;
	END IF;
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `enclosure`
--

DROP TABLE IF EXISTS `enclosure`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enclosure` (
  `Enclosure` int(11) NOT NULL AUTO_INCREMENT,
  `Exhibit ID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Location` varchar(45) NOT NULL,
  `Capacity` int(11) NOT NULL,
  `Feeding Allowed` tinyint(1) NOT NULL,
  PRIMARY KEY (`Enclosure`),
  KEY `fk_Enclosure_Exhibit1_idx` (`Exhibit ID`),
  CONSTRAINT `fk_Enclosure_Exhibit1` FOREIGN KEY (`Exhibit ID`) REFERENCES `exhibit` (`Exhibit ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enclosure`
--

LOCK TABLES `enclosure` WRITE;
/*!40000 ALTER TABLE `enclosure` DISABLE KEYS */;
INSERT INTO `enclosure` VALUES (1,1,'Lion House','Lion','Region 4',3,0),(2,1,'Bobcat House','Bobcat','Region 4',2,0),(3,2,'Falmingo House','American Flamingo','Region 2',10,0),(4,2,'Rhea House','Greater Rhea','Region 2',5,0),(5,3,'Wolf House','Gray Wolf','Region 3',2,0),(6,3,'Beaver House','American Beaver','Region 3',3,0),(7,4,'Cheetah House','Cheetah','Region 5',2,0),(8,4,'Zebra House','Grevy\'s Zebra','Region 5',5,0),(9,5,'Elephant House','Asian Elephant','Region 4',2,0),(10,6,'Reptile House','American Alligator, Komodo Dragon','Region 6',3,0),(11,6,'Snake House','Burmese Rock Python','Region 6',2,0),(12,7,'Fish House','Japanese Koi','Region 1',15,0),(13,7,'Donkey House','Donkey','Region 1',3,0),(14,8,'Gorilla','Western Lowland Gorilla','Region 7',3,0),(15,8,'Orangutan House','Orangutan','Region 7',3,0);
/*!40000 ALTER TABLE `enclosure` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exhibit`
--

DROP TABLE IF EXISTS `exhibit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exhibit` (
  `Exhibit ID` int(11) NOT NULL AUTO_INCREMENT,
  `Zoo ID` int(11) NOT NULL,
  `Description` varchar(45) NOT NULL,
  `VIP Access` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Exhibit ID`),
  KEY `fk_Exhibit_Zoo1_idx` (`Zoo ID`),
  CONSTRAINT `fk_Exhibit_Zoo1` FOREIGN KEY (`Zoo ID`) REFERENCES `zoo` (`Zoo ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exhibit`
--

LOCK TABLES `exhibit` WRITE;
/*!40000 ALTER TABLE `exhibit` DISABLE KEYS */;
INSERT INTO `exhibit` VALUES (1,1,'Great Cats',0),(2,1,'Bird House',0),(3,1,'American Trail',0),(4,1,'Cheetah Conservation Statio',0),(5,1,'Elephant Trail',0),(6,1,'Reptile Center',0),(7,1,'Fish House',0),(8,1,'Primates',0),(9,1,'Photo Booth',0);
/*!40000 ALTER TABLE `exhibit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `Order ID` int(11) NOT NULL AUTO_INCREMENT,
  `Shop ID` int(11) NOT NULL,
  `Customer ID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  `Payment Type` varchar(45) NOT NULL,
  `Payment Amount` double NOT NULL,
  PRIMARY KEY (`Order ID`),
  KEY `fk_Orders_Customers1_idx` (`Customer ID`),
  KEY `fk_Orders_Shop1_idx` (`Shop ID`),
  CONSTRAINT `fk_Orders_Customers1` FOREIGN KEY (`Customer ID`) REFERENCES `customers` (`Customer ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Orders_Shop1` FOREIGN KEY (`Shop ID`) REFERENCES `shop` (`Shop ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1357 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,1,'2017-03-22','11:52:00','Cash',20),(2,2,1,'2017-03-22','13:18:00','Credit Card',16.38),(3,3,1,'2017-03-22','15:40:00','Credit Card',8.5),(4,1,2,'2017-03-22','10:30:00','Credit Card',40),(5,2,2,'2017-03-22','14:14:00','Cash',7.58),(6,3,2,'2017-03-22','15:27:00','Cash',12.5),(7,1,3,'2017-03-23','09:44:32','Credit Card',20),(8,2,3,'2017-03-23','12:22:35','Credit Card',44.6),(9,3,3,'2017-03-23','16:42:11','Cash',13.5),(10,1,4,'2017-03-24','10:33:12','',30),(11,2,4,'2017-03-24','14:46:22','',15.88),(12,1,5,'2017-03-24','09:33:12','',50),(13,3,5,'2017-03-24','12:23:22','',9.88),(14,1,6,'2017-03-24','09:12:44','',40),(15,2,6,'2017-03-24','12:42:11','',14.77),(16,3,6,'2017-03-24','14:37:55','',5.77),(17,1,7,'2017-03-25','09:55:43','',30),(18,2,7,'2017-03-25','11:35:44','',22.5),(19,1,8,'2017-03-25','10:05:29','',60),(20,2,8,'2017-03-25','13:11:53','',44.65),(21,3,8,'2017-03-25','14:25:14','',13.88),(32,12,32,'2017-04-05','14:52:00','Check',300000),(42,12,42,'2017-04-01','08:52:00','Check',540000),(52,12,52,'2017-04-12','14:52:00','Check',200000),(62,12,42,'2017-04-06','07:52:00','Check',20000),(68,3,25,'2017-03-25','08:03:00','Cash',10.29),(78,1,25,'2017-03-25','12:09:00','Credit Card',15.62),(102,3,21,'2017-03-03','05:35:00','Cash',21.02),(154,2,16,'2017-03-07','13:45:00','Credit Card',11.26),(156,3,11,'2017-01-24','16:11:00','Cash',28.99),(198,3,17,'2017-03-07','09:56:00','Cash',21.12),(325,2,42,'2017-02-03','15:04:00','Cash',19.89),(355,2,5,'2017-01-20','01:51:00','Credit Card',8.52),(456,2,18,'2017-03-09','10:06:00','Credit Card',13.47),(654,3,20,'2017-02-24','13:38:00','Check',15.25),(684,1,20,'2017-02-24','11:10:00','Check',10),(702,3,25,'2017-04-06','07:52:00','Cash',13.76),(712,3,25,'2017-03-25','08:03:00','Cash',10.29),(722,1,25,'2017-03-25','12:09:00','Credit Card',15.62),(732,3,21,'2017-03-03','05:35:00','Cash',21.02),(742,2,16,'2017-03-07','13:45:00','Credit Card',11.26),(752,3,17,'2017-03-07','09:56:00','Cash',21.12),(762,2,18,'2017-03-09','10:06:00','Credit Card',13.47),(782,3,25,'2017-03-25','08:03:00','Cash',10.29),(792,1,25,'2017-03-25','12:09:00','Credit Card',15.62),(802,3,21,'2017-03-03','05:35:00','Cash',21.02),(812,2,16,'2017-03-07','13:45:00','Credit Card',11.26),(822,3,17,'2017-03-07','09:56:00','Cash',21.12),(832,2,18,'2017-03-09','10:06:00','Credit Card',13.47),(852,3,25,'2017-03-25','08:03:00','Cash',10.29),(862,1,25,'2017-03-25','12:09:00','Credit Card',15.62),(872,3,21,'2017-03-03','05:35:00','Cash',21.02),(882,2,16,'2017-03-07','13:45:00','Credit Card',11.26),(892,3,17,'2017-03-07','09:56:00','Cash',21.12),(902,2,18,'2017-03-09','10:06:00','Credit Card',13.47),(922,3,25,'2017-03-25','08:03:00','Cash',10.29),(932,1,25,'2017-03-25','12:09:00','Credit Card',15.62),(942,3,21,'2017-03-03','05:35:00','Cash',21.02),(952,2,16,'2017-03-07','13:45:00','Credit Card',11.26),(962,3,17,'2017-03-07','09:56:00','Cash',21.12),(972,2,18,'2017-03-09','10:06:00','Credit Card',13.47),(1062,2,5,'2017-01-20','01:51:00','Credit Card',9.52),(1082,3,22,'2016-03-01','05:35:00','Cash',28.05),(1092,3,23,'2016-03-21','08:03:00','Cash',18.29),(1102,3,18,'2016-03-05','13:45:00','Credit Card',11.26),(1112,1,18,'2016-03-05','09:56:00','Cash',21.12),(1122,1,9,'2016-03-09','10:06:00','Credit Card',23.47),(1142,1,42,'2016-02-03','15:04:00','Cash',19.74),(1152,2,20,'2017-01-24','11:10:00','Check',10.1),(1162,2,20,'2017-01-24','11:10:00','Check',10.1),(1172,2,20,'2017-01-24','13:38:00','Check',15.21),(1182,2,11,'2017-01-04','16:11:00','Cash',18.99),(1192,2,5,'2017-01-20','01:51:00','Credit Card',9.52),(1202,2,5,'2017-01-20','01:51:00','Credit Card',9.52),(1212,2,6,'2016-05-29','15:19:00','Credit Card',17.02),(1222,2,2,'2016-05-01','08:35:00','Cash',27.07),(1232,2,3,'2016-05-21','05:04:00','Cash',18.12),(1242,2,8,'2016-05-05','20:49:00','Credit Card',11.63),(1252,3,8,'2016-10-05','09:50:00','Cash',31.12),(1262,3,19,'2016-06-09','10:03:00','Credit Card',23.78),(1272,3,25,'2016-07-14','18:37:00','Credit Card',32.25),(1282,3,22,'2016-08-03','15:24:00','Cash',17.64),(1292,1,20,'2016-09-24','11:11:00','Check',13.3),(1302,1,20,'2016-09-24','13:13:00','Check',15.21),(1312,1,11,'2016-09-04','00:00:00','Cash',18.89),(1322,1,5,'2017-02-21','01:01:00','Credit Card',10.52),(1323,2,6,'2017-04-13','12:00:00','Cash',25.45),(1324,3,17,'2017-04-10','13:52:52','Credit Card',12.78),(1325,3,11,'2017-04-09','15:02:03','Credit Card',38.45),(1326,2,11,'2017-04-05','15:14:00','Cash',29.25),(1327,2,8,'2016-05-05','21:49:00','Credit Card',14.63),(1328,3,8,'2016-10-05','09:50:00','Credit Card',31.92),(1329,3,19,'2017-04-19','10:03:00','Credit Card',28.78),(1330,3,25,'2017-04-19','18:37:00','Check',39.25),(1331,3,22,'2017-04-19','15:24:00','Check',41.34),(1332,1,20,'2017-04-19','11:11:00','Cash',23.3),(1333,1,20,'2017-04-19','13:43:00','Cash',15.61),(1334,2,8,'2016-05-05','21:49:00','Credit Card',14.63),(1335,3,8,'2016-10-05','09:50:00','Credit Card',31.92),(1336,3,19,'2017-04-19','10:03:00','Credit Card',28.78),(1337,3,25,'2017-04-19','18:37:00','Check',39.25),(1338,3,22,'2017-04-19','15:24:00','Check',41.34),(1339,1,20,'2017-04-19','11:11:00','Cash',23.3),(1340,1,20,'2017-04-19','13:43:00','Cash',15.61),(1341,1,11,'2017-04-19','16:51:00','Check',12.89),(1342,1,5,'2017-04-19','01:01:00','Credit Card',5.52),(1343,2,6,'2017-04-19','15:59:00','Credit Card',16.02),(1344,2,2,'2017-04-19','09:35:00','Cash',27.56),(1345,2,3,'2017-04-19','05:04:00','Cash',17.16),(1346,2,6,'2017-04-18','15:59:00','Credit Card',16.02),(1347,2,2,'2017-04-18','09:35:00','Cash',27.56),(1348,2,3,'2017-04-18','05:04:00','Cash',17.16),(1349,2,8,'2017-04-18','21:49:00','Credit Card',14.63),(1350,3,8,'2017-04-18','09:50:00','Credit Card',31.92),(1351,3,19,'2017-04-18','10:03:00','Credit Card',28.78),(1352,3,25,'2017-04-18','18:37:00','Check',39.25),(1353,3,22,'2017-04-18','15:24:00','Check',41.34),(1354,1,20,'2017-04-18','11:11:00','Cash',23.3),(1355,1,20,'2017-04-18','13:43:00','Cash',15.61),(1356,1,11,'2017-04-18','16:41:00','Check',12.89);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shop` (
  `Shop ID` int(11) NOT NULL AUTO_INCREMENT,
  `Zoo ID` int(11) NOT NULL,
  `Shop Type ID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Location` varchar(45) NOT NULL,
  PRIMARY KEY (`Shop ID`),
  KEY `fk_Shop_Zoo1_idx` (`Zoo ID`),
  KEY `fk_Shop_Shop Type1_idx` (`Shop Type ID`),
  CONSTRAINT `fk_Shop_Shop Type1` FOREIGN KEY (`Shop Type ID`) REFERENCES `shop type` (`Shop Type ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Shop_Zoo1` FOREIGN KEY (`Zoo ID`) REFERENCES `zoo` (`Zoo ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES (1,1,1,'Zoo Entrance Ticket Booth','Region 1'),(2,1,2,'Cafe Zoo','Region 5'),(3,1,3,'GiftsnAnimals','Region 3'),(12,1,22,'Donations Center','Region 1');
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop type`
--

DROP TABLE IF EXISTS `shop type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shop type` (
  `Shop Type ID` int(11) NOT NULL AUTO_INCREMENT,
  `Type` varchar(45) NOT NULL,
  PRIMARY KEY (`Shop Type ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop type`
--

LOCK TABLES `shop type` WRITE;
/*!40000 ALTER TABLE `shop type` DISABLE KEYS */;
INSERT INTO `shop type` VALUES (1,'Ticket Booth'),(2,'Restaurant'),(3,'Gift Shop'),(22,'Donations');
/*!40000 ALTER TABLE `shop type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zoo`
--

DROP TABLE IF EXISTS `zoo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zoo` (
  `Zoo ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Street Address` varchar(45) NOT NULL,
  `Zip Code` varchar(45) NOT NULL,
  `City` varchar(45) NOT NULL,
  `State` varchar(45) NOT NULL,
  `Phone` varchar(12) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Operation Hours` varchar(200) NOT NULL,
  PRIMARY KEY (`Zoo ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zoo`
--

LOCK TABLES `zoo` WRITE;
/*!40000 ALTER TABLE `zoo` DISABLE KEYS */;
INSERT INTO `zoo` VALUES (1,'UH ZOO','4800 Calhoun Rd','77004','Houston','TX','713-743-2255','sample@email.com','08:00 - 20:00');
/*!40000 ALTER TABLE `zoo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'heroku_db65f8e9326be4b'
--

--
-- Dumping routines for database 'heroku_db65f8e9326be4b'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-15 22:02:52
