
var socket = io();
socket.on('logs', function(msg){
    logs = document.querySelector('#list-logs')
    logs.innerHTML += '<li>'+msg+'</li>'
    //sessionStorage.setItem('key', 'value');
});

socket.on('info', function(msg)
{
    console.log(msg)
    
    if(sessionStorage.getItem(msg["id"]))
    {
        if(sessionStorage.getItem(msg["id"]) != msg["position"])
        {
            try {
                map.removeLayer(list_markers[msg["id"]])
            } catch (error) {
                console.log("marker does not exist")
            }
           
            list_markers[msg["id"]] = L.marker([msg["x"],msg["y"]])
            map.addLayer(list_markers[msg["id"]])
        }
    }
    else
    {
        list_markers[msg["id"]] = L.marker([msg["x"],msg["y"]])
        map.addLayer(list_markers[msg["id"]])
    }
    sessionStorage.setItem(msg["id"], msg);
    list_markers[msg["id"]].bindPopup('Temperature (°c):'+msg["temperature"],{autoClose:false}).openPopup();
   
});