const cds = require("@sap/cds");
const cors = require("cors");

//Con cors queda el servidor configurado para hacer peticiones a servicios externos
cds.on("bootstrap", (app) => {
    app.use(cors());
    app.get("/alive", (_,res) => {
        res.status(200).send("Server is alive");
    });
});

module.exports = cds.server;

