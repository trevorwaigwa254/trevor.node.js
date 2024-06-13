const express =  require('express');
const Student = require('../models/students');
const routes = express.Router();

//get a list of students from the database

  routes.get('/students', (req, res)=>{
    res.send({type:'Get Request'});
  });

//add students to the db
  // 
  routes.post('/addstudents',async(req, res,next)=>{

    try{
      const student = new Student(req.body)
      const result = await student.save();
      res.send(result)
    } catch(error){
      console.log(error.message);
    }
  });

  //update students in the DB
routes.put('/students/:id',(req,res)=>{
    res.send({type:'Update Request'});
  });

//delete a students from the DB
  routes.delete('/students/:id',(req,res)=>{
    res.send({type:'Delete Request'});
  });

  module.exports = routes;