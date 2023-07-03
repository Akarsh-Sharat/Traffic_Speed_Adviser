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
        },
        {
            'type': 'Feature',
            'properties': {
                'message': 'TFL2',
                'iconSize': [30, 30]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [73.88665, 18.66168]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'message': 'TFL3',
                'iconSize': [30, 30]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [73.88658, 18.66169]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'message': 'TFL4',
                'iconSize': [30, 30]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [73.88650, 18.66180]
            }
        }
    ]
};

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true });

function successLocation(position) {
    console.log(position);
    setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
    setupMap([-2.24, 53.48]);
}

function calculateMaxSpeed(coordinates) {
    // Replace this with your max speed calculation logic
    const maxSpeed = '60 mph';
    return maxSpeed;
}

function setupMap(center) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 17,
        center: center
    });

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);

    const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/Driving'
    });

    map.addControl(directions, 'top-left');

     // Add current location marker to the map.
     var marker = new mapboxgl.Marker()
     .setLngLat(center)
     .addTo(map);

    // Create a DOM element for the max speed box
    const maxSpeedBox = document.createElement('div');
    maxSpeedBox.className = 'max-speed-box';
    maxSpeedBox.innerHTML = `Max Speed: ${calculateMaxSpeed(center)}`;

    // Add the max speed box to the map
    map.getContainer().appendChild(maxSpeedBox);

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
        el.style.backgroundImage = `url(traffic.png)`;
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.backgroundRepeat = 'no-repeat';
        el.style.backgroundPosition = 'center';
        el.style.backgroundSize = 'auto';

        el.addEventListener('click', () => {
            window.alert(marker.properties.message);
        });

        // Add markers to the map.
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    }
}
