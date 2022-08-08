const { checkJWT } = require('../helpers/jwt');
const {io} = require('../index');

// Mensajes de Sockets
io.on("connection", client => {
    console.log("CLIENTE conectado");

    const [valid, uid] = checkJWT(client.handshake.headers["x-token"]);

    if (!valid) {
        return client.disconnect();
    }
    console.log("Cliente autenticado");
   


        client.on("disconnect", () => {
            console.log("CLIENTE DESCONECTADO");
        });
});