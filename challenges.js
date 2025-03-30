let watchID;
let totalDistance = 0;
let lastPosition = null;

function handleWalkCheckbox(day) { 
  document.getElementById('gps-section').style.display = 'block'; 
  sessionStorage.setItem('selectedDay', day); 
}

function startGPSTracking() { 
  if (watchID) {
    alert('GPS tracking is already running.');
    return;
  }
  if (navigator.geolocation) { 
    watchID = navigator.geolocation.watchPosition(trackMovement, gpsError, { enableHighAccuracy: true, maximumAge: 0 });
    document.getElementById('gps-status').innerText = "GPS Tracking Started...";
  } else { 
    alert('GPS is not supported in this browser.'); 
  }
}

function trackMovement(position) { 
  const speed = position.coords.speed; // Speed in meters per second 
  const lat = position.coords.latitude; 
  const lon = position.coords.longitude;

  if (lastPosition) {
    const distance = getDistance(lastPosition.lat, lastPosition.lon, lat, lon);
    totalDistance += distance;
    document.getElementById('gps-status').innerText = `Total Distance: ${totalDistance.toFixed(2)} km`;
  }

  lastPosition = { lat, lon };

  if (speed === null) {
    console.log('Speed not available; unable to classify movement.');
  } else if (speed < 1.5) { // Assuming walking is below 1.5 m/s
    console.log('User is walking');
  } else if (speed >= 1.5 && speed < 6) { // Assuming cycling speed is 1.5 - 6 m/s
    console.log('User is cycling');
  } else {
    console.log('Invalid movement detected');
  }
}

function gpsError() { 
  alert('Unable to verify location. Please try again.'); 
  document.getElementById('gps-status').innerText = "Error: Unable to track location.";
}

function stopGPSTracking() { 
  if (watchID) { 
    navigator.geolocation.clearWatch(watchID);
    watchID = null; // Reset watchID
    document.getElementById('gps-status').innerText = "GPS Tracking Stopped.";
  } 
  let day = sessionStorage.getItem('selectedDay'); 
  let points = totalDistance > 1 ? (totalDistance * 2) : 0; // Reward points based on distance 
  updatePoints(day, points); 
  document.getElementById('gps-section').style.display = 'none'; 
  alert(`Walk/Cycle verified! Distance: ${totalDistance.toFixed(2)} km, Points: ${points}`); 
  totalDistance = 0; // Reset distance for next session
  lastPosition = null; // Reset position tracking
}

function getDistance(lat1, lon1, lat2, lon2) { 
  const R = 6371; // Radius of Earth in km 
  const dLat = (lat2 - lat1) * Math.PI / 180; 
  const dLon = (lon2 - lon1) * Math.PI / 180; 
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  return R * c; // Distance in km
}

function handleDietSelection(day) {
  const dietDropdown = document.getElementById(`diet-${day}`); 
  if (!dietDropdown) {
    alert('Diet selection element not found!');
    return;
  }

  const dietType = dietDropdown.value; 
  let points = 0;

  switch (dietType) {
    case 'vegan':
        points = 10;
        break;
    case 'vegetarian':
        points = 7;
        break;
    case 'pescatarian':
        points = 5;
        break;
    case 'omnivore':
        points = 2;
        break;
    default:
        points = 0;
  }

  const pointsCell = document.querySelector(`.points[data-day="${day}"]`);
  if (pointsCell) {
    pointsCell.innerText = points; 
  }

  console.log(`Diet selected: ${dietType}, Points awarded: ${points}`);
}


function updatePoints(day, points) {
  const pointsCell = document.querySelector(`.points[data-day="${day}"]`);
  if (pointsCell) {
    const currentPoints = parseInt(pointsCell.innerText) || 0;
    pointsCell.innerText = currentPoints + points;
  }
  console.log(`Day: ${day}, Points awarded: ${points}`);
}

