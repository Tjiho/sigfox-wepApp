const greenStyle = {
    "color": "#68BA4C",
    "weight": 1 ,
    "opacity": 0.95
};

const redStyle = {
    "color": "#ff0000",
    "weight": 1 ,
    "opacity": 0.85
};


const greyStyle = {
    "color": "#222222",
    "weight": 1 ,
    "opacity": 0.65
};

var map = createMap()
var data = ""
var list_markers = {}

function colorRoom(room_name,style)
{
    L.geoJSON(
        data.features,
        {
            filter: function(feature, layer) {
                return feature.properties.RoomId == room_name;
            },
            style: style
        }
    ).addTo(map); 
}


function drawRooms()
{

    L.geoJSON(
        data.features,
        {
            filter: function(feature, layer) {
                return feature.properties.ZLevel == "0";
            },
            style: greenStyle
        }
    ).addTo(map);

    colorRoom("Ø20-606-0",redStyle,data,map);
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