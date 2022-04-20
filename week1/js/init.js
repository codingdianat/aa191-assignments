// declare variables
let zoomLevel = 13;
const mapCenter = [34.0709,-118.444];
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapCenter, zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



let img1 = '<center><img src = Century.jpeg  /> </center>'
let img2 = '<center><img src = Theater.png  /> </center>'
// create a function to add markers
var myIcon = L.icon({
    iconUrl: 'point.png',
    iconSize: [40, 35],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
   
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});
function addMarker(lat,lng,title,message, img){
    console.log(message)
    L.marker([lat,lng], {icon: myIcon}).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>` + img )
    createButtons(lat,lng,title);
    return message
}


// use our marker functions
addMarker(34.077591,-118.474579,'<h2>Getty Center</h2>','<p>need to visit soon!</p>',img1)
addMarker(34.062569,-118.446960,'<h2>Bruin Theater</h2>','<p>watched Batman here!</p>',img2)
addMarker(34.058601,-118.418999,'<h2>Century City Mall</h2>' ,'<p>has the best gelato place!</p>', img1)


//delete after
function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    document.getElementById("contents").appendChild(newButton); //this adds the button to our page.
}

// let mapOptions = {'center': [34.0709,-118.444],'zoom':5}
//     const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);
//     console.log(mapOptions)
let myString = "hi, this is a test string"
let divideBySpace = myString.replace("test", "silly").toUpperCase()
console.log(divideBySpace) 



fetch("map.geojson")
    .then(response => {
        return response.json()
    })
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data, {
                pointToLayer: (feature, latlng) => { 
                    return L.circleMarker(latlng, {color: feature.properties.color})
                }
            }).bindPopup(layer => {
                console.log(layer.feature.properties.place)
                return layer.feature.properties.place;
            }).addTo(map);
    })