const express  = require('express')
const app      = express();
const mongoose = require('mongoose');
const message  = require('./model/messageModel');
const user     = require('./model/userModel');
 mongoose.connect("mongodb://127.0.0.1:27017/chatapp").then(() => {
    console.log("MongoDB successfully connected...");
})



//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares

app.use(express.static('public'))
//routes
app.get('/', (req, res) => {
	res.render('index')
})
//Listen on port 3000
server = app.listen(3000)
//socket.io instantiation
const io = require("socket.io")(server);

io.on('connection', (socket) => {
	console.log('New user connected','sdfsdf',socket.id)
    // Create function to send status
    sendStatus = function(s) {
      socket.emit("status", s);
    };
	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {

        socket.username = data.username
      const users =  mongoose.user.find({username: { $regex: data.username } })
      console.log(users,'dddddddddddd')
        const userObj  =  new user({
         _id:socket.id,
         username:data?.username

        })
        userObj.save();
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
       
       const messageObj  =  new message({
            message: data.message,
            sender_id:socket.id,

        })

        messageObj.save().then(()=>{
            io.sockets.emit('new_message', {message : data.message, username : socket.username});
        })
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})
