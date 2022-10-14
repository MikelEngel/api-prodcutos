/* 
1. Importar express y sus funciones
2. Hacer instancia de la aplicación
3. Middlewares
4. Declarar las rutas
5. Levantar servidor.
*/



const estantes = [
    {
        modelo: "HODWR01",
        producto: "Estante cromado 3 niveles",
        marca: "HOD",
        precio: 1,
    },

    {
        modelo: "HODWR01",
        producto: "Estante cromado 4 niveles",
        marca: "HOD",
        precio: 2,
    },
]

const ruedas = [
    {
        modelo: "RTR9X2C05",
        producto: "Rueda tipo rayo",
        medidas: "9x2 pulgadas",
        color: "azul",
        marca: "HOD",
        precio: 1,
    },

    {
        modelo: "RTR12X3",
        producto: "Rueda tipo rayo",
        medidas: "12x3 pulgadas",
        color: "rojo",
        marca: "HOD",
        precio: 2,
    },
]



//! 1. Importar todas nuestras bibliotecas

const express = require ('express');

//! 2. Hacer instancia de la aplicación express y ...

const app = express();

//! 3. Middlewares

app.use(express.json());

//! 4. Declarar las rutas

app.get ("/",(req, res)=>{
    res.json({mensaje: 'Hola'})
});

//! CREATE - POST
app.post("/estante", (req, res)=>{
    const { modelo, producto, marca, precio } = req.body;
    estantes.push( modelo, producto, marca, precio );
    res.json({mensaje: "Producto registrado", data: estantes});
})

app.post("/rueda", (req, res)=>{
    const { modelo, producto, medidas, color, marca, precio } = req.body;
    ruedas.push ( modelo, producto, medidas, color, marca, precio );
    res.json({mensaje: "Rueda registrada", data: ruedas})

})


//! READ - GET
app.get("/estante", (req, res) => {
    console.log("GET:", req.body);
    res.json({ estantes });
});

app.get("/rueda", (req, res) => {
    console.log("GET:", req.body);
    res.json({ ruedas });
})

//! UPDATE - PUT
app.put("/estante/:modelo", (req, res) => {
    const indice = estantes.findIndex ((estante) => estante.modelo === req.params.modelo);
    if (indice === -1){
        res.json({error: 'No se encontró el modelo de estante'});
        return;
    }

    const { 
        modelo = estantes[indice].modelo,
        producto = estantes[indice].producto, 
        marca = estantes[indice].marca,
        precio = estantes[indice].precio,
    } = req.body;

    estantes[indice] = {
        modelo,
        producto,
        marca,
        precio,
    };

    res.json ({estanteEditado: estantes[indice], todosEstantes: estantes}); 
});


//!DELETE 
app.delete("/estante/:indice", function (req, res) {
    const [eliminado] = estantes.splice(+req.params.indice, 1);
    if (!eliminado) {
        res.json({error: "No existe el elemento"});
        return;
    }
    res.json({
        eliminado,
        estantes,
    });
})


app.put("/rueda/:modelo", (req, res) => {
    const indice = estantes.findIndex ((rueda) => rueda.modelo === req.params.modelo);
    if (indice === -1){
        res.json({error: 'No se encontró el modelo de rueda'});
    }
    res.json ({rueda: ruedas[indice]});
});



//! 5. Levantar servidor.

app.listen(3001, ()=>{
    console.log('La aplicación corre en el puerto:'+ 3001)
});