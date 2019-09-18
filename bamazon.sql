DROP DATABASE  bamazon_DB;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    product_price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (id)

);


INSERT INTO products (product_name, department_name, product_price, stock_quantity)
VALUES ("iphone XR", "phones", 599, 50);

INSERT INTO products (product_name, department_name, product_price, stock_quantity)
VALUES ("iphone 11", "phones", 699, 40);

INSERT INTO products (product_name, department_name, product_price, stock_quantity)
VALUES ("iphone 11 Pro", "phones", 999, 35);

INSERT INTO products (product_name, department_name, product_price, stock_quantity)
VALUES ("iphone 11 Pro Max", "phones", 1099, 30);

INSERT INTO products (product_name, department_name, product_price, stock_quantity)
VALUES ("Samsung Galaxy s10", "phones", 799.95, 25);

INSERT INTO products (product_name, department_name, product_price, stock_quantity)
VALUES ("MacBook Pro 2018", "computers", 1299, 19);

INSERT INTO products (product_name, department_name, product_price, stock_quantity)
VALUES ("MacBook Pro 2019", "computers", 1299, 23);

INSERT INTO products (product_name, department_name, product_price, stock_quantity)
VALUES ("MacBook Air", "computers", 1099, 23);

INSERT INTO products (product_name, department_name, product_price, stock_quantity)
VALUES ("ipad Pro", "ipad", 799, 13);

INSERT INTO products (product_name, department_name, product_price, stock_quantity)
VALUES ("ipad Mini", "ipad", 399, 11);






