mapboxgl.accessToken = 'pk.eyJ1IjoiYWtraWdob3N0IiwiYSI6ImNsamN0NG9wNzJtaDQzZnFuZWk2eXZtbDEifQ.a9G_dKnO9ed8y5z4AubgAw';

const geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {
                'message': 'TFL1',
                'iconSize': [30, 30]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [73.88676, 18.66158]
            }
        }
    ]
};

const displayText = document.getElementById('display-text');

function updateDisplayText(distance, time) {
    let speed = Math.round(distance / time);
    let displayText;
  
    if (speed < 20) {
      speed = speed + 20; // Set minimum speed to 20 km/h
      displayText = `Maintain Speed: ${speed}Km/h`;
    } 
    else if (speed > 60) {
        const newDistance = 1.6; // Use distance of 1.6 km
        speed = 60-(speed-60); // Set maximum speed to 50 km/h
        updateDisplayText(newDistance,time); // Recursive call with adjusted values
        displayText = `Maintain Speed: ${speed}km/h`;
      }else {
      displayText = `Maintain Speed: ${speed}km/h`;
    }

    
  
    document.getElementById('display-text').textContent = displayText;
    
    
    fetch('/update-display-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ displayText: displayText })
      })
        .then(response => {
          if (response.ok) {
            console.log('Display text sent to server successfully');
          } else {
            console.error('Failed to send display text to server');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
}


navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true });

function successLocation(position) {
    console.log(position);
    setupMap([position.coords.longitude, position.coords.latitude]);

}

function errorLocation() {
    setupMap([-2.24, 53.48]);
}



// ############################################################ //
function speakText() {
    fetch('/speak')
        .then(response => response.text())
        .then(result => {
            console.log(result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


// Declare the directions variable in the outer scope

let directions;
// Function to set up the map and directions control
function setupMap(center) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 17,
        center: center
    });

    directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/Driving'
    });

    map.addControl(directions, 'top-left');

    directions.on('route', (e) => {
        if (e.route && e.route[0]) {
            const distance = e.route[0].distance;
            const duration = e.route[0].duration;
            updateDisplayText(distance, duration);
        }
    });

     // Add current location marker to the map.
     var marker = new mapboxgl.Marker()
     .setLngLat(center)
     .addTo(map);

    // // Create a DOM element for the max speed box
    // const maxSpeedBox = document.createElement('div');
    // maxSpeedBox.className = 'max-speed-box';
    // maxSpeedBox.innerHTML = `Max Speed: ${calculateMaxSpeed(center)}`;

    // // Add the max speed box to the map
    // map.getContainer().appendChild(maxSpeedBox);

    // Update the max speed box position when the map moves
    map.on('move', () => {
        const { x, y } = map.project(map.getCenter());
        maxSpeedBox.style.left = `${x}px`;
        maxSpeedBox.style.top = `${y}px`;
    });

    
    // Add markers to the map.
    for (const marker of geojson.features) {
        // Create a DOM element for each marker.
        const el = document.createElement('div');
        const width = marker.properties.iconSize[0];
        const height = marker.properties.iconSize[1];
        el.className = 'marker';
        el.style.backgroundImage = `url(/static/light.png)`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundRepeat = 'no-repeat';
        el.style.backgroundPosition = 'center';
        el.style.backgroundSize = 'auto';
        

        // Add markers to the map.
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    }
}


