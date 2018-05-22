
var socket = io();
socket.on('logs', function(msg){
    logs = document.querySelector('#list-logs')
    logs.innerHTML += '<li>'+msg+'</li>'
    //sessionStorage.setItem('key', 'value');
});

socket.on('info', function(msg)
{
    console.log(msg)
    //msg["room"] = "Ø" + msg["room"];
    if(sessionStorage.getItem(msg["id"]))
    {
        if(sessionStorage.getItem(msg["id"])["room"] != msg["room"])
        {
            try {
                map.removeLayer(list_markers[msg["id"]])
            } catch (error) {
                console.log("marker does not exist")
            }
        }
    }
   
    try {
        list_markers[msg["id"]] = L.marker(list_rooms[msg["room"]].getCenter())
        map.addLayer(list_markers[msg["id"]])
    } catch (error) {
        console.log("room does not exist:"+error)
    }

    sessionStorage.setItem(msg["id"], msg);
    
    content_popup = `
    <div></div>
    <div>Temperature (°c):'+${ msg["temp"] }</div>
    <div>People inside: ${msg["peoplePresent"] == "True" ? "Yes" : "No"} </div>
    <div><a href="">Show more</a></div>
    `
    list_markers[msg["id"]].bindPopup(content_popup,{autoClose:false}).openPopup();

    if(msg["temp"] > 50)
    {
        colorRoom(msg["room"],redStyle);
    }

    if(msg["temp"] < 50)
    {
        colorRoom(msg["room"],greenStyle);
    }
   
});
