// declare variables
let zoomLevel = 13;
const mapCenter = [34.0709,-118.444];

// use the variables
const map = L.map('the_map').setView(mapCenter, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let img1 = '<center><img src = Century.jpeg  width="150px" /> </center>'
 
// create a function to add markers
function addMarker(lat,lng, msg){
 
    L.circleMarker([lat,lng]).addTo(map).bindPopup(msg)
  
 
}

function addMarker2(lat,lng, msg, img){
 
    L.circleMarker([lat,lng]).addTo(map).bindPopup(msg + img)
  
 
}

// use our marker functions
addMarker(34.077591,-118.474579,'<h1>Getty Center</h1> <p>need to visit soon</p>')
addMarker(34.062569,-118.446960,'<h1>Bruin Theater</h1><p>watched Batman here</p>')
addMarker2(34.058601,-118.418999,'<h1>Century City Mall</h1><p>has the best gelato place</p>', img1)

