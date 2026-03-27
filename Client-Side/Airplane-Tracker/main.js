// IIFE
(() => {

    function getGeo() {
        return fetch("http://prog2700-fwrux.ondigitalocean.app/opensky")
                .then(data => data.json())
                .then(data => {
                    console.log(data);
                    const canada = data.states.filter(f => f[2] === "Canada");
                    const geoJSON = {
                        "type": "FeatureCollection",
                        "features": canada.map(flight => {
                            const obj = {
                            "type": "Feature",
                            "properties": {
                                "Callsign": flight[1],
                                "Origin": flight[2],
                                "Barometric altitude": flight[7],
                                "On ground": flight[8],
                                "Velocity": flight[9],
                                "true_track": flight[10]
                            },
                            "geometry": {
                                "coordinates": [flight[5], flight[6]],
                                "type": "Point"
                                }
                            }
                            return obj;
                        })
                    }
                    console.log(geoJSON);
                    return geoJSON;
                });
    }

    
    //create map in leaflet and tie it to the div called 'theMap'
    let map = L.map('theMap').setView([42, -60], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    // L.marker([42, -60]).addTo(map)
    //     .bindPopup('This is a sample popup. You can put any html structure in this including extra flight data. You can also swap this icon out for a custom icon. Some png files have been provided for you to use if you wish.');

    let flights = L.layerGroup();

    function getThePerfectAirplanes() {
        getGeo().then(a => {
            let newFlights = L.layerGroup();  // create a new layer in each interval
            L.geoJSON(a.features, {pointToLayer: function(geoJsonPoint, latlng) {
                    var myIcon = L.icon({
                        iconUrl: 'plane4-45.png',
                        iconSize: [38, 38],
                        });
                    return L.marker(latlng, {
                        icon: myIcon,
                        rotationAngle: geoJsonPoint.properties["true_track"] - 45
                        })
                        .bindPopup(`Origin: ${geoJsonPoint.properties.Origin}__
                        Call Sign: ${geoJsonPoint.properties.Callsign}__
                        Velocity: ${geoJsonPoint.properties.Velocity}__
                        Altitude: ${geoJsonPoint.properties["Barometric altitude"]}__
                        On ground: ${geoJsonPoint.properties["On ground"]}`);
                    }
            })
            .addTo(newFlights);
            map.removeLayer(flights);   // remove old planes
            flights = newFlights;       // replace reference
            flights.addTo(map);         // show new planes
        }).then(console.log(flights))
    }
    setInterval(getThePerfectAirplanes, 11000);
})()