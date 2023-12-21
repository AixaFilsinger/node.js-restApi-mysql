CREATE DATABASE IF NOT EXISTS blogrecetasdb


USE blogrecetasdb


CREATE TABLE recetas (
    id INT(11) NOT NULL AUTO_INCREMENT,
    tituloReceta VARCHAR(45) DEFAULT NULL,
    imagen VARCHAR(500) DEFAULT NULL,
    categoria VARCHAR(200) DEFAULT NULL, 
    dificultad VARCHAR(6) DEFAULT NULL,
    descripcion VARCHAR(500) DEFAULT NULL,
    PRIMARY KEY (id)
);


INSERT INTO usuarios VALUES
(1,'adminAixa', 'aixa.filsinger@gmail.com', '123456aA');

