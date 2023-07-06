const cds = require("@sap/cds");
//Obtener entidades dentro de cds.entities
const { Orders } = cds.entities("com.training");

//srv es una función anónima aquí
module.exports = (srv) => {
    //*****OPERACIÓN READ******/
    //Usando función CDL embebida
    srv.on("READ", "GetOrders", async (req) => {
        return await SELECT.from(Orders);
    } );
};