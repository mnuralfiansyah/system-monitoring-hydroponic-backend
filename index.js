var app = require('express')();
var http = require('http').createServer(app);
var port = process.env.PORT || 3000;
var route = require('./route');


http.listen(port, function(){
  console.log('listening on *:' + port);
});
var io = require('socket.io')(http,{
  //serveClient:true,
  //#path: '/socket.io',
});

route(app,io)
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('new_message', function(msg){
    console.log(msg)
    io.emit('onLED', msg);
  });
});






