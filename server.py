# server.py
from http.server import SimpleHTTPRequestHandler, HTTPServer
import json
from datetime import datetime
import folium

class MyRequestHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        post_json = json.loads(post_data.decode('utf-8'))

        latitude = post_json.get('latitude', '')
        longitude = post_json.get('longitude', '')

        # Display coordinates on the server's console
        print(f"Received coordinates: {latitude}, {longitude} at {datetime.now()}")

        # Save coordinates to a text file
        with open('coordinates.txt', 'a') as file:
            file.write(f"{latitude}, {longitude}\n")

        # Create a map using Folium
        target_location = (37.7749, -122.4194)  # Replace with your target coordinates
        map_path = self.create_folium_map([(float(latitude), float(longitude)), target_location])

        self.send_response(200)
        self.end_headers()
        response = "Data received successfully"
        self.wfile.write(response.encode('utf-8'))

    def create_folium_map(self, coordinates):
        # Create a map centered at the first received coordinate
        initial_coordinate = coordinates[0]
        my_map = folium.Map(location=initial_coordinate, zoom_start=15)

        # Add markers for each received coordinate
        for coord in coordinates:
            folium.Marker(location=coord, popup=str(coord)).add_to(my_map)

        # Save the map as an HTML file
        map_path = 'path_map.html'
        my_map.save(map_path)
        print(f"Map saved at: {map_path}")
        return map_path

# Create a server with the custom request handler
server = HTTPServer(('0.0.0.0', 12345), MyRequestHandler)

print("Server listening on http://0.0.0.0:12345")

try:
    server.serve_forever()

except KeyboardInterrupt:
    print("\nServer is shutting down.")
    server.shutdown()
    server.server_close()
