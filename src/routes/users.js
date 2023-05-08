const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
let User = require('../models/users');

// se define una nueva ruta, donde se verán reflejados los datos de la BD
router.get('/usuario', async (req, res) => {
    const Users = await User.find({});
    res.render('index.ejs', {Users});
});

// endpoint que renderiza la vista addUser, donde se encuentra nuestro formulario
router.get('/addUser', async (req, res) => {
    res.render('addUser');
});

// POST edpoint que agrega un nuevo usuario a la colección.
router.post('/addUser', (req, res) => {
    const newUser = User({
        name: req.body.name, // accede a los elementos del body HTML.
        email: req.body.email,
        password: req.body.password
    });

    newUser
.save() // este metodo ayuda a persistir el nuevo usuario.
.then((data) => {res.redirect('/usuario')}) // si hay datos entonces se redirecciona a la ruta /usuario.
.catch((error) => {res.json({message:error})}); // si encuentra un error, evita que crashee, pues atrapa el error.
});

router.get('/findById/:id', (req, res) => {
    User.findById(req.params.id)
    .then((myUser) => {res.render('updateUser', {myUser})})
    .catch((error) => {res.json({menssage:error})});
});

router.post('/updateUser', (req, res) => {
    const updateUser = User.findByIdAndUpdate(req.body.objId,
        {
        name: req.body.name, // accede a los elementos del body HTML.
        email: req.body.email,
        password: req.body.password
    });

    updateUser // este metodo ayuda a persistir el nuevo usuario.
.then((data) => {res.redirect('/usuario')}) // si hay datos entonces se redirecciona a la ruta /usuario.
.catch((error) => {res.json({message:error})}); // si encuentra un error, evita que crashee, pues atrapa el error.
});

module.exports = router;