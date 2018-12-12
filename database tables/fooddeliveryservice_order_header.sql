-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: fooddeliveryservice
-- ------------------------------------------------------
-- Server version	8.0.13

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
-- Table structure for table `order_header`
--

DROP TABLE IF EXISTS `order_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `order_header` (
  `OrderID` varchar(50) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `DeliveryFirstName` varchar(50) NOT NULL,
  `DeliveryLastName` varchar(50) NOT NULL,
  `DeliveryAddress` varchar(50) NOT NULL,
  `DeliveryCity` varchar(50) NOT NULL,
  `DeliveryState` varchar(50) NOT NULL,
  `DeliveryZipCode` varchar(50) NOT NULL,
  `DeliveryPhone` varchar(50) NOT NULL,
  `Comments` longtext,
  `OrderSubmissionTime` int(11) NOT NULL,
  `InitialEstimatedDeliveryTime` int(11) NOT NULL,
  `ActualDeliveryTime` int(11) DEFAULT NULL,
  `KitchenCookTime` int(11) NOT NULL,
  `KitchenFinishCookTime` int(11) DEFAULT NULL,
  `DeliveryFinishTime` int(11) DEFAULT NULL,
  `DeliveryTravelDistance` double NOT NULL,
  `DeliveryTravelTime` int(11) NOT NULL,
  `TotalPrice` double NOT NULL,
  `OrderStatus` varchar(50) NOT NULL,
  PRIMARY KEY (`OrderID`,`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_header`
--

LOCK TABLES `order_header` WRITE;
/*!40000 ALTER TABLE `order_header` DISABLE KEYS */;
INSERT INTO `order_header` VALUES ('1','Username1','John','Doe','1st Street','Rochester','MI','48307','555-5555','No',1543275279,1543276279,NULL,900,1543881653,1544573353,10,100,10.5,'delivery_in_progress'),('10','user','John','Doe','1 First St','Rochester','MI','48307','8888888888','',1544571252,1544572649,1544572649,360,0,0,9732,857,8.48,'kitchen_in_progress'),('2','Username2','Jane','Doe','2nd Street','Rochester','MI','48307','555-5555','No',1543277387,1543279387,NULL,180,1544383296,NULL,15,200,12,'completed'),('3','Tester1','A','B','3rd Street','Rochester','MI','48307','555-555','Yes',1543689477,1543699477,NULL,300,NULL,NULL,4,300,9,'customer_submitted'),('4','user','C','D','4th Street','Rochester','MI','48307','555-555-5555','Y',1543689477,1543699477,1543899477,300,NULL,NULL,4,300,9,'completed'),('5','user','C','D','4th Street','Rochester','MI','48307','555-555-555','N',1543689477,1543699477,1544573251,300,1544390716,1544573537,4,300,9,'completed'),('6','Tester1','Bob','Dole','Tienken Rd','Auburn Hills','MI','48307','666-666-6666','as',1544308939,1544310653,1544568901,600,1544383394,1544565103,11486,934,16.96,'kitchen_completes'),('7','Tester1','Bob','Dole','Tienken Rd','Auburn Hills','MI','48307','666-666-6666','as',1544311684,1544313398,0,600,0,0,11486,934,16.96,'customer_submitted'),('8','user','John','Doe','1 First St','Rochester','MI','48307','8888888888','',1544570909,1544572306,0,360,0,0,9732,857,15.9,'customer_submitted'),('9','user','John','Doe','1 First St','Rochester','MI','48307','8888888888','',1544570962,1544572359,0,360,0,0,9732,857,15.9,'completed');
/*!40000 ALTER TABLE `order_header` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-11 19:23:14
