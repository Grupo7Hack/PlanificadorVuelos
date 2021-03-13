-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: proyecto
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
-- Table structure for table `activacion_usuarios`
--

DROP TABLE IF EXISTS `activacion_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activacion_usuarios` (
  `id_activacion` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned DEFAULT NULL,
  `codigo_activacion` varchar(64) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_activacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id_activacion`),
  KEY `activacionusuarios_id_usuario_fk1` (`id_usuario`),
  CONSTRAINT `activacionusuarios_id_usuario_fk1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activacion_usuarios`
--

LOCK TABLES `activacion_usuarios` WRITE;
/*!40000 ALTER TABLE `activacion_usuarios` DISABLE KEYS */;
INSERT INTO `activacion_usuarios` VALUES (1,10,'5681dd11ff7584b496b30a31e658c69835e544a5f3b1beb5e37923f6916d9f76','2021-02-02 18:06:06',NULL),(2,11,'5e6bd507e59488dd4a3a4e38337a5ad554806ac60c236ad0c88a73881fe8d86d','2021-02-02 18:16:30',NULL),(4,13,'160d8a90626e63a93777a841a806682d8ad03e1dafd9d44b1a35671e71b3d67e','2021-02-02 18:58:35',NULL),(9,4,'f8511b9d2fb2381a99ed073666c5ae95918086c55dc1ae679193317bb0e83af0','2021-02-07 18:51:17',NULL),(12,14,'893e42e0e646de4c0046661cc72b7d735f9c0938d1f2d5f8cf20a706501260c1','2021-02-12 16:29:15',NULL),(13,1,'be009a779792205990db8ae4c190e0f9e8da4dc68992877b5c7c0e0e3c426638','2021-02-12 16:30:56',NULL),(14,27,'1e1b004fbb7c45e6069414f8f17a1fe2547005e6d7322864e090d9b4dfa17cec','2021-03-06 12:12:44',NULL),(15,28,'856f5397aa40abbf97716ff6eef3bd6e09bd8e79f98cd8474ef9879b2b0b65e7','2021-03-07 12:24:35',NULL),(16,29,'2cc949cb4e708ade7b4eb4eda6a5ff2f8726c5061c366ea2843c55e707cfc83c','2021-03-07 12:57:30',NULL),(17,30,'ed1ccd7c55b373ccf1a476bb935377ed2da979309e6ea8809188d2a5f4b1f3cb','2021-03-07 13:26:28',NULL),(18,31,'698612b7a600308a6bd20a5a36268d743be62b3185dbce767caea1f517b65018','2021-03-07 13:29:13',NULL),(19,32,'5b197ce493375880344b11977f151fd786ac0ab8ecfd38a368bee24930d2edb3','2021-03-07 13:35:22',NULL),(20,33,'54b30985e5f226e125bdb6c474bc20cad6d3aaac5a57b453505019e63ef48fb9','2021-03-07 14:04:36',NULL),(21,34,'359065dd534b9e501f4af25c2b971a2ed83daa168502933b9b3e12ddc09bf64f','2021-03-07 16:12:17',NULL);
/*!40000 ALTER TABLE `activacion_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Table structure for table `escalas`
--

DROP TABLE IF EXISTS `escalas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `escalas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_reserva` int unsigned DEFAULT NULL,
  `origen` varchar(100) DEFAULT NULL,
  `destino` varchar(100) DEFAULT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `duracion` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `escalas_idreserva_fk` (`id_reserva`),
  CONSTRAINT `escalas_idreserva_fk` FOREIGN KEY (`id_reserva`) REFERENCES `reservas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escalas`
--

LOCK TABLES `escalas` WRITE;
/*!40000 ALTER TABLE `escalas` DISABLE KEYS */;
/*!40000 ALTER TABLE `escalas` ENABLE KEYS */;
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

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_usuario` int unsigned DEFAULT NULL,
  `fecha_reserva` datetime DEFAULT NULL,
  `origen` varchar(100) DEFAULT NULL,
  `destino` varchar(100) DEFAULT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_fin` datetime DEFAULT NULL,
  `escalas` tinyint DEFAULT NULL,
  `precio` decimal(7,2) DEFAULT NULL,
  `num_adultos` tinyint DEFAULT NULL,
  `num_ninos` tinyint DEFAULT NULL,
  `num_bebes` tinyint DEFAULT NULL,
  `id_aerolinea` smallint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `reservas_idusuario_fk` (`id_usuario`),
  CONSTRAINT `reservas_idusuario_fk` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,9,'2021-02-18 20:18:21','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(2,9,'2021-02-18 20:19:12','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(3,9,'2021-02-18 20:19:55','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(4,9,'2021-02-18 20:20:12','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(5,9,'2021-02-18 20:20:31','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(6,9,'2021-02-18 20:22:41','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(7,9,'2021-02-18 21:23:56','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(8,9,'2021-02-18 21:24:11','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(9,9,'2021-02-18 21:45:35','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(10,9,'2021-02-20 11:38:42','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(11,9,'2021-02-20 11:40:38','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(12,9,'2021-02-20 11:41:01','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(13,9,'2021-02-20 11:42:44','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(14,9,'2021-02-20 11:42:58','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(15,9,'2021-02-20 11:43:49','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(16,9,'2021-02-20 11:44:42','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,1,NULL,NULL,1234),(17,9,'2021-02-20 11:46:35','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(18,9,'2021-02-20 11:47:42','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(19,9,'2021-02-20 11:49:23','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(20,9,'2021-02-20 11:50:22','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(21,9,'2021-02-20 11:51:39','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(22,9,'2021-02-20 11:51:57','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(23,9,'2021-02-20 11:53:07','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(24,9,'2021-02-20 11:54:58','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(25,9,'2021-02-20 11:55:26','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(26,9,'2021-02-20 12:00:34','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(27,9,'2021-02-20 12:00:57','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(28,9,'2021-02-20 12:02:29','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(29,7,'2021-02-20 12:05:27','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(30,7,'2021-02-20 12:06:50','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(31,9,'2021-02-20 12:08:19','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(32,9,'2021-02-20 12:10:36','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(33,9,'2021-02-20 12:42:08','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(34,9,'2021-02-20 12:42:48','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(35,9,'2021-02-20 12:43:35','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(36,9,'2021-02-20 12:44:10','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(37,9,'2021-02-20 12:46:56','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(38,9,'2021-02-20 12:48:03','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234),(39,9,'2021-02-23 16:39:17','MAD','TFN','2020-05-05 00:00:00','2020-06-08 00:00:00',0,507.50,2,NULL,NULL,1234);
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `contraseña` varchar(100) DEFAULT NULL,
  `foto` varchar(400) DEFAULT NULL,
  `role` varchar(6) DEFAULT NULL,
  `fecha_expiracion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'EMMA S','daniel487@gmail.com','$2a$12$iPNYggsJ251L9nKS7u9zc.075oLEiMlacZqXCoxjPP5P3sdpk3gMi','user','user',NULL),(2,'Daniela','felicianoelias@gmail.com','$2a$12$Ni.R2AM6SRFYW2x46CHafusuUaOUr6X.yZnLhRO0GU52XJWcP0Dja','user','user','2021-02-07 21:21:37'),(3,'Daniela','dani@gmail.com','$2a$12$ZfoFvNOP3YEim9Vy1nzdaODfKQGvB57X8jWoNThHdh8ajp.nhfdH2','user','user','2021-02-07 21:23:44'),(4,'Daniela Elias','daniela@gmail.com','$2a$12$2GaxbH5KGF70QSr2fwjMeu1zhibRvUJ2iyWOAblx4pyS2o4rAfOki','4.jpeg','admin',NULL),(5,'Daniela','danielaelias@gmail.com','$2a$12$5fuDjMm145s6iNZioTrReu8K8YEWB9/TeyCR968MK.O7ZOhqJZ83C','foto','user','2021-02-12 16:33:15'),(6,'Daniela','anoelias@gmail.com','$2a$12$OeODWyw5lIg34./FVXGSj.AdrrsDSk.MzY2PUg5ElfOgzphv96SyS','foto','user',NULL),(7,'Daniela','lias@yopmail.com','$2a$12$GLkJJYdJHtvzc5JEkLBIqewZ.quunzE3IOyOxZCHECWo.uHdP5oWO','foto','user',NULL),(8,'Daniela','danielaelias@gmail.com','$2a$12$umweo7zSIeSedCW99MWMk.ep30sCBvWy9wuvDWBZW.Vgx5R/nJYqa','foto','user',NULL),(9,'Daniela R','danielafelicianoelias@gmail.com','$2a$12$Wtm/mVjQAOj4LGvwNvoJsePsSMCYCBhc5lse8pmiC7IkNyeUolypC','9.png','user',NULL),(10,'Daniela','d4n1@gmail.com','$2a$12$sNo.gWX1D7095WlLB0qDGuiAeA5z8tl8iEtHwBKA7Fin45mIMxHPa','foto','user',NULL),(11,'Daniela','d4n13l4@gmail.com','$2a$12$2UUrZebyVUHTx88nYBvN8.bPsNVsEhJya4L6Enh6y6LUr/Xge9WzC','foto','user',NULL),(12,'Daniela','d4n13l@gmail.com','$2a$12$j2ipkLTou5XRougwoae2Yew2ZDeouSdIFCccGJ2/kIQYUbiGGsCVi','foto','user',NULL),(13,'Daniela','d4n13la@gmail.com','$2a$12$HhFBcQxlrLY7PGezsTqqveJYRLOSBGhFcSYLz5ME7YWW/KJuRUyeq','foto','user',NULL),(14,'Daniela','d4n13la15@gmail.com','$2a$12$TQPnyuP90QREy4Bl1lx8W.4UjmRyxShxNUDZvtjt6L40e8sRDdWQO','foto','user',NULL),(15,'Daniela','d4n13la16@gmail.com','$2a$12$5kKVDiwZadLEUTZliymp/ettbWE91pZ/4Ht7CedcpHaQvMmT9j7KS','foto','user',NULL),(16,'Nany','nany@gmail.com','$2a$12$kydFxM7kzLyDNcPjPo8Z9emScQUfh6J1RxRsvTz2X.gJ78NVfxSIW','foto','user',NULL),(17,'Nany','nany@yopmail.com','$2a$12$E6Xi5i.3FsukJLJg0IsXQe7lZa8./wIbmchVcAutDlGKA1pqSr2BO','foto','user',NULL),(18,'Nany','nany2@yopmail.com','$2a$12$GObg4PHDxua8R3mewgIyceOdJldwkEWfbZ3bIoeBE.l2OeSwHXRVK','foto','user',NULL),(19,'Nany','nany3@yopmail.com','$2a$12$Qvfr9wFaSb4gnE/ZrBM8cOzeXzfEjySTwn0hR6gJ3a0tmHlyacN9K','foto','user',NULL),(20,'Nany','nany4@yopmail.com','$2a$12$IjfqEUwiyQNeMKGJGdoEE.HsAqhW4HXnRZrr1QvbpLw1Voh2JL7bK','foto','user',NULL),(21,'Nany','nany5@yopmail.com','$2a$12$YyfKgjtoa2hDoFguVgQMmuPnASzajwSFOVd1QFJ99Gx8KLnYXFECe','foto','user',NULL),(22,'Nany','nany6@yopmail.com','$2a$12$TJYxF8lBsv2YO34OMbobDe8vq1hBVzOUvw/6motoBkNqVi9BQHJie','foto','user',NULL),(23,'Nany','nany7@yopmail.com','$2a$12$.T6B2eXAeH1APa6Dkb62ZeqYcs4shOH4QkDhZfuA3U.J04oDgxFl2','foto','user',NULL),(24,'Nany','nany8@yopmail.com','$2a$12$1Ze8otrnmnUXOzWiQmdC../deHSRn.8tSnesu5TjzW4Xt0lL8s7.q','foto','user',NULL),(25,'Nany','nany9@yopmail.com','$2a$12$enMDW2nOEsGtVkbl79LFIu9P8PSqvwcxWyIskgc.e1mwkOFGwS8Ni','foto','user',NULL),(26,'Nany','nany10@yopmail.com','$2a$12$t51sxmdxf8/r6zYh/mwa7O8Exwu7.Xq77stQsOdYViB8fxZcuw.Y.','foto','user',NULL),(27,'Nany','nany11@yopmail.com','$2a$12$AzvgghqsHhq6SqDOkOZjWuQ8iR501ZQl6SrJQ0PaTPuGj25yRmHqC','foto','user',NULL),(28,'Nany','nany12@yopmail.com','$2a$12$LGXJgb4i.wNivaGNJkZ5Mup6tc6ahqnQ/oJ8rB3WGWnV8HPo69q12','foto','user',NULL),(29,'Emma','emma@yopmail.com','$2a$12$JfQzA2RBHXcBb987aV439e9CHlYPZIDF26lv/n.IER65w2NqZkhHG','foto','user',NULL),(30,'Sophia','sophia@yopmail.com','$2a$12$TkJ.n2r/2AQcz9edXhPiWe36DZmPZpA64gQjE3pGNHK6itDMsuinO','foto','user',NULL),(31,'nany','nany15@yopmail.com','$2a$12$OqaCHeB9rWeBseNldRxED.a7NowoKViBCEOrUmc3gMzW4fyS9sL7e','foto','user',NULL),(32,'Dany','Dany@yopmail.com','$2a$12$pxY/OMpWA1jcalvqv4UNDuab7bUTrfyRm7fk3iEiXsqk7/QPlQxpO','foto','user',NULL),(33,'Daniela','dan@yopmail.com','$2a$12$qeKQJCc7zEBzrEFPQegazu9NpnkaetdY7i8RT00iqo463pgRk6lO.','foto','user',NULL),(34,'ana','ana@yopmail.com','$2a$12$ut5Mb4CuQVgS5VJLmf4zmOLOdBDUFL1ie4IP3/RQ/2lXiir/A5ySq','foto','user',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-13 15:25:32
