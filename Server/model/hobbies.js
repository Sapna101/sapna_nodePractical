let mongoose = require('mongoose')
// hobbies collection schema
let hobbiesSchema = new mongoose.Schema({
  name : { type: String ,  required: true}
})

module.exports = mongoose.model('Hobbies', hobbiesSchema);
