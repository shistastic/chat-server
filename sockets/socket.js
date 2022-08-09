const { userConnected, userDisconnected, saveMessage } = require('../controllers/socket');
const { checkJWT } = require('../helpers/jwt');
const {io} = require('../index');

// Mensajes de Sockets
io.on("connection", (client) => {
    console.log("CLIENTE conectado");

    const [valid, uid] = checkJWT(client.handshake.headers["x-token"]);

    // Verificar autenticación
    if (!valid) {
        return client.disconnect();
    }

    // Cliente autenticado
     userConnected(uid);

        client.join(uid);

        client.on("personal-message", (payload) => {
            
             saveMessage(payload);

            io.to(payload["to"]).emit("personal-message", payload);
        });
    
   
        client.on("disconnect", () => {
            userDisconnected(uid);
        });
});