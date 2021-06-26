-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: peliculas_disney
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Romance',NULL),(2,'Comedia',NULL),(3,'Drama',NULL);
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peliculas`
--

DROP TABLE IF EXISTS `peliculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `peliculas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imagen` varchar(500) DEFAULT NULL,
  `titulo` varchar(45) NOT NULL,
  `fecha_de_creacion` date NOT NULL,
  `clasificacion` int NOT NULL,
  `genero_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `genero` (`genero_id`),
  CONSTRAINT `fk_genero-id_generos` FOREIGN KEY (`genero_id`) REFERENCES `generos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peliculas`
--

LOCK TABLES `peliculas` WRITE;
/*!40000 ALTER TABLE `peliculas` DISABLE KEYS */;
INSERT INTO `peliculas` VALUES (1,'https://m.media-amazon.com/images/I/51qtQYyaWcL._SL500_.jpg','La sirenita','1989-10-07',5,1),(2,'https://es.web.img3.acsta.net/pictures/21/04/29/11/03/3538359.jpg','Luca','2021-06-13',4,2),(3,'https://pics.filmaffinity.com/Soul-993368298-large.jpg','Soul','2020-12-25',3,3);
/*!40000 ALTER TABLE `peliculas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personaje_pelicula`
--

DROP TABLE IF EXISTS `personaje_pelicula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personaje_pelicula` (
  `id` int NOT NULL AUTO_INCREMENT,
  `personaje_id` int NOT NULL,
  `pelicula_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pelicula_id` (`pelicula_id`),
  KEY `personaje_id` (`personaje_id`),
  CONSTRAINT `fk_pelicula_id` FOREIGN KEY (`pelicula_id`) REFERENCES `peliculas` (`id`),
  CONSTRAINT `fk_personaje-id` FOREIGN KEY (`personaje_id`) REFERENCES `personajes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personaje_pelicula`
--

LOCK TABLES `personaje_pelicula` WRITE;
/*!40000 ALTER TABLE `personaje_pelicula` DISABLE KEYS */;
INSERT INTO `personaje_pelicula` VALUES (1,1,1),(2,2,2),(3,3,3);
/*!40000 ALTER TABLE `personaje_pelicula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personajes`
--

DROP TABLE IF EXISTS `personajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personajes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `imagen` varchar(500) DEFAULT NULL,
  `nombre` varchar(45) NOT NULL,
  `edad` int DEFAULT NULL,
  `peso` varchar(45) NOT NULL,
  `historia` varchar(700) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personajes`
--

LOCK TABLES `personajes` WRITE;
/*!40000 ALTER TABLE `personajes` DISABLE KEYS */;
INSERT INTO `personajes` VALUES (1,'https://i.pinimg.com/originals/e5/d9/a3/e5d9a3e8887c89d2dbc38fc8d50ed71a.png','Ariel',19,'--','La Sirenita vive en un reino subacuático con su padre, el rey del mar, su abuela y sus cinco hermanas mayores, cada una nacida con un año de diferencia. Cuando una sirena cumple los 15 años, se le permite subir a mirar el mundo de la superficie, y cuando cada una de las hermanas tienen la edad suficiente, visitan la superficie una vez por cada año.'),(2,'https://i1.wp.com/cinemedios.com/wp-content/uploads/2021/06/original_1622660816_SIDEKICK_IG_CHAR_BANNER_DPLUS_LUCA_LAS.jpg?resize=640%2C800&ssl=1','Luca Paguro ',13,'--','Luca Paguro es un monstruo marino adolescente que vive en la costa de la ciudad italiana de Portorosso y que se pasa el día arreando peces cabra. Sus padres, Daniela y Lorenzo, le impiden salir a la superficie por miedo, pero hacer lo mismo día tras día acaba por aburrir a Luca.'),(3,'https://static.wikia.nocookie.net/disney/images/c/c0/Profile_-_Joe_Gardner.webp/revision/latest?cb=20210307142115&path-prefix=es','Joseph Gardner',39,'--','Joe Gardner, un profesor de música de secundaria que vive en la ciudad de Nueva York, se siente atrapado en la vida e insatisfecho en su trabajo. Sueña con una carrera en el jazz, a lo que su madre costurera, Libba, se opone, temiendo que no tenga seguridad económica. Por casualidad, su exalumno Curly le informa de una apertura en la banda de la leyenda del jazz Dorothea Williams. Joe impresiona a Dorothea con su piano y se le ofrece el trabajo en el acto. Mientras Joe felizmente se prepara para su primera actuación más tarde, accidentalmente cae por una alcantarilla destapada');
/*!40000 ALTER TABLE `personajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `pass` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (4,'gbrpelizza@gmail.com','$2b$12$wnzAma0C/1o0UYO7z6OQ1uIjZGkUlWoKvPjldG0DaMeWzNaTA7SS.');
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

-- Dump completed on 2021-06-26 18:41:41
