var name=prompt('Enter Your Name');
const socket = io("http://localhost:8000");
const socket2 = io("http://localhost:8000/admin");

socket2.on('connect',()=>{
  console.log(socket2.id);
})

document.querySelector('#msg-form').addEventListener('submit',(event)=>{
  event.preventDefault();
  const newMsg=document.querySelector('#message').value;
  document.querySelector('#message').value='';
  socket.emit('newMessageToServer',{text: newMsg , name: name});
})

socket.on('msgToClients',(msg)=>{
  if(msg.id === socket.id){
    document.querySelector('#messages').innerHTML += `<li class="me">${msg.name}: ${msg.text} </li>`;
  }else{
    document.querySelector('#messages').innerHTML += `<li>${msg.name}: ${msg.text} </li>`;
  }
})


socket2.on('welcome',data=>{
  console.log(data)
})