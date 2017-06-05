
USE habitdb;


-- ---
-- Table 'users'
--
-- ---


DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(15) NULL DEFAULT 'NO_USERNAME' UNIQUE, -- once facebook - MUST remove unqiue
  `tagline` VARCHAR(40) NULL DEFAULT 'NO_TAGLINE',
  `facebook_id` VARCHAR(40) NULL DEFAULT 'NO_FACEBOOK_AUTH',
  `facebook_token` VARCHAR(255) NULL DEFAULT 'NO_FACEBOOK_AUTH',
  `facebook_name` VARCHAR(255) NULL DEFAULT 'NO_FACEBOOK_AUTH',
  `facebook_friends` VARCHAR(255) NULL DEFAULT 'NO_FACEBOOK_FRIENDS', -- SHOULD BE OWN SCHEMA ONCE UP...
  `photo` VARCHAR(255) NULL DEFAULT 'NO_PHOTO',
  `notifications` bit NOT NULL DEFAULT 1,
  `private_habits` bit NOT NULL DEFAULT 0,
  `email` VARCHAR(255) NULL DEFAULT 'NO_EMAIL' CHECK (email like '%_@__%.__%'),
  `password` VARCHAR(128) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'habits'
--
-- ---

DROP TABLE IF EXISTS `habits`;

CREATE TABLE `habits` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(20) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `type` VARCHAR(20) NOT NULL DEFAULT 'NULL',
  `start_date` DATE NULL DEFAULT NULL,
  `notification` TIME NULL DEFAULT NULL,
  `private_habit` bit NOT NULL DEFAULT 0,
  `has_pictures` bit NOT NULL DEFAULT 1,
  `id_users` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'dates'
--
-- ---

DROP TABLE IF EXISTS `dates`;

CREATE TABLE `dates` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `date` DATE NOT NULL,
  `picture` VARCHAR(255) NULL DEFAULT NULL,
  `id_habits` INTEGER NOT NULL,
  `id_users` INTEGER NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT unique_name UNIQUE (date, id_habits)
);

-- ---
-- Table 'keywords'
--
-- ---

DROP TABLE IF EXISTS `keywords`;

CREATE TABLE `keywords` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `keyword` VARCHAR(20) NOT NULL DEFAULT 'NULL',
  `id_habits` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'friends'
--
-- ---

DROP TABLE IF EXISTS `friends`;

CREATE TABLE `friends` (
  `id` INTEGER AUTO_INCREMENT DEFAULT NULL,
  `challenge` bit NOT NULL DEFAULT 0,
  `id_follower` INTEGER NOT NULL,
  `id_followee` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `habits` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);
ALTER TABLE `dates` ADD FOREIGN KEY (id_Habits) REFERENCES `habits` (`id`);
ALTER TABLE `dates` ADD FOREIGN KEY (id_Users) REFERENCES `users` (`id`);
ALTER TABLE `keywords` ADD FOREIGN KEY (id_habits) REFERENCES `habits` (`id`);
ALTER TABLE `friends` ADD FOREIGN KEY (id_follower) REFERENCES `users` (`id`);
ALTER TABLE `friends` ADD FOREIGN KEY (id_followee) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `habits` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `dates` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `keywords` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `friends` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`username`,`email`,`password`,`facebook`) VALUES
-- ('','','','','');
-- INSERT INTO `habits` (`id`,`name`,`description`,`type`,`start_date`,`notification`,`private`,`picture`,`id_users`) VALUES
-- ('','','','','','','','','');
-- INSERT INTO `dates` (`id`,`date`,`picture`,`id_Habits`,`id_Users`) VALUES
-- ('','','','','');
-- INSERT INTO `keywords` (`id`,`keyword`,`id_habits`) VALUES
-- ('','','');
-- INSERT INTO `friends` (`id`,`challenge`,`id_follower`,`id_followee`) VALUES
-- ('','','','');
