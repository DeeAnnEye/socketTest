const chatForm = document.getElementById('chat-form')
const socket = io();

socket.on('message' , message => {
    console.log(message)

    outputMessage(message);
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get message
    const msg = e.target.elements.msg.value;

    // emit to server
    socket.emit('chatMsg',msg);

    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
})

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<div class="msg-time" style="font-size: 24px; color: darkblue">
   <span> 9:15pm </span>
  </div>
  <div class="msg-txt" style="color: black; font-size: 22px">
    ${message}
  </div>
  <br />`

  document.querySelector('.msg-display').appendChild(div);
}