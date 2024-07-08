const express = require('express');
const routes = express.Router();
const authController = require('../Controller/authcontroller');

//add user to the db
// routes.get('/register', authControler.addAuth);

//register user
routes.post('/registerUser', authController.registerUser);
// routes.post('/login',authController.login);

module.exports = routes;