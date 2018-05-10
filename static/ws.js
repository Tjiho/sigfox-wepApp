
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
        if(sessionStorage.getItem(msg["id"])["room"] != msg["room"])
        {
            try {
                map.removeLayer(list_markers[msg["id"]])
            } catch (error) {
                console.log("marker does not exist")
            }

            try {
                list_markers[msg["id"]] = L.marker(list_rooms[msg["room"]].getCenter())
                map.addLayer(list_markers[msg["id"]])
            } catch (error) {
                console.log("room does not exist")
            }
            
           
        }
    }
    else
    {
        try {
            list_markers[msg["id"]] = L.marker(list_rooms[msg["room"]].getCenter())
            map.addLayer(list_markers[msg["id"]])
        } catch (error) {
            console.log("room does not exist")
        }
    }
    sessionStorage.setItem(msg["id"], msg);
    list_markers[msg["id"]].bindPopup('Temperature (°c):'+msg["temperature"],{autoClose:false}).openPopup();

    if(msg["temperature"] > 50)
    {
        colorRoom(msg["room"],redStyle);
    }

    if(msg["temperature"] < 50)
    {
        colorRoom(msg["room"],greenStyle);
    }
   
});