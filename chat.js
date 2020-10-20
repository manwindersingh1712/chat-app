const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(8000);

const io = socketio(expressServer);

io.on("connection", (socket) => {
  // socket.emit("messageFromServer", { data: "socket join" });
  // socket.on("messageToServer", (data) => {
  //   console.log(data);
  // });
  
  socket.on('newMessageToServer',(msg)=>{
    // io.emit("msgToClients",{text: msg.text,name: msg.name ,id: socket.id})
    io.of("/").emit("msgToClients",{text: msg.text,name: msg.name ,id: socket.id})
  })
});

io.of("/admin").on("connection", (socket) => {
  io.of("/admin").emit('welcome',"welcome to admin!!")
})

