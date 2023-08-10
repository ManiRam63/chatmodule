const mongoose = require('mongoose');
const nanoid = require('nanoid');
const messageSchema =  new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        default: () => nanoid()
    },
    message:{
    type:String,
    required:true
   },
   sender_id:{
    type:String,
    required:true,
   },
   created_at:{ 
    type: Date, 
    required: true, 
    default: Date.now 
 }
})
const messageModel = mongoose.model('message',messageSchema);

module.exports = messageModel