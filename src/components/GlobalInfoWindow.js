// Create a global variable to hold the currently open InfoWindow.

// Update this variable whenever a new InfoWindow is opened.

// Close the previous InfoWindow before opening a new one.

let currentInfoWindow = null;

export function setCurrentInfoWindow(infoWindow) {
    if (currentInfoWindow) {
        currentInfoWindow.close();
    }
    currentInfoWindow = infoWindow;
}