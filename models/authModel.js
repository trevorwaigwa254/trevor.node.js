const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const authSchema = new Schema({
    email: {
        type:String,
        required:[true,'Email is Required']
    },
    password: {
        type:String,
        required:[true,'Password is Required']
    }
});

// hashing the pwd before sving in the database
// this function will be called be4 saving the userC
authSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(this.password, salt)
        this.password = hashedPwd
        next()
    } catch(error){
        next(error)
    }
})
// comparing the entered password and one saved in the DB
authSchema.methods.isValidPassword = async function(password){
    try{
      return await bcrypt.compare(password, this.password)
    }catch(error){
      throw error
    }
  }
  
  const User = mongoose.model("User", authSchema);
module.exports = User;