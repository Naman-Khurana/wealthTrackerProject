DROP TABLE IF EXISTS `wealthtracker`.`budget`;

CREATE TABLE wealthtracker.budget(
	`id` int NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(50) NOT NULL,
    `amount` int NOT NULL,
	`start_date` DATE DEFAULT null,
    `end_date` date DEFAULT null,
	`range_category` VARCHAR(20) NOT NULL, 
    `account_holder_id` int, 
    
    UNIQUE KEY `account_categerory_unique` (`account_holder_id`,`category`),
    
    PRIMARY KEY(id),

	CONSTRAINT `budget_references_account_holder`
    FOREIGN KEY( `account_holder_id`)
    REFERENCES wealthtracker.`account_holder` (`id`)
    
     ON DELETE NO ACTION ON UPDATE NO ACTION
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- DROP TABLE IF EXISTS `wealthtracker`.`token_black_list`;

-- CREATE TABLE wealthtracker.token_black_list(
-- 	`id` int NOT NULL AUTO_INCREMENT,
--     `category` VARCHAR(50) NOT NULL,
--     `amount` int NOT NULL,
-- 	`start_date` DATE DEFAULT null,
--     `end_date` date DEFAULT null,
--     `account_holder_id` int, 
--     
--     UNIQUE KEY `account_categerory_unique` (`account_holder_id`,`category`),
--     
--     PRIMARY KEY(id),

-- 	CONSTRAINT `budget_references_account_holder`
--     FOREIGN KEY( `account_holder_id`)
--     REFERENCES wealthtracker.`account_holder` (`id`)
--     
--      ON DELETE NO ACTION ON UPDATE NO ACTION
-- )ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
-- 