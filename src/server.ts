 
import {app} from "./app.js";
 
// EJECUTAR CON EL COMANDO node src/server.js TRAS USAR ...

const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () => {
  console.log('Server listening for requests in port', PORT);
})
