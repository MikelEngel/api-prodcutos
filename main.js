/* 
1. Importar express y sus funciones
2. Hacer instancia de la aplicación
3. Middlewares
4. Declarar las rutas
5. Levantar servidor.
*/



const productos = [
    {
        modelo: "HODWR01",
        producto: "Estante cromado",
        marca: "HOD",
        precio: "$ 1",
    },

    {
        modelo: "RTR12X3C",
        producto: "Rueda tipo rayo",
        marca: "HOD",
        precio: "$ 2",
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
app.post("/producto", (req, res)=>{
    const { modelo, producto, marca, precio } = req.body;
    productos.push( modelo, producto, marca, precio );
    res.json({mensaje: "Producto registrado", data: mascotas});
})


//! READ - GET
app.get("/producto", (req, res) => {
    console.log("GET:", req.body);
    res.json({ productos });
});


//! 5. Levantar servidor.

app.listen(3001, ()=>{
    console.log('La aplicación corre en el puerto:'+ 3001)
});