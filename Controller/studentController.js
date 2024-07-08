const Student = require('../models/students');
const createErrors = require('http-errors');
module.exports = {

    addStudent: async(req, res,next)=>{

        try{
          const student = new Student(req.body)
          const result = await student.save();
          res.send(result)
        } catch(error){
          console.log(error.message);
        }
      },
     
      getallStudents : (req, res, next) =>{
        Student.find({}).then((student)=>{
          res.send(student);
        });
      },

      updateStudent: async (req,res,next) =>{

        try{
          const id =req.params.id;
          const update =req.body;
          const options ={new: true}
          const result = await Student.findByIdAndUpdate(id, update, options)

          if(!result){
            throw(createError(404, "student does not exist"))
          }

          res.send(result);
        }catch(error){
          console.log(error.message);
        
        }
         
            if(error instanceof mongoose.CastError){ 
              return next (createError(400, "Invalid student id")); 
            }
            next(error);
         
      },

      deleteStudent: async (req,res,next) =>{
        const id =req.params.id
          try{
            const student = await Student.findByIdAndDelete(id)
            if(!student){
              throw(createError(404,"student does not exist"))
            }
            res.send(student);

          }catch(err){
            console.log(err.message)
            if(err instanceof mongoose.CastError){
              next(createError(400, "invalid student id"));
              return;
            }
          }
        },
        
      getStudent: async(req,res,next)=>{
        const id =req.params.id;
        try{
          const student = await Student.findById(id)
          if(!student){
            throw(createError(404,"student does not exist"))
          }
          res.send(student)
        }catch(error){
          console.log(error.message);
          if(error instanceof mongoose.CastError){
            next(createError(400, "Invalid student id"));
            return;
          }
          next(error);
        }
      },
  }