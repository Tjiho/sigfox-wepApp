const greenStyle = {
    "color": "#00ff00",
    "weight": 1 ,
    "opacity": 1
};

const redStyle = {
    "color": "#ff0000",
    "weight": 1 ,
    "opacity": 1
};


const greyStyle = {
    "color": "#aaaaaa",
    "weight": 1 ,
    "opacity": 0.6
};

const blackStyle = {
    "color": "#555555",
    "weight": 1 ,
    "opacity": 1
}

var map = createMap()
var data = ""
var list_markers = {}
var list_rooms = {}
var color_rooms = {}
var reset_rooms = {}

function colorRoom(room_name,style)
{
    if(color_rooms[room_name])
    {
        try {
            map.removeLayer(color_rooms[room_name])    
        } catch (error) {
            console.log("Cannot delete old room")
        }
        
    }
    var room = L.geoJSON(
        data.features,
        {
            filter: function(feature, layer) {
                return feature.properties.RoomId == room_name;
            },
            style: style,
            
        }
    )
    room.addTo(map); 
    color_rooms[room_name] = room;

    if(style != blackStyle)
    {
        if(reset_rooms[room_name])
            clearTimeout(reset_rooms[room_name])
        reset_rooms[room_name] = setTimeout(() => colorRoom(room_name,blackStyle), 10000)
    }

}


function drawRooms()
{

    L.geoJSON(
        data.features,
        {
            filter: function(feature, layer) {
                return feature.properties.ZLevel == "2";
            },
            style: greyStyle,
            onEachFeature: function (feature, layer) {
                //console.log(feature.getBounds().getCenter())
                list_rooms[feature.properties.RoomId] = layer
                //console.log(layer.getCenter())
            }
        }
    ).addTo(map);

    //console.log(list_layers[0].getCenter())

    //colorRoom("Ø20-606-0",redStyle);
}

function ajaxRoom()
{
    var xhr = xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4)
        {
            data = JSON.parse(xhr.responseText),map
            drawRooms()            
        }
    }
    xhr.open('GET', '/static/ou44_geometry.geojson', true)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function createMap()
{
    var map = L.map('content',
    {
        maxZoom: 25,
        rotationAngle: 45
    }).setView([55.3673174, 10.4308242], 19);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    return map
}



//var list_markers = new L.LayerGroup().addTo(map);

//var a = L.marker([55.3673174, 10.4309942]);

//map.addLayer(a)

//a.bindPopup('<h3>Fipy</h3><p>Some informations...</p><a href="/">More information</a>').openPopup();

//a.clearLayers();

ajaxRoom(map)
