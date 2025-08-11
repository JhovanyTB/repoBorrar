Necesarios para correr el sistema:
Base de datos:
	- ORACLE EXPRESS 21c (indispensable)
	-SQL Developer (opcional)
Back-End:
	-Java 21 (indispensable)
	-Spring Tool Suit (indispensable)
Front-End:
	-NodeJS 20.11.1 (o superior, indispensable)
	-Visual Studio Code (o cualquier editor de texto)

Pasos:
Creación de la base de datos:
	1. Con el Archivo incluido creacionDB.sql, entrar a sql plus como sysdba (sql plus sys as sysdba).
	2. Ejecutar el archivo .sql hasta la línea 11.
	3. (Opcional) En SQL Developer ejecutar el resto del script desde la línea 11 hasta el final, si no se tiene se puede 
	realizar este procedimiento a través de sql plus.
Inicio de Back-End:
	1. Abrir Spring Tool Suit y en la pantalla mostrada 'Seleccionar Directorio Como Espacio de Trabajo' seleccioanr 
	Browse y Elegir una carpeta fuera del repositorio (no importa el nombre).
	2. Oprimir Launch.
	3. Ir a la pestaña 'File'->'Import'
	4. En la pestaña que se mostrará seleccionar 'General'->'Projects from Folder or Archive', oprimir botón 'Next'
	5. En el campo de texto mostrado oprimir el botón 'Directory'.
	6. Se abrirá una pestaña del Exoplorador de archivos en windows, ir hasta la carpeta del repositorio 'tableroKanvan'
	7. Presionar el botón 'Seleccionar Carpeta'
	8. Se mostrará el proyecto en la parte de 'Package Explorer', desplegar la carpeta de archivos.
	9. En el archivo pom.xml apretar click derecho, dirigirse a la opción 'Run as'->'Run Configuration'
	10. En la pestaña desplegada buscar la opción 'Spring Boot App' oprimir click derecho y seleccionar 'New Configuration'
	11. En el apartado 'Project' de la ventana mostrada seleccionar 'tableroKanvan'
	12. En el apartado 'Main Type' seleccionar 'Search', seleccionar la opción 
	TableroKanvanApplication - com.tableroKanvan.demo y presionar el botón 'OK'
	13. Presionar el botón 'Run'.
	14. Listo el back esta siendo ejecutado.
Inicio de Front-End:
Este proceso puede llevarse a cabo en la terminal de Visual Studio Code o en una ventana de ms2(cmd) de windows.
	1. En la carpeta del repositorio llamada 'front' ingresar el comando 'npm run start' y esperar a que se inicialice.
	2. Abrir el navegador de preferencia e irse a la ruta 'http://localhost:3000/Tablero'.

Con tood lo antes mencionado ya podrá probar la aplicación.