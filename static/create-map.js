function drawRoom(data,map)
{
    var myStyle = {
        "color": "#000000",
        "weight": 1 ,
        "opacity": 0.65
    };

    L.geoJSON(
        data.features,
        {
            filter: function(feature, layer) {
                return feature.properties.ZLevel == "0";
            },
            style: myStyle
        }
    ).addTo(map);
}

function ajaxRoom(map)
{
    var xhr = xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4)
        {
            drawRoom(JSON.parse(xhr.responseText),map)
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

map = createMap()

var list_markers = new L.LayerGroup().addTo(map);

L.marker([55.3673174, 10.4309942]).addTo(list_markers).bindPopup('<h3>Fipy</h3><p>Some informations...</p><a href="/">More information</a>')
                    .openPopup();

//markers.clearLayers();

ajaxRoom(map)