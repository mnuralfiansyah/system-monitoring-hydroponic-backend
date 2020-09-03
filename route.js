module.exports = function(app, io) {
  io.on('connect', (socket) => {
    console.log("conect")
    io.emit('hi', 'everyone'); 

    socket.on('new_message', (data) => {
      // console.log("new_message")
      // io.emit('hi', 'everyone'); 
      // ...
    });
  
    socket.on('respon_raspi', (data) => {
      console.log("respon_raspi"+data)

      
        console.log('data :  '+data)
        io.emit('paksa_on', data); 
      
      
      // ...
    });

    // ...
  });

  




  app.get('/tampilan', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

  app.get('/button', function(req, res){
    res.sendFile(__dirname + '/button.html');
  });

  app.get('/tes', function(req, res){
    io.sockets.emit('tap', 'dari tes');
    res.json(200, {message: "Message received!"});
  });
};
