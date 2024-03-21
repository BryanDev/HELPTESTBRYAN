CREATE DATABASE helptest;

drop table ht_usuarios;

CREATE TABLE ht_usuarios (
  id SERIAL PRIMARY KEY UNIQUE,
  nombre_usuario VARCHAR(20) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  correo VARCHAR(50) NOT NULL,
  primer_nombre VARCHAR(20) NOT NULL,
  segundo_nombre VARCHAR(20),
  primer_apellido VARCHAR(20) NOT NULL,
  segundo_apellido VARCHAR(20),
  fecha_ingreso TIMESTAMP NOT NULL, 
  fecha_vencimiento_clave TIMESTAMP, 
  fecha_cambio_clave TIMESTAMP, 
  fecha_ultimo_ingreso TIMESTAMP, 
  intentos_fallidos INT,
  intoken VARCHAR(2000),
  ruta_imagen VARCHAR(255) NOT NULL,
  rol INT,
  estado BOOL NOT NULL
);


INSERT INTO ht_usuarios (nombre_usuario, contrasena, correo, primer_nombre, primer_apellido, fecha_ingreso, fecha_vencimiento_clave, fecha_cambio_clave, fecha_ultimo_ingreso, intentos_fallidos,intoken, ruta_imagen, rol, estado)
VALUES
  ('usuario1', 'contrasena1', 'usuario1@example.com', 'Juan', 'Pérez', '2024-03-18 10:00:00', '2024-04-18 10:00:00', '2024-03-25 08:30:00', '2024-03-18 10:00:00', 0, 0, '/ruta/imagen1.jpg', 1, true);
  
 select * from ht_usuarios

 
