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
-- Table structure for table `food_items`
--

DROP TABLE IF EXISTS `food_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `food_items` (
  `FoodID` text NOT NULL,
  `FoodName` text NOT NULL,
  `FoodDescription` text NOT NULL,
  `FoodPrepTime` int(11) NOT NULL,
  `FoodPrice` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_items`
--

LOCK TABLES `food_items` WRITE;
/*!40000 ALTER TABLE `food_items` DISABLE KEYS */;
INSERT INTO `food_items` VALUES ('1','Classic Quarter Chicken Dinner','Enjoy a quarter of our famous slow roasted Rotisserie Chicken with our Signature Dipping Sauce.',180,7),('3','Double Leg Dinner','Enjoy a double leg of our famous slow roasted Rotisserie Chicken with our Signature Dipping Sauce.',240,9),('4','Quarter Chicken & Shrimp Dinner','Enjoy a quarter of our famous slow roasted Rotisserie Chicken paired with ten sautéed shrimp. ',600,12),('5','VEGGIE','Mushrooms, Green Peppers, Mild Peppers, Tomatoes, Onions & Black Olives & Mozzarella Cheese',600,10),('6','BBQ CHICKEN','Grilled Chicken, Onions, BBQ Sauce & Mozzarella Cheese',720,13),('7','HAWAIIAN Beef','Beef, Pineapple & Mozzarella Cheese',900,15),('8','CRISPY CHICKEN','It has pickles, tomatoes, lettuce, onion and ranch. ',360,8),('9','GOURMET CHEESEBURGER','It has tomatoes, onions, lettuce, pickles, mayo, mushroom, and swiss cheese.',600,8),('2','Half Chicken Dinner','Enjoy a half of our famous slow roasted Rotisserie Chicken with our Signature Dipping Sauce.',240,10);
/*!40000 ALTER TABLE `food_items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-03 19:58:06
