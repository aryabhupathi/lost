const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    email: { type: String, unique:true, required: true },
    password: { type: String, unique:true, required: true },
  }, {collection:'User'})

  loginSchema.index({email:1})
  
module.exports = mongoose.model('Login', loginSchema);