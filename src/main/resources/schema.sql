CREATE TABLE IF NOT EXISTS customers (
  customer_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  address VARCHAR(255),
  email VARCHAR(255) NOT NULL UNIQUE,
  admin BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS methods (
  method_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  payment_type VARCHAR(255) NOT NULL,
  number BIGINT NOT NULL,
  routing_number BIGINT,
  confirmation_number BIGINT,
  expiration_date DATE,
  card_type VARCHAR(255),
  customer_id BIGINT NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
);

CREATE TABLE IF NOT EXISTS orders (
  order_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  time TIMESTAMP,
  address VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  shipped BOOLEAN NOT NULL,
  total_price DOUBLE NOT NULL,
  customer_id BIGINT,
  FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
);

CREATE TABLE IF NOT EXISTS shillelaghs (
  shillelagh_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  ordered BOOLEAN NOT NULL,
  shipped BOOLEAN NOT NULL,
  order_id BIGINT,
  name VARCHAR(255) NOT NULL,
  price VARCHAR(10)
);

ALTER TABLE shillelaghs
ADD CONSTRAINT fk_order
FOREIGN KEY (order_id)
REFERENCES orders (order_id)
ON DELETE SET NULL;