-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: prueba
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aeropuertos`
--

DROP TABLE IF EXISTS `aeropuertos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aeropuertos` (
  `id` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `codigo_iata` varchar(5) NOT NULL,
  `id_ciudad` varchar(5) DEFAULT NULL,
  `id_pais` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_aeropuertos_ciudades_idx` (`id_ciudad`),
  KEY `fk_aeropuertos_paises_idx` (`id_pais`),
  CONSTRAINT `fk_aeropuertos_ciudades` FOREIGN KEY (`id_ciudad`) REFERENCES `ciudades` (`id`),
  CONSTRAINT `fk_aeropuertos_paises` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aeropuertos`
--

LOCK TABLES `aeropuertos` WRITE;
/*!40000 ALTER TABLE `aeropuertos` DISABLE KEYS */;
INSERT INTO `aeropuertos` VALUES (1,'A Coruña','LCG','LACO','ES'),(2,'Alicante','ALC','ALIC','ES'),(3,'Almeria','LEI','ALME','ES'),(4,'Asturias','OVD','AVIL','ES'),(5,'Barcelona','BCN','BARC','ES'),(6,'Bilbao','BIO','BILB','ES'),(7,'Castellon de la Plana','CDT','CDTA','ES'),(8,'Jerez','XRY','JERE','ES'),(9,'Zaragoza','ZAZ','ZARA','ES'),(10,'Badajoz','BJZ','BADA','ES'),(11,'San Sebastian','EAS','SANS','ES'),(12,'Fuerteventura','FUE','FUER','ES'),(13,'Girona','GRO','GERO','ES'),(14,'Granada','GRX','GRAO','ES'),(15,'Huesca','HSK','HSKA','ES'),(16,'Ibiza','IBZ','IBIZ','ES'),(17,'Leon','LEN','LEON','ES'),(18,'Seo De Urgel De La Seu','LEU','SEOD','ES'),(19,'Madrid Torrejon Afb','TOJ','MADR','ES'),(20,'Murcia','MJV','MURC','ES'),(21,'Cordoba','ODB','CORD','ES'),(22,'Palma de Mallorca','PMI','PALM','ES'),(23,'Pamplona','PNA','PAMP','ES'),(24,'Reus','REU','REUS','ES'),(25,'Burgos','RGS','RGSA','ES'),(26,'Santiago de Compostela','SCQ','SANC','ES'),(27,'Santander','SDR','SANT','ES'),(28,'Salamanca Matacan','SLM','SALA','ES'),(29,'Sevilla','SVQ','SEVI','ES'),(30,'Tenerife Norte','TFN','TENE','ES'),(31,'Tenerife Sur','TFS','TENE','ES'),(32,'Vigo','VGO','VIGO','ES'),(33,'Vitoria','VIT','VITO','ES'),(34,'Valencia','VLC','VALE','ES'),(35,'Valladolid','VLL','VALL','ES'),(36,'Malaga','AGP','MALA','ES'),(37,'Moron','OZP','OZPA','ES'),(38,'Logroño','RJL','LOGR','ES'),(39,'Valverde Hierro','VDE','VALV','ES'),(40,'Albacete','ABC','ABCA','ES'),(41,'Ciudad Real','CQM','CQMA','ES'),(42,'Torremolinos','UTL','TORR','ES'),(43,'Puerto de Santa Maria','PXS','PXSA','ES'),(44,'Fuengirola','FGR','FGRA','ES'),(45,'Castellon de la Plana','CDT','CDTA','ES'),(46,'Ronda','RRA','RRAA','ES'),(47,'Lleida','ILD','LLEI','ES'),(48,'Huelva','HEV','HEVA','ES'),(49,'San Fernando','FES','FESA','ES'),(50,'Montilla','OZU','OZUA','ES'),(51,'Algeciras','AEI','AEIA','ES'),(52,'La Palma Del Condado','NDO','NDOA','ES'),(53,'Puertollano','UER','UERA','ES'),(54,'Ceuta','JCU','CEUT','ES'),(55,'Region de Murcia','RMU','RMUA','ES'),(56,'Melilla','MLN','MELI','ES'),(57,'San Pablo','SPO','SPOA','ES'),(58,'Gran Canaria Las Palmas','LPA','GRAN','ES'),(59,'La Palma','SPC','LAPA','ES'),(60,'La Gomera Tenerife','GMZ','LAGO','ES'),(61,'Lanzarote','ACE','ARRE','ES'),(62,'Menorca','MAH','MENO','ES'),(63,'Bobadilla','OZI','OZIA','ES'),(64,'Madrid','MAD','MADR','ES');
/*!40000 ALTER TABLE `aeropuertos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudades`
--

DROP TABLE IF EXISTS `ciudades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudades` (
  `id` varchar(10) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `id_pais` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ciudades_paises_idx` (`id_pais`),
  CONSTRAINT `fk_ciudades_paises` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudades`
--

LOCK TABLES `ciudades` WRITE;
/*!40000 ALTER TABLE `ciudades` DISABLE KEYS */;
INSERT INTO `ciudades` VALUES ('ABCA','Albacete','ES'),('AEIA','Algeciras','ES'),('ALIC','Alicante','ES'),('ALME','Almeria','ES'),('ARRE','Lanzarote','ES'),('AVIL','Asturias','ES'),('BADA','Badajoz','ES'),('BARC','Barcelona','ES'),('BILB','Bilbao','ES'),('CDTA','Castellon de la Plana','ES'),('CEUT','Ceuta','ES'),('CORD','Cordoba','ES'),('CQMA','Ciudad Real','ES'),('FESA','San Fernando','ES'),('FGRA','Fuengirola','ES'),('FUER','Fuerteventura','ES'),('GERO','Girona','ES'),('GRAN','Gran Canaria','ES'),('GRAO','Granada','ES'),('HEVA','Huelva','ES'),('HSKA','Huesca','ES'),('IBIZ','Ibiza','ES'),('JERE','Jerez','ES'),('LACO','A Coruña','ES'),('LAGO','La Gomera Tenerife','ES'),('LAPA','La Palma','ES'),('LEON','Leon','ES'),('LLEI','Lleida','ES'),('LOGR','Logroño','ES'),('MADR','Madrid','ES'),('MALA','Malaga','ES'),('Meli','Melilla','ES'),('MENO','Menorca','ES'),('MURC','Murcia','ES'),('NDOA','La Palma Del Condado','ES'),('OZIA','Terra Cha','ES'),('OZPA','Moron','ES'),('OZUA','Montilla','ES'),('PALM','Palma de Mallorca','ES'),('PAMP','Pamplona','ES'),('PXSA','Puerto De Santa Maria','ES'),('REUS','Reus','ES'),('RGSA','Burgos','ES'),('RMUA','Corvera','ES'),('RRAA','Ronda','ES'),('SALA','Salamanca','ES'),('SANC','Santiago de Compostela','ES'),('SANS','San Sebastian','ES'),('SANT','Santander','ES'),('SEOD','Seo De Urgel De La Seu','ES'),('SEVI','Sevilla','ES'),('SPOA','San Pablo','ES'),('TENE','Tenerife','ES'),('TORR','Torremolinos','ES'),('UERA','Puertollano','ES'),('VALE','Valencia','ES'),('VALL','Valladolid','ES'),('VALV','Valverde Hierro','ES'),('VIGO','Vigo','ES'),('VITO','Vitoria','ES'),('ZARA','Zaragoza','ES');
/*!40000 ALTER TABLE `ciudades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clases`
--

DROP TABLE IF EXISTS `clases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clases` (
  `id` tinyint NOT NULL,
  `nombre` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clases`
--

LOCK TABLES `clases` WRITE;
/*!40000 ALTER TABLE `clases` DISABLE KEYS */;
INSERT INTO `clases` VALUES (1,'PRIMERA'),(2,'NEGOCIOS'),(3,'ECONOMICA');
/*!40000 ALTER TABLE `clases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paises`
--

DROP TABLE IF EXISTS `paises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paises` (
  `id` varchar(10) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paises`
--

LOCK TABLES `paises` WRITE;
/*!40000 ALTER TABLE `paises` DISABLE KEYS */;
INSERT INTO `paises` VALUES ('ES','España');
/*!40000 ALTER TABLE `paises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pasajeros`
--

DROP TABLE IF EXISTS `pasajeros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pasajeros` (
  `id` tinyint NOT NULL,
  `nombre` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pasajeros`
--

LOCK TABLES `pasajeros` WRITE;
/*!40000 ALTER TABLE `pasajeros` DISABLE KEYS */;
INSERT INTO `pasajeros` VALUES (1,'ADULTO'),(2,'NIÑO'),(3,'BEBE');
/*!40000 ALTER TABLE `pasajeros` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-11 20:45:13
