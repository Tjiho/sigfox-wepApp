var map = L.map('content').setView([55.3673174, 10.4305942], 20);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([55.3673174, 10.4310942]).addTo(map) // [55.3673174, 10.4310942] , [55.3673174, 10.4305942]
    .bindPopup('<a href="https://qwant.com"/>qwant.com</a>')
    .openPopup();