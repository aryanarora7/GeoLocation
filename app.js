// app.js
function sendLocation() {
    function getLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }

    async function sendCoordinates() {
        try {
            const position = await getLocation();
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Display coordinates on the page
            document.getElementById("coordinates").innerText = `Coordinates: ${latitude}, ${longitude}`;

            // Send the coordinates to the server via POST request
            const response = await fetch('http://your_server_ip:12345', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ latitude, longitude }),
            });

            const responseData = await response.text();
            console.log(responseData);
        } catch (error) {
            console.error("Error getting coordinates: ", error.message);
        }
    }

    // Call sendCoordinates every second
    setInterval(sendCoordinates, 1000);
}

// Initial call to start sending coordinates
//sendLocation();
