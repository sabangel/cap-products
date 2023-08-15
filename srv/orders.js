const cds = require("@sap/cds");

//Obtener entidades dentro de cds.entities
const { Orders } = cds.entities("com.training");

//srv es el parámetro donde se va a pasar la instancia del servicio. Es una función anónima aquí
module.exports = (srv) => {
    //*****OPERACIÓN READ******/
    //Usando función CDL embebida
    //async es necesario, de lo contrario sale error
    //GetOrders es el nombre de la entidad hacia el exterior
    srv.on("READ", "Orders", async (req) => {
        //Consulta embebida 
        //await significa que esperamos por los resultados
        if (req.data.ClientEmail !== undefined) {
            return await SELECT.from`com.training.Orders`
                .where`ClientEmail = ${req.data.ClientEmail}`;
        }
        return await SELECT.from(Orders);
    });

    srv.after("READ", "Orders", (data) => {
        //Map permite iterar sobre los datos
        //La siguiente instrucción modifica la salida: cambia el campo de false a true
        data.map((Order) => (Order.Reviewed = true))
    });

    srv.on("CREATE", "Orders", async (req) => {
        let returnData = await cds
            .transaction(req)
            .run(
                INSERT.into(Orders).entries({
                    ClientEmail: req.data.ClientEmail,
                    FirstName: req.data.FirstName,
                    LastName: req.data.LastName,
                    CreatedOn: req.data.CreatedOn,
                    Reviewed: req.data.Reviewed,
                    Approved: req.data.Approved,
                })
            )
            .then((resolve, reject) => {
                console.log("Resolve", resolve);
                console.log("Reject", reject);
                if (typeof resolve !== "undefined") {
                    return req.data;
                } else {
                    req.error(409, "Record Not Inserted");
                }
            })
            .catch((err) => {
                console.log(err);
                req.error(err.code, err.message);
            });
        console.log("Before End", returnData);
        return returnData;
    });

};