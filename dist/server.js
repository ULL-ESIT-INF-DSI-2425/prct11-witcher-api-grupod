//Importar la aplicación
import { app } from "./app.js";
// EJECUTAR CON EL COMANDO node src/server.js TRAS USAR ... sudo /home/usuario/mongodb/bin/mongod --dbpath /home/usuario/mongodb-data/
/**
 * Ejecutar el servidor
 * @param {number} port - El puerto en el que se ejecutará el servidor
 * @returns {void}
 * Pasos para ejecutar el servidor:
 * 1. Instalar las dependencias necesarias con el comando
 * 2. Iniciar el servidor con el comando node src/server.js
 * 3. Acceder a la aplicación en el navegador en la dirección http://localhost:3000
 * 4. Probar la API utilizando herramientas como Postman o Insomnia
 * 5. Realizar peticiones GET, POST, PUT y DELETE a la API para interactuar con los datos
 * 6. Verificar que el servidor responde correctamente a las peticiones
 * 7. Realizar pruebas de vitest para verificar el correcto funcionamiento de la API
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server listening for requests in port', PORT);
});
