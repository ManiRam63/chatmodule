const mongoose = require('mongoose');
const nanoid = require('nanoid');
const userSchema =  new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: () => nanoid()
    },
    username:{
    type:String,
    required:true
   },
   created_at:{ 
    type: Date, 
    required: true, 
    default: Date.now 
 }
})
const userModel = mongoose.model('user', userSchema);

module.exports = userModel