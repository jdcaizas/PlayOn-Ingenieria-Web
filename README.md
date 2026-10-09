Cómo ejecutar el proyecto

-Requisitos
Node.js 20 o superior
npm
1. Backend
bash
cd backend
npm install
npm run start:dev

El backend queda corriendo en http://localhost:3000. Al iniciar, la terminal muestra el hash bcrypt de la contraseña del usuario de prueba.

2. Frontend (en otra terminal)
bash
cd frontend
npm install
npm run dev

El frontend queda corriendo en http://localhost:5173.

En Windows PowerShell, si aparece un error de scripts no firmados, usa npm.cmd en lugar de npm.

3. Usuario de prueba
Usuario	Contraseña
admin	1234
Cómo probar los requisitos
Sin sesión: abre http://localhost:5173 y verás que redirige a /login.
API protegida: abre http://localhost:3000/canciones y devuelve 401 Unauthorized.
Login incorrecto: ingresa una contraseña errónea y se muestra un mensaje de error.
Login correcto: ingresa con admin / 1234 y accedes al CRUD.
CRUD: crea, edita y elimina canciones desde la tabla.
Cerrar sesión: el botón "Cerrar sesión" elimina el token y vuelve al login.
Encriptación: en la terminal del backend se ve el hash $2b$10$... de la contraseña.
