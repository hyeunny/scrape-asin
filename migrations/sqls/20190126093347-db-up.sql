CREATE TABLE `products` (
  `asin` VARCHAR(100) NOT NULL,
  `rank` INT NULL,
  `dimensions` VARCHAR(256) NULL,
  `category` VARCHAR(100) NULL,
  PRIMARY KEY (`asin`),
  UNIQUE INDEX `asin_UNIQUE` (`asin` ASC));
