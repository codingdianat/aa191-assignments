// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':15};


let Shared = L.featureGroup();
let NotShared= L.featureGroup();

let layers = {
    "Memory Shared with Bruin": Shared,
    "Memory Not Shared with Bruin": NotShared
};

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.4
    
};


// use the variables

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQP3RI2LVPKTIOCfJEq3NVO9KOEnAFO7CcW10dPXySrSYeg6rWxoVOlRd0Iu6nIEkj7f734EgIF1c_q/pub?output=csv"

const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

Esri_WorldStreetMap.addTo(map);

L.control.layers(null,layers).addTo(map);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

function addMarker(data){
    if(data['Is this happy memory shared with fellow bruins?'] == "Yes"){
        circleOptions.fillColor = "red"
        circleOptions.fillOpacity = 0.4
    
        Shared.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data['Feel free to share this lovely memory below']}</h2> <h3>${data['When did this occur?']}</h3>`))
        createButtons(data.lat,data.lng,data["Where on the UCLA campus did this good memory occur? (please enter the name of the building that it occurred)"])
        }
    else{
        circleOptions.fillColor = "blue"
        circleOptions.fillOpacity = 0.4
       
        NotShared.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data['Feel free to share this lovely memory below']}</h2> <h3>${data['When did this occur?']}</h3>`))
        createButtons(data.lat,data.lng,data["Where on the UCLA campus did this good memory occur? (please enter the name of the building that it occurred)"])
    }
    return data
};

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}


function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    Shared.addTo(map) // add our layers after markers have been made
    NotSharedn.addTo(map) // add our layers after markers have been made  
    let allLayers = L.featureGroup([Shared,NotShared]);
    map.fitBounds(allLayers.getBounds());
};

loadData(dataUrl)