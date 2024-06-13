require('dotenv').config();
require('./helpers/init_mongodb');
const express = require('express');
const routes = require('./routes/api');
const app = express();
app.use(express.json());
app.use(routes);
app.listen(process.env.port || 4000, function(){
    console.log('Now listening for requests on:http://localhost:4000')
});
