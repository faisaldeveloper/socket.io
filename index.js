var express = require("express");
var app = express();
var port = 3700;

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("page");
});


 
app.get("/", function(req, res){
    res.send("It works!");
});

app.get("/index", function(req, res){
     res.render("index");
});


app.use(express.static(__dirname + '/public')); 
//app.listen(port);
var io = require('socket.io').listen(app.listen(port));

io.on('connection', function(socket){
  console.log('a user connected');
});

socket.on("connect", function () {
    console.log("Connected!");
});


io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

console.log("Listening on port " + port);