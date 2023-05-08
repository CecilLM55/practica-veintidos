const express = require('express'); // se inyecta express  
const mongoose = require('mongoose'); // se inyecta mongoose
const usersRoutes = require ('./routes/users'); // se inyecta el router de personas
require("dotenv").config(); // se inyecta la variable de ambiente que es para MONGODB_URI

mongoose.Promise = global.Promise;
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/assets', express.static(__dirname + '/../public'));
app.use(express.urlencoded({extended:false}));
app.use(usersRoutes); // se utiliza el router personas

mongoose.connect(process.env.MONGODB_URI) // se conecta a la base de datos
.then(() => console.log('Conectado a TEST')) // si es exitoso se manda el mensaje a la terminal
.catch ((error) => console.error(error)); // si hay error lo imprime en la terminal

app.listen(port, () => console.log('Escuchando en el puerto ', port));