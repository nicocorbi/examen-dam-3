# Documentación del Proyecto
## Descripción General
Este proyecto es un backend desarrollado con Express.js que implementa un sistema de autenticación HTTP Basic. Los usuarios y contraseñas se almacenan en una base de datos SQLite3 y además, incluye funcionalidades como registro de usuarios, inicio de sesión y una página principal que muestra una tabla con los usuarios registrados.

## Estructura del Proyecto
- index.js: Punto de entrada del servidor.
- database/init.js: Configuración e inicialización de la base de datos SQLite3.
- middleware/auth.js: Middleware para autenticación HTTP Basic.
- views: Plantillas HTML renderizadas con Nunjucks.
- package.json: Configuración del proyecto y scripts de desarrollo.
## Funcionamiento del Proyecto
### Inicio del Servidor:

El servidor se inicia con npm run dev (usando nodemon para reinicio automático).
Escucha en http://localhost:3000.
Rutas Principales:

- /: Muestra una tabla con los usuarios registrados.
- /register: Página para registrar nuevos usuarios.
- /login: Página para iniciar sesión.
- /private: Ruta protegida que requiere autenticación HTTP Basic.
- /logout: Permite cerrar sesión.
### Base de Datos:

La base de datos SQLite3 almacena los usuarios en una tabla users con las columnas id, username y password.
Se inicializa automáticamente si no existe.
### Autenticación:

Implementada con el middleware express-basic-auth.
Valida las credenciales contra los datos almacenados en la base de datos.
Sistema de Autenticación
#### ¿Cómo Funciona?
El middleware authMiddleware utiliza express-basic-auth para interceptar las solicitudes a rutas protegidas.
Las credenciales (username y password) se envían en el encabezado Authorization de la solicitud HTTP.
El middleware consulta la base de datos para verificar si las credenciales son válidas.
Si las credenciales son correctas, el usuario accede a la ruta protegida. De lo contrario, se devuelve un error 401 Unauthorized.
### Ventajas
Simplicidad: Fácil de implementar y configurar.
Compatibilidad: Funciona con cualquier cliente HTTP estándar.
Sin Cookies o Tokens: No requiere almacenamiento de sesiones o manejo de tokens.
### Desventajas
Seguridad Limitada: Las credenciales se envían en cada solicitud, lo que puede ser inseguro si no se usa HTTPS.
Escalabilidad: No es ideal para aplicaciones grandes o distribuidas.
Experiencia de Usuario: No permite personalizar fácilmente la interfaz de inicio de sesión.
## Ventajas y Desventajas de la Implementación
### Ventajas
Uso de SQLite3:

Ligero y fácil de configurar.
No requiere un servidor de base de datos externo.
Plantillas Nunjucks:

Permite separar la lógica del servidor de la presentación.
Facilita la creación de vistas dinámicas.
Scripts de Desarrollo:

nodemon para reinicio automático del servidor.
standard para mantener un estilo de código consistente.
### Desventajas
Autenticación Básica:

No es la más segura para aplicaciones en producción.
No permite funcionalidades avanzadas como roles o permisos.
Base de Datos SQLite3:

No es adecuada para aplicaciones con alta concurrencia o grandes volúmenes de datos.
Falta de Pruebas
