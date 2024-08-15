function sendCoordinates() {
    // Get the coordinates from the device's geolocation
    navigator.geolocation.getCurrentPosition(
        function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var coordinates = { latitude: latitude, longitude: longitude };

            // Display coordinates on the page
            document.getElementById("coordinates").innerText = `Coordinates: ${latitude}, ${longitude}`;

            // Send the coordinates to the server via POST request
            fetch('http://172.16.88.145:12345', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(coordinates),
            })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        },
        function(error) {
            console.error("Error getting coordinates: ", error.message);
        }
    );
}
