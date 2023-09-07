const cds = require("@sap/cds");
const cors = require("cors");
const adapterProxy = require("@sap/cds-odata-v2-adapter-proxy");

//Con cors queda el servidor configurado para hacer peticiones a servicios externos
cds.on("bootstrap", (app) => {
    app.use(adapterProxy());
    app.use(cors());
    app.get("/alive", (_,res) => {
        res.status(200).send("Server is alive");
    });
});

if(process.env.NODE_ENV !== "production") {
    const swagger = require("cds-swagger-ui-express");
    cds.on("bootstrap", (app) => {
        app.use(swagger());
    });
    require("dotenv").config();
}

module.exports = cds.server;

