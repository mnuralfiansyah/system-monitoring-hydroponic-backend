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

var cors = require('cors');
app.use(cors());



route(app,io)
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('new_message', function(msg){
    console.log(msg)
    io.emit('onLED', msg);
  });

  socket.on('send_data_sensor', function(msg){
    from_client = JSON.parse(msg.replace(/'/g, '\"'));
    io.emit('get_log_sensor', from_client);
    // console.log(from_client.suhu_udara);
    // io.emit('onLED', msg);
  });

  socket.on('respon_led_white_on', function(msg){
    console.log(msg);
    // io.emit('onLED', msg);
  });


  // 
});






