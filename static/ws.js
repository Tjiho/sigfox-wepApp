var socket = io();

socket.on('chat message', function(msg){
    logs = document.querySelector('#list-logs')
    logs.innerHTML += '<li>'+msg+'</li>'
});
