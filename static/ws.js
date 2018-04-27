var socket = io();

socket.on('logs', function(msg){
    logs = document.querySelector('#list-logs')
    logs.innerHTML += '<li>'+msg+'</li>'
});
