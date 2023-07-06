
// Create a new Map instance
const map = new mapboxgl.Map({
  container: 'map', // HTML element to hold the map
  style: 'mapbox://styles/mapbox/streets-v11', // Map style
  center: initialCenter, // Initial center coordinates
  zoom: 10, // Initial zoom level
});

// Define the Mapbox Directions control
const directions = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
  unit: 'metric', // Measurement unit
  profile: 'mapbox/driving', // Routing profile
});

// Add the Mapbox Directions control to the map
map.addControl(directions, 'top-left');

// Function to handle route updates
function handleRouteUpdate() {
  const routes = directions.getRoutes(); // Get the list of routes
  if (routes.length > 0) {
    const route = routes[0]; // Consider the first route
    const distance = route.distance; // Total distance of the route in meters
    const duration = route.duration; // Total duration of the route in seconds

    // Perform calculations or logic based on the route distance and duration
    // ...
  }
}

// Event listener for route updates
directions.on('route', handleRouteUpdate);

// Function to handle user's current location
function handleCurrentLocation(position) {
  const { longitude, latitude } = position.coords; // Get the current location coordinates
  const center = [longitude, latitude]; // Center the map on the current location
  map.setCenter(center);
}

// Function to handle errors in getting current location
function handleLocationError(error) {
  console.error('Error getting current location:', error.message);
}

// Get the user's current location
navigator.geolocation.getCurrentPosition(handleCurrentLocation, handleLocationError);

// Function to speak the driving directions
function speakDirections() {
  const route = directions.getActiveRoute(); // Get the active route
  if (route) {
    const steps = route.legs[0].steps; // Get the steps of the active route
    let directionsText = 'Driving directions: ';

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const instruction = step.maneuver.instruction;
      directionsText += `${i + 1}. ${instruction}. `;
    }

    // Use text-to-speech library to speak the directionsText
    // ...
  }
}

// Function to update the display text
function updateDisplayText(distance, duration) {
  const speed = (distance / duration).toFixed(2);
  const displayText = `Maintain Speed: ${speed} km/h`;
  document.getElementById('display-text').textContent = displayText;
}

// Example usage
const exampleDistance = 5000; // Distance in meters
const exampleDuration = 1800; // Duration in seconds
updateDisplayText(exampleDistance, exampleDuration);


// Create a new map instance
const maps = new mapboxgl.Map({
    container: 'map', // HTML element to hold the map
    style: 'mapbox://styles/mapbox/streets-v11', // Map style
    center: [longitude, latitude], // Center coordinates
    zoom: 10, // Zoom level
  });
  
  // Add navigation control to the map
  const navControl = new mapboxgl.NavigationControl();
  map.addControl(navControl, 'top-right');
  
  // Add geolocation control to the map
  const geolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true, // Enable high-accuracy position
    },
    trackUserLocation: true, // Track user's location
  });
  map.addControl(geolocateControl);
  
  // Add scale control to the map
  const scaleControl = new mapboxgl.ScaleControl({
    maxWidth: 80, // Maximum width of the scale control
    unit: 'metric', // Measurement unit
  });
  map.addControl(scaleControl);
  
  // Create a marker at a specific location
  const marker = new mapboxgl.Marker()
    .setLngLat([longitude, latitude]) // Marker coordinates
    .addTo(map);
  
  // Create a popup and attach it to the marker
  const popup = new mapboxgl.Popup().setText('Hello, World!');
  marker.setPopup(popup);
  
  // Add event listener to the marker
  marker.on('click', () => {
    marker.togglePopup(); // Toggle the visibility of the popup
  });
  
  // Add event listener for map click
  map.on('click', (e) => {
    const coordinates = e.lngLat; // Clicked coordinates
    console.log('Clicked coordinates:', coordinates);
  });
  
  // Add event listener for map movement
  map.on('move', () => {
    const center = map.getCenter(); // Current center coordinates
    console.log('Current center:', center);
  });
  
  // Function to handle geolocation success
  function handleGeolocationSuccess(position) {
    const { latitude, longitude } = position.coords; // Current location coordinates
    console.log('Current location:', latitude, longitude);
  }
  
  // Function to handle geolocation error
  function handleGeolocationError(error) {
    console.error('Error getting geolocation:', error);
  }
  
  // Get current geolocation
  navigator.geolocation.getCurrentPosition(
    handleGeolocationSuccess,
    handleGeolocationError
  );
  // Add the Mapbox Directions control to the map
map.addControl(directions, 'top-left');

// Function to handle route updates
function handleRouteUpdate() {
  const routes = directions.getRoutes(); // Get the list of routes
  if (routes.length > 0) {
    const route = routes[0]; // Consider the first route
    const distance = route.distance; // Total distance of the route in meters
    const duration = route.duration; // Total duration of the route in seconds

    // Perform calculations or logic based on the route distance and duration
    // ...
  }
}

// Event listener for route updates
directions.on('route', handleRouteUpdate);

// Function to handle user's current location
function handleCurrentLocation(position) {
  const { longitude, latitude } = position.coords; // Get the current location coordinates
  const center = [longitude, latitude]; // Center the map on the current location
  map.setCenter(center);
}

// Function to handle errors in getting current location
function handleLocationError(error) {
  console.error('Error getting current location:', error.message);
}

// Get the user's current location
navigator.geolocation.getCurrentPosition(handleCurrentLocation, handleLocationError);

// Function to speak the driving directions
function speakDirections() {
  const route = directions.getActiveRoute(); // Get the active route
  if (route) {
    const steps = route.legs[0].steps; // Get the steps of the active route
    let directionsText = 'Driving directions: ';

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const instruction = step.maneuver.instruction;
      directionsText += `${i + 1}. ${instruction}. `;
    }

    // Use text-to-speech library to speak the directionsText
    // ...
  }
}