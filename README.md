PlayOn Vibra

PlayOn Vibra es una página web para descubrir música. La idea es que los usuarios puedan buscar canciones, artistas y álbumes, guardar sus canciones favoritas, armar playlists y compartir lo que piensan con reseñas y calificaciones.

Este repositorio tiene la primera parte del proyecto: un login y un CRUD de canciones que solo se puede usar si el usuario inició sesión.
Video en YouTube: https://youtu.be/bcT8FWSHecc

Qué hace hasta ahora
Login con usuario y contraseña.
CRUD de canciones: se pueden crear, ver, editar y eliminar.
Si no se inició sesión, no se puede entrar al CRUD ni a la API de canciones.
La contraseña no se guarda tal cual, se guarda encriptada con bcrypt.
Con qué lo hice
Svelte (SvelteKit) para la parte visual.
NestJS para el backend.
JWT para mantener la sesión iniciada.
bcryptjs para encriptar la contraseña.
Cómo apliqué el MVC
Modelo: backend/src/canciones/canciones.service.ts. Aquí está la estructura de la canción y la lógica de crear, leer, actualizar y eliminar.
Controlador: backend/src/canciones/canciones.controller.ts y backend/src/auth/auth.controller.ts. Reciben lo que manda el usuario y lo pasan al modelo.
Vista: frontend/src/routes/+page.svelte (el CRUD) y frontend/src/routes/login/+page.svelte (el login).
Cómo protegí las páginas

Cuando el usuario inicia sesión, el backend le entrega un token. Ese token se manda en cada petición al CRUD. Si no hay token, o está mal, el backend responde 401 (no autorizado) y el frontend lo manda de vuelta al login.

El archivo que hace esa revisión en el backend es backend/src/auth/auth.guard.ts.

Cómo correrlo

Necesitas tener Node.js instalado.

Primero el backend:

cd backend
npm install
npm run start:dev

Luego, en otra terminal, el frontend:

cd frontend
npm install
npm run dev

El backend queda en http://localhost:3000 y el frontend en http://localhost:5173.

Si usas PowerShell en Windows y te sale un error de scripts, usa npm.cmd en vez de npm.

Usuario para probar
Usuario: admin
Contraseña: 1234
Cómo comprobar que funciona
Abrir http://localhost:5173 sin iniciar sesión. Te manda al login.
Abrir http://localhost:3000/canciones. Sale el error 401.
Probar con una contraseña incorrecta. Muestra un mensaje de error.
Entrar con admin y 1234. Se abre el CRUD.
Crear, editar y eliminar una canción.
Cerrar sesión. Vuelve al login.
Lo que falta
Las canciones y el usuario se guardan en memoria, no en una base de datos. Si se reinicia el backend, se pierden las canciones que se agregaron.
Solo hay un usuario de prueba, todavía no se pueden registrar más.
Falta la búsqueda de artistas y álbumes, las playlists y las reseñas.
Autor

Juan David Caiza, Ingeniería de Software, Universidad de las Américas.
