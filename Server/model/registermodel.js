let mongoose = require('mongoose')
// users collection schema
let registerSchema = new mongoose.Schema({
  firstname : { type: String ,  required: true},
  lastname : { type: String ,  required: true},
  email : { type: String ,  required: true},
  password : { type: String ,  required: true},
  username : { type: String ,  required: true},
  gender : { type: String ,  required: true},
  country : { type: String ,  required: true},
  city : { type: String ,  required: true},
  hobbies : { type: Array ,  required: true},
  friends : { type : Array , required:true},
  pendingrequests : { type : Array , required:true}
})

module.exports = mongoose.model('Users', registerSchema)
