const express =  require('express');
const routes = express.Router();
const studentController = require('../Controller/studentController');

//get a list of students from the database

  routes.get('/students', (req, res)=>{
    res.send(req.body);
  });

//add students to the db
  // 
  routes.post('/addStudent', studentController.addStudent);

  //update students in the DB
routes.get('/getallStudents', studentController.getallStudents);

//delete a students from the DB
  routes.delete('/students/:id',(req,res)=>{
    res.send({type:'Delete Request'});
  });

  //update  students in the DB
  routes.patch('/updateStudent/:id', studentController.updateStudent);

  // get student by ID 
  routes.get('/getStudent/:id', studentController.getStudent);

  //delete students in the DB
  routes.delete('/deleteStudent/:id', studentController.deleteStudent);

  module.exports = routes;