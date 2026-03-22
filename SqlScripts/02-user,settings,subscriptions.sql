DROP TABLE IF EXISTS wealthtracker.subscription;
DROP TABLE IF EXISTS wealthtracker.plans;
DROP TABLE IF EXISTS wealthtracker.user_settings;

CREATE TABLE wealthtracker.user_settings(
	user_id INT PRIMARY KEY,
    currency VARCHAR(10) DEFAULT 'INR',
    timezone VARCHAR(50) DEFAULT 'Asia/Kolkata',
    FOREIGN KEY (user_id) REFERENCES account_holder(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
    
    
);


CREATE TABLE wealthtracker.plans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),        -- Free, Premium, Pro
    price DECIMAL(10,2),
    duration_days INT
);

INSERT INTO wealthtracker.plans (name, price, duration_days)
VALUES
('FREE', 0, 3650), -- default (no entry in subsriptions db for this)
('PREMIUM', 1100, 365);




CREATE TABLE wealthtracker.subscription (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    plan_id INT,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (user_id) REFERENCES account_holder(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES plans(id)
);

