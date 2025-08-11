--Solo ejecutarlo cuando creamos la base de datos por primera vez
ALTER SESSION SET "_ORACLE_SCRIPT"= TRUE;

CREATE USER TABLEROKANVAN IDENTIFIED BY tableroKanvan
DEFAULT TABLESPACE "USERS"
TEMPORARY TABLESPACE "TEMP";

ALTER USER TABLEROKANVAN QUOTA UNLIMITED ON USERS;
GRANT CREATE SESSION TO TABLEROKANVAN;
GRANT "RESOURCE" TO TABLEROKANVAN;
ALTER USER TABLEROKANVAN DEFAULT ROLE "RESOURCE";




--Ya creada la BD
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE TiposDeNoticias CASCADE CONSTRAINTS';
EXCEPTION
   WHEN OTHERS THEN
      IF SQLCODE != -942 THEN -- -942 = no existe la tabla
         RAISE;
      END IF;
END;
/

CREATE TABLE TiposDeNoticias (
   idTipo INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   nombreTipoNoticia VARCHAR(20)
);

insert into TiposDeNoticias(nombreTipoNoticia) values ('Pendiente');
insert into TiposDeNoticias(nombreTipoNoticia) values ('En Revision');
insert into TiposDeNoticias(nombreTipoNoticia) values ('Completados');
insert into TiposDeNoticias(nombreTipoNoticia) values ('Descartados');

BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE Noticia CASCADE CONSTRAINTS';
EXCEPTION
   WHEN OTHERS THEN
      IF SQLCODE != -942 THEN -- -942 = no existe la tabla
         RAISE;
      END IF;
END;
/


CREATE TABLE Noticia (
   idNoticia numeric(7,0) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   autor VARCHAR2(400),
   contenido VARCHAR2(4000 char),
   descripcion VARCHAR2(1000),
   fecha VARCHAR2(25),
   fuente varchar2(100),
   titulo VARCHAR2(1000),
   url VARCHAR2(1000),
   urlImagen VARCHAR2(1000),
   idTipo int,
   CONSTRAINT fk_tipoNoticia
        FOREIGN KEY (idTipo)
        REFERENCES TiposDeNoticias(idTipo)
);



CREATE OR REPLACE PROCEDURE getNoticias (
    p_idTipo IN int,
    p_resultado OUT SYS_REFCURSOR
) IS
BEGIN
    OPEN p_resultado FOR
        SELECT idNoticia, autor, contenido, descripcion, fecha, fuente, titulo, url,urlImagen
        FROM Noticia where idTipo = p_idTipo;
END;
/




CREATE OR REPLACE PROCEDURE updateNoticia (
    p_idNoticia IN int,
    p_idTipo IN int,
    p_resultado OUT INTEGER
) IS
BEGIN
    UPDATE Noticia 
    SET idTipo = p_idTipo
    WHERE idNoticia = p_idNoticia;

    p_resultado := SQL%ROWCOUNT;  -- devuelve el número de filas afectadas

    COMMIT;

EXCEPTION
    WHEN OTHERS THEN
        p_resultado := -1; -- puedes usar -1 para indicar error
        ROLLBACK;
END;
/



CREATE OR REPLACE PROCEDURE insertNoticia (
    p_autor VARCHAR2,
    p_contenido VARCHAR2,
    p_descripcion VARCHAR2,
    p_fecha VARCHAR2,
    p_fuente varchar2,
    p_titulo VARCHAR2,
    p_url VARCHAR2,
    p_urlImagen VARCHAR2,
    p_resultado OUT INTEGER
) IS
v_count INTEGER := 0;
BEGIN
    SELECT COUNT(*)
    INTO v_count
    FROM Noticia
    WHERE url = p_url;
    
    IF v_count = 0 THEN
    INSERT INTO Noticia(autor, contenido, descripcion, fecha, fuente, titulo, url, urlImagen, idTipo)
    VALUES (p_autor, p_contenido, p_descripcion, p_fecha, p_fuente, p_titulo, p_url, p_urlImagen, 1);

    p_resultado := SQL%ROWCOUNT; 
    COMMIT;
    ELSE
        p_resultado := 0;
    END IF;

EXCEPTION
    WHEN OTHERS THEN
        p_resultado := -1;
        ROLLBACK;
END;
/

