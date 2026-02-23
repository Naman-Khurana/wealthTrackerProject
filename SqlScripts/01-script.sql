CREATE DATABASE  IF NOT EXISTS `wealthTracker`;
USE `wealthTracker`;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `account_holder`;

CREATE TABLE `account_holder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) UNIQUE NOT NULL,
  `password` varchar(68) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

--
-- Table structure for table `Roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`(
 `id` int NOT NULL AUTO_INCREMENT,
 `user_id` int NOT NULL,
 `role` varchar(50) NOT NULL,
 PRIMARY KEY(`id`),
 UNIQUE KEY `authorities5_idx_1` (`user_id`,`role`),
 
 
 CONSTRAINT `user_id_role_ref`
 FOREIGN KEY(`user_id`) 
 REFERENCES `account_holder`(`id`)
 
 ON DELETE NO ACTION ON UPDATE NO ACTION
)ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;


-- Table structure for table `earnings`

DROP TABLE IF EXISTS `earnings`;

CREATE TABLE `earnings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `amount` int NOT NULL,
  `account_holder_id` int,
   `income_type` varchar(20) not null default 'ONE_TIME',
  PRIMARY KEY (`id`),
  CONSTRAINT `account_reference_12312`
  FOREIGN KEY (`account_holder_id`) 
  REFERENCES `account_holder` (`id`)
  
  ON DELETE NO ACTION ON UPDATE NO ACTION

) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- Table structure for table `expenses`

DROP TABLE IF EXISTS `expenses`;

CREATE TABLE `expenses`(
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `amount` int NOT NULL,
  `account_holder_id` int ,
  PRIMARY KEY (`id`),
  CONSTRAINT `account_reference_12313` 
  FOREIGN KEY (`account_holder_id`)
  REFERENCES `account_holder` (`id`)
  
    ON DELETE NO ACTION ON UPDATE NO ACTION


) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

INSERT INTO `account_holder`
VALUES
(1,'Raftaar','Nair','rr@dhh.in','$2a$12$wh/MS8xLJD3MyxplFRktw.jq6.abei/Cs4U/aKAR6ZLuf9EbMfaCu'),
(2,'Krsna','Kaul','kk@dhh.in','$2a$12$wh/MS8xLJD3MyxplFRktw.jq6.abei/Cs4U/aKAR6ZLuf9EbMfaCu');

INSERT INTO `roles`
VALUES
(1,1,'USER'),
(2,1,'ADMIN'),
(3,2,'USER');


