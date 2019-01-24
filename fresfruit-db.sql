CREATE DATABASE IF NOT EXISTS fresfruit;
USE fresfruit;

CREATE TABLE IF NOT EXISTS `ff_empresas` (
    `id_empresa` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `nit` VARCHAR(25) NOT NULL UNIQUE,
    `razon_social` VARCHAR(100),
    `telefono` VARCHAR(25),
    `fecha_registro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `ff_roles` (
    `id_rol` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `nombre` VARCHAR(25) NOT NULL,
    `fecha_registro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `ff_usuarios` (
    `id_usuario` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `id_empresa` INT,
    `id_rol` INT,
    `nombres` VARCHAR(25),
    `apellidos` VARCHAR(25),
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `direccion` VARCHAR(100),
    `celular` VARCHAR(20),
    `fecha_registro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FOREIGN KEY(`id_empresa`) REFERENCES ff_empresas(`id_empresa`),
    CONSTRAINT FOREIGN KEY(`id_rol`) REFERENCES ff_roles(`id_rol`)
);

CREATE TABLE IF NOT EXISTS `ff_pedidos` (
    `id_pedido` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `numero_factura` INT NOT NULL UNIQUE,
    `id_usuario` INT,
    `observacion` VARCHAR(256),
    `precio_total` INT,
    `despachado` BIT DEFAULT 0,
    `fecha_estimada` TIMESTAMP,
    `fecha_pedido` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FOREIGN KEY(`id_usuario`) REFERENCES ff_usuarios(`id_usuario`)
);

CREATE TABLE IF NOT EXISTS `ff_productos` (
    `id_producto` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `nombre` VARCHAR(50),
    `in_stock` BIT,
    `fecha_registro` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `ff_usuarioempresa` (
    `id_usuarioempresa` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`id_empresa` INT NOT NULL,
    `id_usuario` INT NOT NULL,
    CONSTRAINT FOREIGN KEY(`id_empresa`) REFERENCES ff_empresas(`id_empresa`),
    CONSTRAINT FOREIGN KEY(`id_usuario`) REFERENCES ff_usuarios(`id_usuario`)
);
CREATE TABLE IF NOT EXISTS `ff_productopedido` (
    `id_productopedido` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `id_producto` INT NOT NULL,
    `id_pedido` INT NOT NULL,
    `cantidad` INT NOT NULL,
    CONSTRAINT FOREIGN KEY(`id_producto`) REFERENCES ff_productos(`id_producto`),
    CONSTRAINT FOREIGN KEY(`id_pedido`) REFERENCES ff_pedidos(`id_pedido`)
);